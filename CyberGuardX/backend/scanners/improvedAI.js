const FreeAITargetAnalyzer = require('../ai/freeAIAnalyzer');
const EnhancedVulnerabilityScanner = require('./enhancedScanner');

class ImprovedAIAnalyzer extends FreeAITargetAnalyzer {
  constructor() {
    super();
    this.vulnerabilityScanner = new EnhancedVulnerabilityScanner();
  }

  async analyzeTargetWithRealScanning(targetUrl) {
    try {
      console.log(`🤖 Enhanced AI analyzing: ${targetUrl}`);
      
      // Step 1: Basic reconnaissance
      const techInfo = await this.gatherTechnicalInfo(targetUrl);
      
      // Step 2: Real vulnerability scanning
      const scanId = `AI-${Date.now()}`;
      const scanResults = await this.vulnerabilityScanner.performComprehensiveScan(targetUrl, scanId);
      
      // Step 3: AI-powered analysis of findings
      const aiAnalysis = await this.analyzeFindings(techInfo, scanResults);
      
      // Step 4: Generate smart recommendations
      const recommendations = await this.generateAdvancedRecommendations(techInfo, scanResults);
      
      return {
        targetInfo: techInfo,
        scanResults,
        aiAnalysis,
        recommendations,
        chatContext: this.initializeChatContext(targetUrl, techInfo, scanResults)
      };
    } catch (error) {
      console.error('Enhanced AI Analysis Error:', error);
      return this.getFallbackAnalysis(targetUrl);
    }
  }

  async analyzeFindings(techInfo, scanResults) {
    const vulnerabilities = scanResults.vulnerabilities || [];
    const summary = scanResults.summary || {};
    
    let analysis = `🤖 Enhanced AI Security Assessment:\n\n`;
    
    // Risk assessment
    analysis += `🎯 Overall Risk Level: ${summary.riskLevel || 'Medium'}\n`;
    analysis += `📊 Total Vulnerabilities: ${summary.totalVulnerabilities || 0}\n\n`;
    
    // Severity breakdown
    if (summary.severityBreakdown) {
      analysis += `⚠️ Severity Breakdown:\n`;
      Object.entries(summary.severityBreakdown).forEach(([severity, count]) => {
        if (count > 0) {
          analysis += `• ${severity}: ${count} issues\n`;
        }
      });
      analysis += '\n';
    }
    
    // Technology-specific risks
    const technologies = techInfo.technologies || [];
    if (technologies.length > 0) {
      analysis += `🔧 Technology Stack Analysis:\n`;
      technologies.forEach(tech => {
        analysis += `• ${tech.name} (${tech.category})\n`;
      });
      analysis += '\n';
    }
    
    // Priority recommendations
    if (vulnerabilities.length > 0) {
      const highSeverity = vulnerabilities.filter(v => v.severity === 'High' || v.severity === 'Critical');
      if (highSeverity.length > 0) {
        analysis += `🚨 Critical Issues Requiring Immediate Attention:\n`;
        highSeverity.slice(0, 3).forEach(vuln => {
          analysis += `• ${vuln.type}: ${vuln.description}\n`;
        });
        analysis += '\n';
      }
    }
    
    analysis += `💡 AI recommends prioritizing high-severity vulnerabilities and implementing security headers for immediate risk reduction.`;
    
    return analysis;
  }

  async generateAdvancedRecommendations(techInfo, scanResults) {
    const recommendations = [];
    const vulnerabilities = scanResults.vulnerabilities || [];
    
    // Group vulnerabilities by type
    const vulnTypes = {};
    vulnerabilities.forEach(vuln => {
      if (!vulnTypes[vuln.type]) {
        vulnTypes[vuln.type] = [];
      }
      vulnTypes[vuln.type].push(vuln);
    });
    
    // Generate recommendations based on findings
    Object.entries(vulnTypes).forEach(([type, vulns]) => {
      const severity = vulns[0].severity;
      const priority = severity === 'Critical' || severity === 'High' ? 'High' : 'Medium';
      
      recommendations.push({
        id: type.toLowerCase().replace(/\s+/g, '-'),
        name: `${type} Remediation`,
        category: vulns[0].owasp || 'Security Issue',
        priority,
        reason: `${vulns.length} ${type.toLowerCase()} issue(s) detected`,
        estimatedTime: priority === 'High' ? '2-4 hours' : '1-2 hours',
        findings: vulns.length,
        recommendation: vulns[0].recommendation
      });
    });
    
    // Add proactive recommendations
    if (recommendations.length === 0) {
      recommendations.push({
        id: 'security-audit',
        name: 'Comprehensive Security Audit',
        category: 'Proactive Security',
        priority: 'Medium',
        reason: 'No immediate vulnerabilities found - conduct thorough audit',
        estimatedTime: '4-6 hours',
        findings: 0,
        recommendation: 'Perform deep security analysis and penetration testing'
      });
    }
    
    return recommendations.slice(0, 6);
  }

  initializeChatContext(targetUrl, techInfo, scanResults) {
    const context = super.initializeChatContext(targetUrl, techInfo);
    
    // Enhance context with scan results
    context.context.scanResults = scanResults.summary;
    context.context.vulnerabilityCount = scanResults.vulnerabilities?.length || 0;
    context.context.riskLevel = scanResults.summary?.riskLevel || 'Unknown';
    
    // Update suggestions based on findings
    if (scanResults.vulnerabilities?.length > 0) {
      context.suggestions = [
        "How do I fix the critical vulnerabilities?",
        "What's the priority order for remediation?",
        "Explain the security risks found",
        "Show me the detailed scan results"
      ];
    }
    
    return context;
  }
}

module.exports = ImprovedAIAnalyzer;