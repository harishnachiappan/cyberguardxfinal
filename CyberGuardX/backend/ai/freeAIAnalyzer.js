const axios = require('axios');
const cheerio = require('cheerio');
const dns = require('dns').promises;
const geoip = require('geoip-lite');

class FreeAITargetAnalyzer {
  constructor() {
    // Free AI services (no API keys required for basic functionality)
    this.aiServices = [
      {
        name: 'Local Intelligence Engine',
        type: 'local',
        available: true
      },
      {
        name: 'Ollama Local',
        endpoint: 'http://localhost:11434/api/generate',
        type: 'ollama',
        available: false
      }
    ];
  }

  async analyzeTarget(targetUrl) {
    try {
      console.log(`🤖 Free AI analyzing target: ${targetUrl}`);
      
      // Step 1: Gather technical information
      const techInfo = await this.gatherTechnicalInfo(targetUrl);
      
      // Step 2: AI-powered analysis using local intelligence
      const aiAnalysis = await this.performLocalAIAnalysis(targetUrl, techInfo);
      
      // Step 3: Generate vulnerability recommendations
      const recommendations = await this.generateSmartRecommendations(techInfo, aiAnalysis);
      
      return {
        targetInfo: techInfo,
        aiAnalysis,
        recommendations,
        chatContext: this.initializeChatContext(targetUrl, techInfo)
      };
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return this.getFallbackAnalysis(targetUrl);
    }
  }

  async gatherTechnicalInfo(targetUrl) {
    const info = {
      url: targetUrl,
      domain: new URL(targetUrl).hostname,
      timestamp: new Date().toISOString()
    };

    try {
      // DNS Resolution
      const dnsInfo = await dns.lookup(info.domain);
      info.ip = dnsInfo.address;
      info.family = dnsInfo.family;

      // Geolocation
      const geo = geoip.lookup(info.ip);
      info.location = geo ? {
        country: geo.country,
        region: geo.region,
        city: geo.city,
        timezone: geo.timezone
      } : null;

      // HTTP Response Analysis
      const response = await axios.get(targetUrl, {
        timeout: 10000,
        maxRedirects: 5,
        validateStatus: () => true
      });

      info.httpStatus = response.status;
      info.headers = response.headers;
      info.responseTime = response.headers['x-response-time'] || 'N/A';
      
      // Technology Detection
      info.technologies = this.detectTechnologies(response.headers, response.data);
      
      // Security Headers Analysis
      info.securityHeaders = this.analyzeSecurityHeaders(response.headers);
      
      // Content Analysis
      const $ = cheerio.load(response.data);
      info.pageInfo = {
        title: $('title').text(),
        forms: $('form').length,
        inputs: $('input').length,
        links: $('a').length,
        scripts: $('script').length,
        hasLogin: this.detectLoginForms($)
      };

      // SSL Check
      info.ssl = { valid: targetUrl.startsWith('https') };

    } catch (error) {
      console.error('Technical info gathering error:', error);
      info.error = error.message;
    }

    return info;
  }

  detectTechnologies(headers, html) {
    const technologies = [];
    
    // Server detection
    if (headers.server) {
      technologies.push({ name: headers.server, category: 'Web Server' });
    }
    
    // Framework detection
    if (headers['x-powered-by']) {
      technologies.push({ name: headers['x-powered-by'], category: 'Framework' });
    }
    
    // Content-based detection
    const techPatterns = [
      { pattern: /react/i, name: 'React', category: 'Frontend' },
      { pattern: /angular/i, name: 'Angular', category: 'Frontend' },
      { pattern: /vue/i, name: 'Vue.js', category: 'Frontend' },
      { pattern: /jquery/i, name: 'jQuery', category: 'Library' },
      { pattern: /bootstrap/i, name: 'Bootstrap', category: 'CSS Framework' },
      { pattern: /wordpress/i, name: 'WordPress', category: 'CMS' },
      { pattern: /php/i, name: 'PHP', category: 'Backend' }
    ];
    
    techPatterns.forEach(tech => {
      if (tech.pattern.test(html)) {
        technologies.push({ name: tech.name, category: tech.category });
      }
    });
    
    return technologies;
  }

  analyzeSecurityHeaders(headers) {
    return {
      'Content-Security-Policy': headers['content-security-policy'] ? 'Present' : 'Missing',
      'X-Frame-Options': headers['x-frame-options'] ? 'Present' : 'Missing',
      'X-XSS-Protection': headers['x-xss-protection'] ? 'Present' : 'Missing',
      'X-Content-Type-Options': headers['x-content-type-options'] ? 'Present' : 'Missing',
      'Strict-Transport-Security': headers['strict-transport-security'] ? 'Present' : 'Missing'
    };
  }

  detectLoginForms($) {
    const loginIndicators = ['login', 'signin', 'password', 'username', 'email'];
    let hasLogin = false;
    
    $('form').each((i, form) => {
      const formHtml = $(form).html().toLowerCase();
      if (loginIndicators.some(indicator => formHtml.includes(indicator))) {
        hasLogin = true;
      }
    });
    
    return hasLogin;
  }

  async performLocalAIAnalysis(targetUrl, techInfo) {
    // Advanced local AI using pattern recognition and security knowledge base
    let analysis = "🤖 AI Security Assessment:\n\n";
    
    const riskFactors = [];
    const recommendations = [];
    
    // Technology-based risk assessment
    const technologies = techInfo.technologies || [];
    
    technologies.forEach(tech => {
      const techName = tech.name.toLowerCase();
      
      if (techName.includes('php')) {
        riskFactors.push('PHP backend detected - high risk for code injection');
        recommendations.push('Prioritize SQL injection and code injection testing');
      }
      
      if (techName.includes('wordpress')) {
        riskFactors.push('WordPress CMS - plugin vulnerabilities common');
        recommendations.push('Check for outdated plugins and themes');
      }
      
      if (techName.includes('apache')) {
        riskFactors.push('Apache server - configuration review needed');
        recommendations.push('Verify server configuration and security headers');
      }
      
      if (techName.includes('mysql') || techName.includes('database')) {
        riskFactors.push('Database system detected - SQL injection risk');
        recommendations.push('Comprehensive SQL injection testing required');
      }
    });
    
    // Security headers analysis
    const securityHeaders = techInfo.securityHeaders || {};
    const missingHeaders = Object.entries(securityHeaders)
      .filter(([key, value]) => value === 'Missing');
    
    if (missingHeaders.length > 2) {
      riskFactors.push(`${missingHeaders.length} critical security headers missing`);
      recommendations.push('Implement missing security headers immediately');
    }
    
    // SSL/HTTPS analysis
    if (!techInfo.ssl?.valid) {
      riskFactors.push('No HTTPS encryption detected');
      recommendations.push('Implement SSL/TLS encryption');
    }
    
    // Form analysis
    if (techInfo.pageInfo?.hasLogin) {
      riskFactors.push('Authentication system present');
      recommendations.push('Test for authentication bypass and session management');
    }
    
    if (techInfo.pageInfo?.forms > 0) {
      riskFactors.push(`${techInfo.pageInfo.forms} forms detected`);
      recommendations.push('Test all forms for XSS and CSRF vulnerabilities');
    }
    
    // Calculate risk level
    let riskLevel = 'Low';
    if (riskFactors.length >= 4) riskLevel = 'Critical';
    else if (riskFactors.length >= 3) riskLevel = 'High';
    else if (riskFactors.length >= 2) riskLevel = 'Medium';
    
    // Build analysis report
    analysis += `🎯 Risk Level: ${riskLevel}\n\n`;
    
    if (riskFactors.length > 0) {
      analysis += `⚠️ Security Concerns:\n`;
      riskFactors.forEach(factor => {
        analysis += `• ${factor}\n`;
      });
      analysis += '\n';
    }
    
    if (recommendations.length > 0) {
      analysis += `🔧 Recommendations:\n`;
      recommendations.slice(0, 4).forEach(rec => {
        analysis += `• ${rec}\n`;
      });
    }
    
    analysis += `\n💡 AI suggests starting with high-priority scans based on detected technologies and missing security controls.`;
    
    return analysis;
  }

  async generateSmartRecommendations(techInfo, aiAnalysis) {
    const recommendations = [];
    
    // Smart recommendations based on findings
    const vulnMap = {
      'sql-injection': {
        priority: 'High',
        reason: 'Database interactions detected',
        tools: ['sqlmap', 'custom-sql-scanner'],
        estimatedTime: '5-10 minutes'
      },
      'xss': {
        priority: 'High', 
        reason: 'User input forms detected',
        tools: ['xssstrike', 'custom-xss-scanner'],
        estimatedTime: '4-8 minutes'
      },
      'csrf': {
        priority: 'Medium',
        reason: 'Forms without CSRF protection',
        tools: ['custom-csrf-scanner'],
        estimatedTime: '2-5 minutes'
      },
      'access-control': {
        priority: 'High',
        reason: 'Authentication mechanisms present',
        tools: ['custom-auth-scanner'],
        estimatedTime: '3-7 minutes'
      }
    };

    // Login form detected
    if (techInfo.pageInfo?.hasLogin) {
      recommendations.push({
        id: 'sql-injection',
        name: 'SQL Injection Scanner',
        category: 'OWASP A03',
        priority: 'High',
        reason: 'Login forms detected - high SQL injection risk',
        estimatedTime: '5-10 minutes',
        tools: vulnMap['sql-injection'].tools
      });
      
      recommendations.push({
        id: 'access-control',
        name: 'Access Control Scanner', 
        category: 'OWASP A01',
        priority: 'High',
        reason: 'Authentication system requires access control testing',
        estimatedTime: '3-7 minutes',
        tools: vulnMap['access-control'].tools
      });
    }

    // Forms detected
    if (techInfo.pageInfo?.forms > 0) {
      recommendations.push({
        id: 'xss',
        name: 'Cross-Site Scripting Scanner',
        category: 'OWASP A03', 
        priority: 'High',
        reason: `${techInfo.pageInfo.forms} forms detected - XSS vulnerability risk`,
        estimatedTime: '4-8 minutes',
        tools: vulnMap['xss'].tools
      });
      
      recommendations.push({
        id: 'csrf',
        name: 'CSRF Protection Scanner',
        category: 'OWASP A01',
        priority: 'Medium',
        reason: 'Forms require CSRF token validation',
        estimatedTime: '2-5 minutes', 
        tools: vulnMap['csrf'].tools
      });
    }

    // Security headers analysis
    const missingHeaders = Object.entries(techInfo.securityHeaders || {})
      .filter(([key, value]) => value === 'Missing').length;
    
    if (missingHeaders > 2) {
      recommendations.push({
        id: 'security-headers',
        name: 'Security Headers Scanner',
        category: 'Security Configuration',
        priority: 'Medium',
        reason: `${missingHeaders} critical security headers missing`,
        estimatedTime: '1-3 minutes',
        tools: ['custom-header-scanner']
      });
    }

    // SSL/TLS analysis
    if (!techInfo.ssl?.valid) {
      recommendations.push({
        id: 'ssl-tls',
        name: 'SSL/TLS Security Scanner',
        category: 'Cryptographic Failures',
        priority: 'High',
        reason: 'No HTTPS encryption detected',
        estimatedTime: '2-4 minutes',
        tools: ['sslscan', 'testssl']
      });
    }

    return recommendations.slice(0, 6);
  }

  initializeChatContext(targetUrl, techInfo) {
    return {
      targetUrl,
      conversationHistory: [],
      context: {
        technologies: techInfo.technologies,
        securityHeaders: techInfo.securityHeaders,
        hasLogin: techInfo.pageInfo?.hasLogin,
        formCount: techInfo.pageInfo?.forms,
        riskLevel: this.calculateRiskLevel(techInfo)
      },
      suggestions: [
        "What vulnerabilities should I prioritize?",
        "Explain the security risks found",
        "What tools will be used for scanning?",
        "How long will the complete scan take?"
      ]
    };
  }

  calculateRiskLevel(techInfo) {
    let riskScore = 0;
    
    if (techInfo.pageInfo?.hasLogin) riskScore += 2;
    if (techInfo.pageInfo?.forms > 0) riskScore += 1;
    if (!techInfo.ssl?.valid) riskScore += 2;
    
    const missingHeaders = Object.values(techInfo.securityHeaders || {})
      .filter(v => v === 'Missing').length;
    riskScore += missingHeaders;
    
    if (riskScore >= 5) return 'High';
    if (riskScore >= 3) return 'Medium';
    return 'Low';
  }

  async chatWithAI(message, context) {
    try {
      // Local AI chat using pattern matching and security knowledge
      const response = this.generateLocalAIResponse(message, context);
      
      // Update conversation history
      context.conversationHistory.push(
        { role: 'user', message, timestamp: new Date() },
        { role: 'assistant', message: response, timestamp: new Date() }
      );
      
      return {
        response,
        context,
        suggestions: this.generateFollowUpSuggestions(message, response)
      };
    } catch (error) {
      return {
        response: "I'm here to help with your security scanning. What would you like to know about the vulnerabilities or scanning process?",
        context,
        suggestions: context.suggestions
      };
    }
  }

  generateLocalAIResponse(message, context) {
    const lowerMessage = message.toLowerCase();
    
    // Pattern-based responses
    if (lowerMessage.includes('prioritize') || lowerMessage.includes('priority')) {
      return `Based on the analysis, I recommend starting with:\n\n1. ${context.context.hasLogin ? 'SQL Injection testing (login forms detected)' : 'XSS testing (forms detected)'}\n2. Access control verification\n3. Security headers configuration\n\nHigh-priority scans should be completed first for maximum security impact.`;
    }
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('security')) {
      const riskLevel = context.context.riskLevel;
      return `Security Risk Assessment: ${riskLevel}\n\nKey findings:\n• ${context.context.formCount || 0} forms detected\n• ${context.context.hasLogin ? 'Authentication system present' : 'No login system detected'}\n• Security headers need review\n\nThe ${riskLevel.toLowerCase()} risk level indicates ${riskLevel === 'High' ? 'immediate attention required' : 'standard security measures needed'}.`;
    }
    
    if (lowerMessage.includes('tool') || lowerMessage.includes('scan')) {
      return `Scanning Tools Available:\n\n🔧 SQL Injection: Custom scanner + SQLMap\n🔧 XSS Detection: Payload-based testing\n🔧 CSRF Testing: Token validation\n🔧 Access Control: Authorization bypass testing\n\nAll tools are integrated and will run automatically when you start each scan.`;
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('long')) {
      return `Estimated Scan Duration:\n\n⏱️ SQL Injection: 5-10 minutes\n⏱️ XSS Testing: 4-8 minutes\n⏱️ CSRF Check: 2-5 minutes\n⏱️ Access Control: 3-7 minutes\n\nTotal estimated time: 15-30 minutes for complete assessment. You can run scans individually or in sequence.`;
    }
    
    if (lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      return `Ready to start scanning! 🚀\n\nRecommended sequence:\n1. Click 'Start Scan' on the highest priority vulnerability\n2. Monitor real-time progress\n3. Review results when complete\n4. Proceed to next scan\n\nI'll guide you through each step and explain the findings.`;
    }
    
    // Default helpful response
    return `I'm here to help with your security assessment of ${context.targetUrl}. \n\nI can explain:\n• Vulnerability priorities and risks\n• Scanning tools and methodologies\n• Expected timeframes and results\n• Next steps in the security process\n\nWhat specific aspect would you like to know more about?`;
  }

  generateFollowUpSuggestions(userMessage, aiResponse) {
    const suggestions = [
      "Start the recommended scans",
      "Explain scan methodology", 
      "Show expected results",
      "Security best practices"
    ];
    
    if (userMessage.toLowerCase().includes('tool')) {
      suggestions.unshift("What tools are most effective?");
    }
    
    if (userMessage.toLowerCase().includes('time')) {
      suggestions.unshift("How to optimize scan time?");
    }
    
    return suggestions.slice(0, 4);
  }

  getFallbackAnalysis(targetUrl) {
    return {
      targetInfo: {
        url: targetUrl,
        domain: new URL(targetUrl).hostname,
        error: 'Limited analysis mode'
      },
      aiAnalysis: '🤖 Local AI Analysis: Standard vulnerability assessment recommended. Unable to perform deep analysis, but basic security scans are available.',
      recommendations: this.getDefaultRecommendations(),
      chatContext: {
        targetUrl,
        conversationHistory: [],
        context: { fallbackMode: true },
        suggestions: ["Start basic vulnerability scan", "View scan modules", "Check scan status"]
      }
    };
  }

  getDefaultRecommendations() {
    return [
      {
        id: 'sql-injection',
        name: 'SQL Injection Scanner',
        category: 'OWASP A03',
        priority: 'High',
        reason: 'Standard security assessment',
        estimatedTime: '5-10 minutes',
        tools: ['sqlmap']
      },
      {
        id: 'xss',
        name: 'Cross-Site Scripting Scanner', 
        category: 'OWASP A03',
        priority: 'High',
        reason: 'Standard security assessment',
        estimatedTime: '4-8 minutes',
        tools: ['xssstrike']
      }
    ];
  }
}

module.exports = FreeAITargetAnalyzer;