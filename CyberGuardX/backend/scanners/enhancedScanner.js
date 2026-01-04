const axios = require('axios');
const cheerio = require('cheerio');

class EnhancedVulnerabilityScanner {
  constructor() {
    this.scanResults = new Map();
  }

  async performComprehensiveScan(targetUrl, scanId) {
    const results = {
      scanId,
      targetUrl,
      startTime: new Date(),
      vulnerabilities: [],
      status: 'running'
    };

    try {
      // SQL Injection Testing
      const sqlResults = await this.testSQLInjection(targetUrl);
      results.vulnerabilities.push(...sqlResults);
      
      // XSS Testing
      const xssResults = await this.testXSS(targetUrl);
      results.vulnerabilities.push(...xssResults);
      
      // Security Headers Check
      const headerResults = await this.checkSecurityHeaders(targetUrl);
      results.vulnerabilities.push(...headerResults);

      results.status = 'completed';
      results.endTime = new Date();
      results.summary = this.generateSummary(results.vulnerabilities);
      
      return results;
      
    } catch (error) {
      results.status = 'failed';
      results.error = error.message;
      return results;
    }
  }

  async testSQLInjection(targetUrl) {
    const vulnerabilities = [];

    try {
      const response = await axios.get(targetUrl, { timeout: 5000 });
      const $ = cheerio.load(response.data);
      
      $('form').each((i, form) => {
        const $form = $(form);
        const inputs = $form.find('input[type="text"], input[type="password"]');
        
        if (inputs.length > 0) {
          vulnerabilities.push({
            type: 'Potential SQL Injection',
            severity: 'High',
            location: $form.attr('action') || 'Current page',
            description: 'Form inputs may be vulnerable to SQL injection',
            recommendation: 'Use parameterized queries and input validation',
            owasp: 'A03:2021 – Injection'
          });
        }
      });

    } catch (error) {
      console.log('SQL injection test error:', error.message);
    }

    return vulnerabilities;
  }

  async testXSS(targetUrl) {
    const vulnerabilities = [];
    
    try {
      const response = await axios.get(targetUrl, { timeout: 5000 });
      const $ = cheerio.load(response.data);
      
      $('form').each((i, form) => {
        const $form = $(form);
        const textInputs = $form.find('input[type="text"], textarea');
        
        if (textInputs.length > 0) {
          vulnerabilities.push({
            type: 'Potential XSS',
            severity: 'High',
            location: $form.attr('action') || 'Current page',
            description: 'User input fields may be vulnerable to XSS',
            recommendation: 'Implement output encoding and CSP',
            owasp: 'A03:2021 – Injection'
          });
        }
      });

    } catch (error) {
      console.log('XSS test error:', error.message);
    }

    return vulnerabilities;
  }

  async checkSecurityHeaders(targetUrl) {
    const vulnerabilities = [];
    
    try {
      const response = await axios.get(targetUrl, { timeout: 5000 });
      const headers = response.headers;
      
      const requiredHeaders = ['content-security-policy', 'x-frame-options', 'x-content-type-options'];

      requiredHeaders.forEach(header => {
        if (!headers[header]) {
          vulnerabilities.push({
            type: 'Missing Security Header',
            severity: 'Medium',
            location: 'HTTP Response Headers',
            description: `Missing ${header} header`,
            recommendation: `Implement ${header} for enhanced security`,
            owasp: 'A05:2021 – Security Misconfiguration'
          });
        }
      });

    } catch (error) {
      console.log('Security headers test error:', error.message);
    }

    return vulnerabilities;
  }

  generateSummary(vulnerabilities) {
    const severityCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    vulnerabilities.forEach(vuln => {
      severityCounts[vuln.severity] = (severityCounts[vuln.severity] || 0) + 1;
    });

    const riskScore = (severityCounts.Critical * 10) + (severityCounts.High * 7) + (severityCounts.Medium * 4);

    return {
      totalVulnerabilities: vulnerabilities.length,
      severityBreakdown: severityCounts,
      riskScore,
      riskLevel: riskScore > 50 ? 'Critical' : riskScore > 25 ? 'High' : 'Medium'
    };
  }
}

module.exports = EnhancedVulnerabilityScanner;