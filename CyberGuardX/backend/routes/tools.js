const express = require('express');
const ProfessionalSecurityTools = require('../tools/professionalTools');

const router = express.Router();
const securityTools = new ProfessionalSecurityTools();

// Check tool availability
router.get('/status', async (req, res) => {
  try {
    console.log('🔧 Checking security tools availability...');
    
    const availability = await securityTools.checkToolAvailability();
    const installInstructions = securityTools.generateInstallInstructions();
    
    // Count available tools
    const totalTools = Object.keys(availability).length;
    const availableTools = Object.values(availability).filter(tool => tool.available).length;
    
    res.json({
      status: 'success',
      summary: {
        total: totalTools,
        available: availableTools,
        missing: totalTools - availableTools,
        readiness: Math.round((availableTools / totalTools) * 100)
      },
      tools: availability,
      installInstructions,
      recommendations: generateRecommendations(availability)
    });
  } catch (error) {
    console.error('Tool status check error:', error);
    res.status(500).json({
      status: 'error',
      error: 'Failed to check tool availability',
      details: error.message
    });
  }
});

// Get installation guide
router.get('/install-guide', (req, res) => {
  const installGuide = {
    quickSetup: {
      linux: [
        'sudo apt-get update',
        'sudo apt-get install nmap sqlmap nikto',
        'gem install wpscan'
      ],
      docker: [
        'docker run -d -p 8080:8080 owasp/zap2docker-stable zap.sh -daemon -host 0.0.0.0 -port 8080'
      ]
    },
    individual: securityTools.generateInstallInstructions(),
    verification: {
      commands: [
        'nmap --version',
        'sqlmap --version', 
        'nikto -Version'
      ]
    }
  };
  
  res.json(installGuide);
});

// Test specific tool
router.post('/test/:toolName', async (req, res) => {
  try {
    const { toolName } = req.params;
    
    res.json({
      tool: toolName,
      available: false,
      message: `${toolName} testing not implemented in demo mode`
    });
  } catch (error) {
    res.json({
      tool: req.params.toolName,
      available: false,
      error: error.message,
      message: `${req.params.toolName} is not available`
    });
  }
});

// Get recommended tool combinations for scan types
router.get('/recommendations', (req, res) => {
  const recommendations = {
    'web-application': {
      primary: ['zap', 'sqlmap', 'nuclei'],
      secondary: ['nikto', 'wpscan'],
      description: 'Comprehensive web application security testing'
    },
    'network-security': {
      primary: ['nmap', 'nuclei'],
      secondary: ['testssl'],
      description: 'Network infrastructure security assessment'
    },
    'quick-scan': {
      primary: ['nuclei', 'nikto'],
      secondary: ['nmap'],
      description: 'Fast vulnerability identification'
    }
  };
  
  res.json(recommendations);
});

function generateRecommendations(availability) {
  const recommendations = [];
  
  // Check for essential tools
  if (!availability.nmap?.available) {
    recommendations.push({
      priority: 'high',
      tool: 'Nmap',
      reason: 'Essential for network discovery and port scanning',
      action: 'Install with: sudo apt-get install nmap'
    });
  }
  
  if (!availability.zap?.available) {
    recommendations.push({
      priority: 'medium',
      tool: 'OWASP ZAP',
      reason: 'Industry standard for web application security testing',
      action: 'Download from owasp.org and start daemon mode'
    });
  }
  
  if (!availability.sqlmap?.available) {
    recommendations.push({
      priority: 'medium',
      tool: 'SQLMap',
      reason: 'Best-in-class SQL injection testing tool',
      action: 'Install with: sudo apt-get install sqlmap'
    });
  }
  
  return recommendations;
}

module.exports = router;