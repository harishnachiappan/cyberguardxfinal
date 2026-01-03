const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Scan = require('../models/Scan');
const FreeAITargetAnalyzer = require('../ai/freeAIAnalyzer');
const ProfessionalSecurityTools = require('../tools/professionalTools');

const router = express.Router();
const aiAnalyzer = new FreeAITargetAnalyzer();
const securityTools = new ProfessionalSecurityTools();

// AI-powered target analysis
router.post('/analyze-target', async (req, res) => {
  try {
    const { targetUrl } = req.body;
    
    if (!targetUrl) {
      return res.status(400).json({ error: 'Target URL is required' });
    }

    console.log(`🎯 Starting AI analysis for: ${targetUrl}`);
    
    // Perform AI-powered analysis
    const analysis = await aiAnalyzer.analyzeTarget(targetUrl);
    
    const scanId = `CGX-${Date.now().toString().slice(-5)}`;
    
    // Store analysis in database only if MongoDB is connected
    const mongoConnected = req.app.get('mongoConnected')();
    if (mongoConnected) {
      try {
        const scan = new Scan({
          scanId,
          targetUrl,
          scanType: 'ai-analysis',
          userId: req.body.userId || 'anonymous',
          status: 'completed',
          targetInfo: analysis.targetInfo,
          results: {
            aiAnalysis: analysis.aiAnalysis,
            recommendations: analysis.recommendations,
            chatContext: analysis.chatContext
          },
          completedAt: new Date()
        });
        await scan.save();
        console.log('💾 Analysis saved to database');
      } catch (dbError) {
        console.log('⚠️ Database save failed, continuing with AI analysis');
      }
    } else {
      console.log('🧠 AI analysis completed without database storage');
    }

    res.json({
      scanId,
      targetInfo: analysis.targetInfo,
      aiAnalysis: analysis.aiAnalysis,
      recommendations: analysis.recommendations,
      chatContext: analysis.chatContext,
      message: 'AI analysis completed successfully'
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    
    // Return fallback analysis instead of error
    const fallbackAnalysis = {
      targetInfo: {
        url: req.body.targetUrl,
        domain: new URL(req.body.targetUrl).hostname,
        status: 'Limited analysis mode'
      },
      aiAnalysis: 'AI analysis temporarily unavailable. Proceeding with standard vulnerability assessment based on common web application security patterns.',
      recommendations: [
        {
          id: 'sql-injection',
          name: 'SQL Injection Scanner',
          category: 'OWASP A03',
          priority: 'High',
          reason: 'Standard security assessment'
        },
        {
          id: 'xss',
          name: 'Cross-Site Scripting Scanner',
          category: 'OWASP A03', 
          priority: 'High',
          reason: 'Standard security assessment'
        }
      ],
      chatContext: {
        targetUrl: req.body.targetUrl,
        suggestions: ['Start vulnerability scan', 'View scan modules']
      }
    };
    
    res.json({
      scanId: `CGX-${Date.now().toString().slice(-5)}`,
      ...fallbackAnalysis,
      message: 'Analysis completed with limited AI features'
    });
  }
});

// AI Chat endpoint
router.post('/ai-chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message || !context) {
      return res.status(400).json({ error: 'Message and context are required' });
    }

    const chatResponse = await aiAnalyzer.chatWithAI(message, context);
    
    res.json(chatResponse);
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ 
      error: 'AI chat failed',
      response: "I'm having trouble right now. Please try asking about the vulnerability scanning process."
    });
  }
});

// Start vulnerability scan with real tools
router.post('/:scanId/start-vulnerability-scan', async (req, res) => {
  try {
    const { scanId } = req.params;
    const { vulnerabilityType, targetUrl } = req.body;
    
    const scan = await Scan.findOne({ scanId });
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    // Update scan status
    scan.status = 'running';
    scan.currentVulnerability = vulnerabilityType;
    await scan.save();

    const io = req.app.get('io');
    io.to(`scan-${scanId}`).emit('scan-started', { 
      scanId, 
      vulnerabilityType,
      message: `Starting ${vulnerabilityType} scan...`
    });

    // Execute the actual security scan
    const scanResults = await securityTools.executeScan(
      vulnerabilityType, 
      targetUrl, 
      scanId,
      { timeout: 60000 }
    );

    // Update scan with results
    scan.status = scanResults.status;
    scan.vulnerabilities = scan.vulnerabilities || [];
    scan.vulnerabilities.push(...scanResults.vulnerabilities);
    scan.results = {
      ...scan.results,
      [vulnerabilityType]: scanResults
    };
    
    if (scanResults.status === 'completed') {
      scan.completedAt = new Date();
    }
    
    await scan.save();

    // Emit results to frontend
    io.to(`scan-${scanId}`).emit('scan-completed', {
      scanId,
      vulnerabilityType,
      results: scanResults,
      totalVulnerabilities: scan.vulnerabilities.length
    });

    res.json({
      scanId,
      vulnerabilityType,
      status: scanResults.status,
      vulnerabilities: scanResults.vulnerabilities,
      message: `${vulnerabilityType} scan completed`
    });
  } catch (error) {
    console.error('Vulnerability scan error:', error);
    
    const io = req.app.get('io');
    io.to(`scan-${req.params.scanId}`).emit('scan-error', {
      scanId: req.params.scanId,
      error: error.message
    });
    
    res.status(500).json({ 
      error: 'Vulnerability scan failed',
      details: error.message
    });
  }
});

// Create new scan
router.post('/create', async (req, res) => {
  try {
    const { targetUrl, scanType, userId } = req.body;
    
    const scanId = `CGX-${Date.now().toString().slice(-5)}`;
    
    const scan = new Scan({
      scanId,
      targetUrl,
      scanType,
      userId,
      status: 'pending',
      createdAt: new Date()
    });

    await scan.save();

    // Emit to socket room for real-time updates
    const io = req.app.get('io');
    io.to(`scan-${scanId}`).emit('scan-created', { scanId, status: 'pending' });

    res.json({
      scanId,
      message: 'Scan created successfully',
      scan
    });
  } catch (error) {
    console.error('Scan creation error:', error);
    res.status(500).json({ error: 'Failed to create scan' });
  }
});

// Get scan status
router.get('/:scanId', async (req, res) => {
  try {
    const { scanId } = req.params;
    const scan = await Scan.findOne({ scanId });
    
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    res.json(scan);
  } catch (error) {
    console.error('Get scan error:', error);
    res.status(500).json({ error: 'Failed to get scan' });
  }
});

// Update scan status
router.put('/:scanId/status', async (req, res) => {
  try {
    const { scanId } = req.params;
    const { status, results, vulnerabilities } = req.body;
    
    const scan = await Scan.findOneAndUpdate(
      { scanId },
      { 
        status, 
        results,
        vulnerabilities,
        completedAt: status === 'completed' ? new Date() : undefined
      },
      { new: true }
    );

    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    // Emit to socket room for real-time updates
    const io = req.app.get('io');
    io.to(`scan-${scanId}`).emit('scan-updated', { scanId, status, results });

    res.json(scan);
  } catch (error) {
    console.error('Update scan error:', error);
    res.status(500).json({ error: 'Failed to update scan' });
  }
});

// Start vulnerability scan (simulated)
router.post('/:scanId/start', async (req, res) => {
  try {
    const { scanId } = req.params;
    const { module } = req.body;
    
    const scan = await Scan.findOne({ scanId });
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    // Update status to running
    scan.status = 'running';
    await scan.save();

    const io = req.app.get('io');
    io.to(`scan-${scanId}`).emit('scan-started', { scanId, module });

    // Simulate scan execution
    setTimeout(async () => {
      const mockResults = generateMockScanResults(module, scan.targetUrl);
      
      scan.status = 'completed';
      scan.results = mockResults;
      scan.vulnerabilities = mockResults.vulnerabilities;
      scan.completedAt = new Date();
      await scan.save();

      io.to(`scan-${scanId}`).emit('scan-completed', { 
        scanId, 
        results: mockResults 
      });
    }, 3000 + Math.random() * 2000); // 3-5 seconds

    res.json({ message: 'Scan started', scanId });
  } catch (error) {
    console.error('Start scan error:', error);
    res.status(500).json({ error: 'Failed to start scan' });
  }
});

// Get all scans for user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const scans = await Scan.find({ userId }).sort({ createdAt: -1 });
    res.json(scans);
  } catch (error) {
    console.error('Get user scans error:', error);
    res.status(500).json({ error: 'Failed to get scans' });
  }
});

// Get all scans for user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const scans = await Scan.find({ userId }).sort({ createdAt: -1 });
    res.json(scans);
  } catch (error) {
    console.error('Get user scans error:', error);
    res.status(500).json({ error: 'Failed to get scans' });
  }
});

// Target analysis endpoint
router.post('/analyze-target', async (req, res) => {
  try {
    const { targetUrl } = req.body;
    
    // Simulate target analysis
    setTimeout(() => {
      const targetInfo = {
        domain: targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''),
        ip: "192.168.1.100",
        server: "Apache/2.4.41 (Ubuntu)",
        ssl: targetUrl.startsWith('https'),
        country: "United States",
        responseTime: "245ms",
        technologies: ["React", "Node.js", "Express"],
        ports: [80, 443, 22]
      };
      
      const suggestedScans = [
        { id: "sql-injection", name: "SQL Injection Scanner", priority: "High", category: "OWASP A03" },
        { id: "xss", name: "Cross-Site Scripting Scanner", priority: "High", category: "OWASP A03" },
        { id: "csrf", name: "CSRF Protection Scanner", priority: "Medium", category: "OWASP A01" },
        { id: "access-control", name: "Access Control Scanner", priority: "High", category: "OWASP A01" }
      ];
      
      res.json({
        targetInfo,
        suggestedScans,
        scanId: `CGX-${Date.now().toString().slice(-5)}`
      });
    }, 1500);
  } catch (error) {
    console.error('Target analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze target' });
  }
});

// Mock scan results generator
function generateMockScanResults(module, targetUrl) {
  const baseResults = {
    scanType: module,
    targetUrl,
    timestamp: new Date(),
    duration: Math.floor(Math.random() * 5000) + 2000,
    vulnerabilities: []
  };

  // Generate mock vulnerabilities based on scan type
  const mockVulns = {
    'sql-injection': [
      { severity: 'High', type: 'SQL Injection', location: '/login', description: 'Potential SQL injection in login form' },
      { severity: 'Medium', type: 'Blind SQL Injection', location: '/search', description: 'Time-based blind SQL injection detected' }
    ],
    'xss': [
      { severity: 'High', type: 'Reflected XSS', location: '/search?q=', description: 'User input reflected without sanitization' },
      { severity: 'Medium', type: 'Stored XSS', location: '/comments', description: 'Stored XSS in comment section' }
    ],
    'csrf': [
      { severity: 'Medium', type: 'CSRF', location: '/profile/update', description: 'Missing CSRF token in profile update' }
    ],
    'access-control': [
      { severity: 'High', type: 'Broken Access Control', location: '/admin', description: 'Admin panel accessible without authentication' }
    ]
  };

  if (mockVulns[module]) {
    baseResults.vulnerabilities = mockVulns[module];
  }

  return baseResults;
}

module.exports = router;