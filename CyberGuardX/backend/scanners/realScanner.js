const axios = require('axios');

class RealVulnerabilityScanner {
  async testSQLInjection(targetUrl) {
    const payloads = ["'", "1' OR '1'='1", "'; DROP TABLE--"];
    const vulnerabilities = [];
    
    for (const payload of payloads) {
      try {
        const response = await axios.get(`${targetUrl}?id=${payload}`);
        
        // Check for SQL error patterns
        if (response.data.includes('SQL syntax') || 
            response.data.includes('mysql_fetch') ||
            response.data.includes('ORA-')) {
          vulnerabilities.push({
            type: 'SQL Injection - CONFIRMED',
            severity: 'Critical',
            payload: payload,
            evidence: 'Database error exposed'
          });
        }
      } catch (error) {
        // Network errors don't indicate vulnerability
      }
    }
    
    return vulnerabilities;
  }
  
  async testXSS(targetUrl) {
    const payload = '<script>alert("XSS")</script>';
    
    try {
      const response = await axios.get(`${targetUrl}?search=${payload}`);
      
      if (response.data.includes(payload)) {
        return [{
          type: 'XSS - CONFIRMED',
          severity: 'High',
          payload: payload,
          evidence: 'Script tag reflected in response'
        }];
      }
    } catch (error) {
      // Handle error
    }
    
    return [];
  }
}

module.exports = RealVulnerabilityScanner;