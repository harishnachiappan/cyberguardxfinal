const express = require('express');
const PDFReportGenerator = require('../utils/pdfGenerator');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const pdfGenerator = new PDFReportGenerator();

// In-memory storage for AI-only mode
let reportsStorage = new Map();
let scanResults = new Map();

// Generate report from scan (AI-only mode)
router.post('/generate', async (req, res) => {
  try {
    const { scanId, userId, vulnerabilities, targetUrl, scanType } = req.body;
    
    const reportId = `RPT-${Date.now().toString().slice(-5)}`;
    
    const reportData = {
      reportId,
      scanId,
      userId,
      targetUrl: targetUrl || 'Unknown Target',
      scanType: scanType || 'Security Scan',
      vulnerabilities: vulnerabilities || [],
      summary: generateReportSummary(vulnerabilities || []),
      createdAt: new Date(),
      status: 'Completed'
    };

    // Store in memory
    reportsStorage.set(reportId, reportData);
    
    console.log(`📄 Report generated: ${reportId} for ${targetUrl}`);

    res.json({
      reportId,
      message: 'Report generated successfully',
      report: reportData
    });
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// Get report by ID (AI-only mode)
router.get('/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = reportsStorage.get(reportId);
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ error: 'Failed to get report' });
  }
});

// Get all reports for user (AI-only mode)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userReports = Array.from(reportsStorage.values())
      .filter(report => report.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(userReports);
  } catch (error) {
    console.error('Get user reports error:', error);
    res.status(500).json({ error: 'Failed to get reports' });
  }
});

// Get dashboard statistics (AI-only mode)
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userReports = Array.from(reportsStorage.values())
      .filter(report => report.userId === userId);
    
    let totalVulnerabilities = 0;
    let severityCounts = { critical: 0, high: 0, medium: 0, low: 0 };
    
    userReports.forEach(report => {
      if (report.vulnerabilities) {
        totalVulnerabilities += report.vulnerabilities.length;
        report.vulnerabilities.forEach(vuln => {
          const severity = vuln.severity.toLowerCase();
          if (severityCounts[severity] !== undefined) {
            severityCounts[severity]++;
          }
        });
      }
    });

    const stats = {
      totalScans: userReports.length,
      totalReports: userReports.length,
      totalVulnerabilities,
      criticalCount: severityCounts.critical,
      highCount: severityCounts.high,
      mediumCount: severityCounts.medium,
      lowCount: severityCounts.low,
      recentScans: userReports.slice(0, 6).map(report => ({
        id: report.reportId,
        target: report.targetUrl,
        status: report.status,
        vulnerabilities: report.vulnerabilities ? report.vulnerabilities.length : 0,
        date: formatRelativeTime(report.createdAt)
      }))
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Download PDF report
router.get('/:reportId/download', async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = reportsStorage.get(reportId);
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    console.log(`📥 Generating PDF for report: ${reportId}`);
    
    // Generate PDF
    const pdfBuffer = await pdfGenerator.generateReport(report);
    
    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="CyberGuardX-Report-${reportId}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF download error:', error);
    res.status(500).json({ error: 'Failed to generate PDF report' });
  }
});

// Helper function to generate report summary
function generateReportSummary(vulnerabilities) {
  const severityCounts = { critical: 0, high: 0, medium: 0, low: 0 };
  
  vulnerabilities.forEach(vuln => {
    const severity = vuln.severity.toLowerCase();
    if (severityCounts[severity] !== undefined) {
      severityCounts[severity]++;
    }
  });

  const totalVulns = vulnerabilities.length;
  const riskScore = calculateRiskScore(severityCounts);
  
  return {
    totalVulnerabilities: totalVulns,
    severityBreakdown: severityCounts,
    riskScore,
    riskLevel: getRiskLevel(riskScore),
    recommendations: generateRecommendations(severityCounts)
  };
}

function calculateRiskScore(severityCounts) {
  return (severityCounts.critical * 10) + 
         (severityCounts.high * 7) + 
         (severityCounts.medium * 4) + 
         (severityCounts.low * 1);
}

function getRiskLevel(score) {
  if (score >= 50) return 'Critical';
  if (score >= 25) return 'High';
  if (score >= 10) return 'Medium';
  return 'Low';
}

function generateRecommendations(severityCounts) {
  const recommendations = [];
  
  if (severityCounts.critical > 0) {
    recommendations.push('Immediately address critical vulnerabilities');
  }
  if (severityCounts.high > 0) {
    recommendations.push('Prioritize high-severity issues');
  }
  if (severityCounts.medium > 0) {
    recommendations.push('Plan remediation for medium-severity vulnerabilities');
  }
  
  return recommendations;
}

function formatRelativeTime(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

module.exports = router;