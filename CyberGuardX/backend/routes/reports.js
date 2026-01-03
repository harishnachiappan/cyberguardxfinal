const express = require('express');
const Report = require('../models/Report');
const Scan = require('../models/Scan');

const router = express.Router();

// Generate report from scan
router.post('/generate', async (req, res) => {
  try {
    const { scanId, userId } = req.body;
    
    const scan = await Scan.findOne({ scanId });
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    const reportId = `RPT-${Date.now().toString().slice(-5)}`;
    
    const report = new Report({
      reportId,
      scanId,
      userId,
      targetUrl: scan.targetUrl,
      scanType: scan.scanType,
      vulnerabilities: scan.vulnerabilities || [],
      summary: generateReportSummary(scan.vulnerabilities || []),
      createdAt: new Date()
    });

    await report.save();

    res.json({
      reportId,
      message: 'Report generated successfully',
      report
    });
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// Get report by ID
router.get('/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findOne({ reportId });
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ error: 'Failed to get report' });
  }
});

// Get all reports for user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await Report.find({ userId }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Get user reports error:', error);
    res.status(500).json({ error: 'Failed to get reports' });
  }
});

// Get dashboard statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const scans = await Scan.find({ userId });
    const reports = await Report.find({ userId });
    
    let totalVulnerabilities = 0;
    let severityCounts = { critical: 0, high: 0, medium: 0, low: 0 };
    
    scans.forEach(scan => {
      if (scan.vulnerabilities) {
        totalVulnerabilities += scan.vulnerabilities.length;
        scan.vulnerabilities.forEach(vuln => {
          const severity = vuln.severity.toLowerCase();
          if (severityCounts[severity] !== undefined) {
            severityCounts[severity]++;
          }
        });
      }
    });

    const stats = {
      totalScans: scans.length,
      totalReports: reports.length,
      totalVulnerabilities,
      criticalCount: severityCounts.critical,
      highCount: severityCounts.high,
      mediumCount: severityCounts.medium,
      lowCount: severityCounts.low,
      recentScans: scans.slice(0, 6).map(scan => ({
        id: scan.scanId,
        target: scan.targetUrl,
        status: scan.status,
        vulnerabilities: scan.vulnerabilities ? scan.vulnerabilities.length : 0,
        date: formatRelativeTime(scan.createdAt)
      }))
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Export report (PDF simulation)
router.get('/:reportId/export', async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findOne({ reportId });
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Simulate PDF generation
    const pdfData = {
      reportId: report.reportId,
      targetUrl: report.targetUrl,
      scanType: report.scanType,
      generatedAt: new Date(),
      vulnerabilities: report.vulnerabilities,
      summary: report.summary
    };

    res.json({
      message: 'Report exported successfully',
      downloadUrl: `/api/reports/${reportId}/download`,
      pdfData
    });
  } catch (error) {
    console.error('Export report error:', error);
    res.status(500).json({ error: 'Failed to export report' });
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