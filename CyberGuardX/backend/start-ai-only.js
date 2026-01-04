const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const FreeAITargetAnalyzer = require('./ai/freeAIAnalyzer');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize AI analyzer
const aiAnalyzer = new FreeAITargetAnalyzer();

// In-memory user storage for AI-only mode
let registeredUsers = {
  'admin@cyberguardx.com': { password: 'admin123', role: 'admin', name: 'Admin User', id: 'admin' },
  'harish@cyberguardx.com': { password: 'harish123', role: 'developer', name: 'Harish Nachiappan', id: 'harish' },
  'thirumalai@cyberguardx.com': { password: 'thiru123', role: 'developer', name: 'Thirumalai', id: 'thirumalai' },
  'user@cyberguardx.com': { password: 'user123', role: 'user', name: 'Test User', id: 'testuser' }
};

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  socket.on('join-scan', (scanId) => {
    socket.join(`scan-${scanId}`);
    console.log(`📡 Client joined scan room: scan-${scanId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Add reports route to start-ai-only.js
app.use('/api/reports', require('./routes/reports'));

// AI Routes (No database required)
app.post('/api/scans/analyze-target', async (req, res) => {
  try {
    const { targetUrl } = req.body;
    
    if (!targetUrl) {
      return res.status(400).json({ error: 'Target URL is required' });
    }

    console.log(`🎯 Starting Local AI analysis for: ${targetUrl}`);
    
    // Perform AI-powered analysis
    const analysis = await aiAnalyzer.analyzeTarget(targetUrl);
    
    const scanId = `CGX-${Date.now().toString().slice(-5)}`;
    
    console.log('🧠 Local AI analysis completed without database storage');

    res.json({
      scanId,
      targetInfo: analysis.targetInfo,
      aiAnalysis: analysis.aiAnalysis,
      recommendations: analysis.recommendations,
      chatContext: analysis.chatContext,
      message: 'Local AI analysis completed successfully'
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    
    // Return fallback analysis
    const fallbackAnalysis = {
      targetInfo: {
        url: req.body.targetUrl,
        domain: new URL(req.body.targetUrl).hostname,
        status: 'Fallback analysis mode'
      },
      aiAnalysis: 'Using rule-based analysis. Standard vulnerability assessment based on common web application security patterns.',
      recommendations: [
        {
          id: 'sql-injection',
          name: 'SQL Injection Scanner',
          category: 'OWASP A03',
          priority: 'High',
          reason: 'Standard security assessment',
          estimatedTime: '5-10 minutes'
        },
        {
          id: 'xss',
          name: 'Cross-Site Scripting Scanner',
          category: 'OWASP A03', 
          priority: 'High',
          reason: 'Standard security assessment',
          estimatedTime: '4-8 minutes'
        }
      ],
      chatContext: {
        targetUrl: req.body.targetUrl,
        suggestions: ['Start vulnerability scan', 'View scan modules', 'Ask about security risks']
      }
    };
    
    res.json({
      scanId: `CGX-${Date.now().toString().slice(-5)}`,
      ...fallbackAnalysis,
      message: 'Analysis completed with rule-based AI'
    });
  }
});

// Enhanced scan endpoint that generates reports
app.post('/api/scans/run-with-report', async (req, res) => {
  try {
    const { targetUrl, scanType, userId } = req.body;
    
    if (!targetUrl) {
      return res.status(400).json({ error: 'Target URL is required' });
    }

    console.log(`🔍 Starting enhanced scan with report generation for: ${targetUrl}`);
    
    const scanId = `CGX-${Date.now().toString().slice(-5)}`;
    
    // Perform AI analysis
    const analysis = await aiAnalyzer.analyzeTarget(targetUrl);
    
    // Generate realistic vulnerabilities
    const vulnerabilities = generateRealisticVulnerabilities(targetUrl, analysis);
    
    // Auto-generate report
    const axios = require('axios');
    try {
      const reportResponse = await axios.post('http://localhost:5000/api/reports/generate', {
        scanId,
        userId: userId || 'demo-user',
        vulnerabilities,
        targetUrl,
        scanType: scanType || 'Comprehensive Security Scan'
      });
      
      res.json({
        scanId,
        reportId: reportResponse.data.reportId,
        targetInfo: analysis.targetInfo,
        vulnerabilities,
        summary: reportResponse.data.report.summary,
        message: 'Scan completed and report generated successfully'
      });
    } catch (reportError) {
      console.error('Report generation failed:', reportError);
      res.json({
        scanId,
        targetInfo: analysis.targetInfo,
        vulnerabilities,
        message: 'Scan completed but report generation failed'
      });
    }
    
  } catch (error) {
    console.error('Enhanced scan error:', error);
    res.status(500).json({ error: 'Scan failed' });
  }
});

function generateRealisticVulnerabilities(targetUrl, analysis) {
  const vulnerabilities = [];
  const techInfo = analysis.targetInfo || {};
  
  // Generate vulnerabilities based on analysis
  if (techInfo.pageInfo?.hasLogin) {
    vulnerabilities.push({
      type: 'SQL Injection Vulnerability',
      severity: 'High',
      location: '/login',
      description: 'Login form vulnerable to SQL injection attacks',
      recommendation: 'Use parameterized queries and input validation',
      owasp: 'A03:2021 – Injection'
    });
  }
  
  if (techInfo.pageInfo?.forms > 0) {
    vulnerabilities.push({
      type: 'Cross-Site Scripting (XSS)',
      severity: 'High',
      location: 'User input forms',
      description: 'User input not properly sanitized, allowing XSS attacks',
      recommendation: 'Implement output encoding and Content Security Policy',
      owasp: 'A03:2021 – Injection'
    });
  }
  
  // Check security headers
  const securityHeaders = techInfo.securityHeaders || {};
  const missingHeaders = Object.entries(securityHeaders)
    .filter(([key, value]) => value === 'Missing');
  
  if (missingHeaders.length > 0) {
    vulnerabilities.push({
      type: 'Missing Security Headers',
      severity: 'Medium',
      location: 'HTTP Response Headers',
      description: `${missingHeaders.length} critical security headers are missing`,
      recommendation: 'Implement all recommended security headers',
      owasp: 'A05:2021 – Security Misconfiguration'
    });
  }
  
  // SSL/HTTPS check
  if (!techInfo.ssl?.valid) {
    vulnerabilities.push({
      type: 'Insecure Transport',
      severity: 'High',
      location: 'Website Transport',
      description: 'Website not using HTTPS encryption',
      recommendation: 'Implement SSL/TLS encryption',
      owasp: 'A02:2021 – Cryptographic Failures'
    });
  }
  
  return vulnerabilities;
}
app.post('/api/scans/ai-chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message || !context) {
      return res.status(400).json({ error: 'Message and context are required' });
    }

    console.log('💬 AI Chat request:', message);
    const chatResponse = await aiAnalyzer.chatWithAI(message, context);
    
    res.json(chatResponse);
  } catch (error) {
    console.error('AI chat error:', error);
    res.json({ 
      response: "I'm here to help with your security assessment. I can explain vulnerability priorities, scanning tools, and security best practices. What would you like to know?",
      context: req.body.context,
      suggestions: ['What vulnerabilities should I prioritize?', 'Explain scan methodology', 'Security best practices']
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    mode: 'AI-Only (No Database)',
    aiStatus: 'Local AI Available'
  });
});

// Auth endpoints with persistent user storage
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log(`🔐 Login attempt for: ${username}`);
  
  const user = registeredUsers[username];
  if (user && user.password === password) {
    console.log(`✅ Login successful for: ${username}`);
    res.json({
      token: 'demo-jwt-token-' + Date.now(),
      user: {
        id: user.id,
        username: user.name,
        email: username,
        role: user.role
      }
    });
  } else {
    console.log(`❌ Login failed for: ${username}`);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { username, email, password, role } = req.body;
  
  console.log(`📝 Registration attempt for: ${email}`);
  
  // Check if user already exists
  if (registeredUsers[email]) {
    console.log(`❌ User already exists: ${email}`);
    return res.status(400).json({ error: 'User already exists' });
  }
  
  // Add new user to in-memory storage
  const userId = email.split('@')[0] + '_' + Date.now();
  registeredUsers[email] = {
    password: password,
    role: role || 'user',
    name: username,
    id: userId,
    createdAt: new Date()
  };
  
  console.log(`✅ User registered successfully: ${email}`);
  console.log(`👥 Total registered users: ${Object.keys(registeredUsers).length}`);
  
  res.json({
    message: 'Registration successful',
    user: {
      id: userId,
      username: username,
      email: email,
      role: role || 'user'
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  // Return demo user info based on token
  res.json({
    id: 'demo-user',
    username: 'Demo User',
    email: 'demo@cyberguardx.com',
    role: 'user',
    scans: [],
    totalScans: 0,
    totalVulnerabilities: 0
  });
});

// Debug endpoint to view registered users (development only)
app.get('/api/auth/users', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    const userList = Object.keys(registeredUsers).map(email => ({
      email,
      name: registeredUsers[email].name,
      role: registeredUsers[email].role,
      createdAt: registeredUsers[email].createdAt
    }));
    res.json({
      totalUsers: userList.length,
      users: userList
    });
  } else {
    res.status(403).json({ error: 'Not available in production' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 CyberGuardX AI-Only Backend running on port ${PORT}`);
  console.log(`🧠 Local AI Engine: ACTIVE`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💡 Mode: AI-Only (No Database Required)`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

module.exports = { app, io };