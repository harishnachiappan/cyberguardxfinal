// Complete vulnerability definitions with tools mapping
export const VULNERABILITY_CATEGORIES = {
  'owasp-top-10': {
    name: 'OWASP Top 10',
    description: 'Most critical web application security risks',
    vulnerabilities: [
      {
        id: 'broken-access-control',
        name: 'Broken Access Control',
        category: 'OWASP A01',
        severity: 'High',
        description: 'Restrictions on authenticated users not properly enforced',
        tools: ['zap', 'burp', 'custom-auth-scanner'],
        estimatedTime: '10-15 minutes'
      },
      {
        id: 'cryptographic-failures',
        name: 'Cryptographic Failures',
        category: 'OWASP A02',
        severity: 'High',
        description: 'Failures related to cryptography leading to sensitive data exposure',
        tools: ['testssl', 'sslscan', 'custom-crypto-scanner'],
        estimatedTime: '5-10 minutes'
      },
      {
        id: 'injection',
        name: 'Injection Attacks',
        category: 'OWASP A03',
        severity: 'Critical',
        description: 'SQL, NoSQL, OS, and LDAP injection vulnerabilities',
        tools: ['sqlmap', 'nosqlmap', 'commix', 'custom-injection-scanner'],
        estimatedTime: '15-25 minutes'
      },
      {
        id: 'insecure-design',
        name: 'Insecure Design',
        category: 'OWASP A04',
        severity: 'High',
        description: 'Flaws in design and architecture',
        tools: ['custom-design-analyzer', 'threat-modeling'],
        estimatedTime: '20-30 minutes'
      },
      {
        id: 'security-misconfiguration',
        name: 'Security Misconfiguration',
        category: 'OWASP A05',
        severity: 'Medium',
        description: 'Insecure default configurations and incomplete setups',
        tools: ['nikto', 'nuclei', 'custom-config-scanner'],
        estimatedTime: '8-12 minutes'
      },
      {
        id: 'vulnerable-components',
        name: 'Vulnerable and Outdated Components',
        category: 'OWASP A06',
        severity: 'High',
        description: 'Components with known vulnerabilities',
        tools: ['retire.js', 'safety', 'audit-scanner', 'nuclei'],
        estimatedTime: '10-15 minutes'
      },
      {
        id: 'identification-failures',
        name: 'Identification and Authentication Failures',
        category: 'OWASP A07',
        severity: 'High',
        description: 'Authentication and session management flaws',
        tools: ['hydra', 'custom-auth-scanner', 'session-analyzer'],
        estimatedTime: '12-18 minutes'
      },
      {
        id: 'software-integrity-failures',
        name: 'Software and Data Integrity Failures',
        category: 'OWASP A08',
        severity: 'Medium',
        description: 'Code and infrastructure without integrity verification',
        tools: ['custom-integrity-scanner', 'hash-verifier'],
        estimatedTime: '8-12 minutes'
      },
      {
        id: 'logging-monitoring-failures',
        name: 'Security Logging and Monitoring Failures',
        category: 'OWASP A09',
        severity: 'Medium',
        description: 'Insufficient logging and monitoring',
        tools: ['custom-logging-analyzer', 'log-scanner'],
        estimatedTime: '5-8 minutes'
      },
      {
        id: 'ssrf',
        name: 'Server-Side Request Forgery (SSRF)',
        category: 'OWASP A10',
        severity: 'High',
        description: 'Fetching remote resources without validating user-supplied URL',
        tools: ['ssrfmap', 'custom-ssrf-scanner'],
        estimatedTime: '10-15 minutes'
      }
    ]
  },
  'web-vulnerabilities': {
    name: 'Web Application Vulnerabilities',
    description: 'Common web application security issues',
    vulnerabilities: [
      {
        id: 'xss-reflected',
        name: 'Reflected Cross-Site Scripting (XSS)',
        category: 'Web Security',
        severity: 'High',
        description: 'User input reflected in response without proper encoding',
        tools: ['zap', 'xssstrike', 'custom-xss-scanner'],
        estimatedTime: '8-12 minutes'
      },
      {
        id: 'xss-stored',
        name: 'Stored Cross-Site Scripting (XSS)',
        category: 'Web Security',
        severity: 'Critical',
        description: 'Malicious scripts stored and executed for other users',
        tools: ['zap', 'xssstrike', 'custom-stored-xss'],
        estimatedTime: '10-15 minutes'
      },
      {
        id: 'xss-dom',
        name: 'DOM-based Cross-Site Scripting (XSS)',
        category: 'Web Security',
        severity: 'High',
        description: 'Client-side script execution via DOM manipulation',
        tools: ['domxss-scanner', 'custom-dom-analyzer'],
        estimatedTime: '12-18 minutes'
      },
      {
        id: 'csrf',
        name: 'Cross-Site Request Forgery (CSRF)',
        category: 'Web Security',
        severity: 'Medium',
        description: 'Unauthorized commands transmitted from trusted user',
        tools: ['custom-csrf-scanner', 'zap'],
        estimatedTime: '5-8 minutes'
      },
      {
        id: 'clickjacking',
        name: 'Clickjacking',
        category: 'Web Security',
        severity: 'Medium',
        description: 'Tricking users into clicking hidden elements',
        tools: ['custom-clickjacking-scanner'],
        estimatedTime: '3-5 minutes'
      },
      {
        id: 'open-redirect',
        name: 'Open Redirect',
        category: 'Web Security',
        severity: 'Medium',
        description: 'Unvalidated redirects to external sites',
        tools: ['custom-redirect-scanner'],
        estimatedTime: '5-8 minutes'
      }
    ]
  },
  'network-security': {
    name: 'Network Security',
    description: 'Network infrastructure vulnerabilities',
    vulnerabilities: [
      {
        id: 'port-scanning',
        name: 'Port Scanning & Service Detection',
        category: 'Network',
        severity: 'Info',
        description: 'Identify open ports and running services',
        tools: ['nmap', 'masscan', 'zmap'],
        estimatedTime: '5-10 minutes'
      },
      {
        id: 'network-vulnerabilities',
        name: 'Network Vulnerability Assessment',
        category: 'Network',
        severity: 'High',
        description: 'Scan for known network vulnerabilities',
        tools: ['nmap', 'nuclei', 'openvas'],
        estimatedTime: '15-25 minutes'
      },
      {
        id: 'ssl-tls-vulnerabilities',
        name: 'SSL/TLS Vulnerabilities',
        category: 'Network',
        severity: 'High',
        description: 'SSL/TLS configuration and certificate issues',
        tools: ['testssl', 'sslscan', 'sslyze'],
        estimatedTime: '8-12 minutes'
      },
      {
        id: 'dns-security',
        name: 'DNS Security Assessment',
        category: 'Network',
        severity: 'Medium',
        description: 'DNS configuration and security issues',
        tools: ['dnsrecon', 'fierce', 'custom-dns-scanner'],
        estimatedTime: '5-8 minutes'
      }
    ]
  },
  'cms-security': {
    name: 'CMS Security',
    description: 'Content Management System vulnerabilities',
    vulnerabilities: [
      {
        id: 'wordpress-security',
        name: 'WordPress Security Scan',
        category: 'CMS',
        severity: 'High',
        description: 'WordPress core, plugin, and theme vulnerabilities',
        tools: ['wpscan', 'wp-cli'],
        estimatedTime: '10-15 minutes'
      },
      {
        id: 'drupal-security',
        name: 'Drupal Security Scan',
        category: 'CMS',
        severity: 'High',
        description: 'Drupal core and module vulnerabilities',
        tools: ['droopescan', 'custom-drupal-scanner'],
        estimatedTime: '8-12 minutes'
      },
      {
        id: 'joomla-security',
        name: 'Joomla Security Scan',
        category: 'CMS',
        severity: 'High',
        description: 'Joomla core and extension vulnerabilities',
        tools: ['joomscan', 'custom-joomla-scanner'],
        estimatedTime: '8-12 minutes'
      }
    ]
  },
  'api-security': {
    name: 'API Security',
    description: 'REST API and GraphQL security issues',
    vulnerabilities: [
      {
        id: 'api-authentication',
        name: 'API Authentication Bypass',
        category: 'API Security',
        severity: 'Critical',
        description: 'Bypass API authentication mechanisms',
        tools: ['custom-api-scanner', 'postman-newman'],
        estimatedTime: '12-18 minutes'
      },
      {
        id: 'api-authorization',
        name: 'API Authorization Flaws',
        category: 'API Security',
        severity: 'High',
        description: 'Improper API access controls',
        tools: ['custom-api-authz-scanner'],
        estimatedTime: '10-15 minutes'
      },
      {
        id: 'api-rate-limiting',
        name: 'API Rate Limiting Issues',
        category: 'API Security',
        severity: 'Medium',
        description: 'Missing or insufficient rate limiting',
        tools: ['custom-rate-limit-scanner'],
        estimatedTime: '5-8 minutes'
      },
      {
        id: 'graphql-security',
        name: 'GraphQL Security Issues',
        category: 'API Security',
        severity: 'High',
        description: 'GraphQL-specific vulnerabilities',
        tools: ['graphql-cop', 'custom-graphql-scanner'],
        estimatedTime: '10-15 minutes'
      }
    ]
  },
  'code-security': {
    name: 'Code Security (SAST)',
    description: 'Static Application Security Testing',
    vulnerabilities: [
      {
        id: 'sast-javascript',
        name: 'JavaScript SAST',
        category: 'SAST',
        severity: 'Medium',
        description: 'Static analysis of JavaScript code',
        tools: ['sonarqube', 'eslint-security', 'semgrep'],
        estimatedTime: '10-20 minutes'
      },
      {
        id: 'sast-python',
        name: 'Python SAST',
        category: 'SAST',
        severity: 'Medium',
        description: 'Static analysis of Python code',
        tools: ['bandit', 'sonarqube', 'semgrep'],
        estimatedTime: '10-20 minutes'
      },
      {
        id: 'sast-java',
        name: 'Java SAST',
        category: 'SAST',
        severity: 'Medium',
        description: 'Static analysis of Java code',
        tools: ['sonarqube', 'spotbugs', 'semgrep'],
        estimatedTime: '15-25 minutes'
      },
      {
        id: 'dependency-check',
        name: 'Dependency Vulnerability Check',
        category: 'SAST',
        severity: 'High',
        description: 'Check for vulnerable dependencies',
        tools: ['dependency-check', 'safety', 'retire.js'],
        estimatedTime: '5-10 minutes'
      }
    ]
  }
};

// Get all vulnerabilities as flat array
export const getAllVulnerabilities = () => {
  const allVulns = [];
  Object.values(VULNERABILITY_CATEGORIES).forEach(category => {
    category.vulnerabilities.forEach(vuln => {
      allVulns.push({
        ...vuln,
        categoryName: category.name
      });
    });
  });
  return allVulns;
};

// Get vulnerabilities by category
export const getVulnerabilitiesByCategory = (categoryId) => {
  return VULNERABILITY_CATEGORIES[categoryId]?.vulnerabilities || [];
};

// Get vulnerability by ID
export const getVulnerabilityById = (vulnId) => {
  const allVulns = getAllVulnerabilities();
  return allVulns.find(v => v.id === vulnId);
};