# CyberGuardX Implementation Guide

## Project Overview
OWASP-centric web vulnerability management platform with guided workflow for security scanning and comprehensive reporting.

## Architecture

### Backend Structure
```
backend/
├── server.js                    # Express server with Socket.IO
├── config/
│   ├── database.js             # MongoDB configuration
│   ├── auth.js                 # JWT & authentication config
│   └── scan-profiles.yaml      # Predefined scan profiles
├── models/
│   ├── User.js                 # User authentication & stats
│   ├── Scan.js                 # Scan context & metadata
│   └── Finding.js              # Vulnerability findings
├── routes/
│   ├── auth.js                 # POST /register, /login
│   ├── scans.js                # POST /analyze, /run-module
│   └── reports.js              # GET /report/:scanId
├── core/
│   ├── engine.js               # Scan orchestration
│   ├── scanContext.js          # Context management
│   ├── moduleLoader.js         # Dynamic module loading
│   └── reconnaissance.js       # Target fingerprinting
├── modules/                    # OWASP security modules
│   ├── access_control/
│   │   └── index.js           # IDOR, role bypass tests
│   ├── xss/
│   │   └── index.js           # XSS detection
│   ├── sql_injection/
│   │   └── index.js           # SQL injection tests
│   ├── csrf/
│   │   └── index.js           # CSRF validation
│   ├── session_attacks/
│   │   └── index.js           # Session security
│   ├── jwt/
│   │   └── index.js           # JWT security tests
│   ├── ssrf_fileupload/
│   │   └── index.js           # SSRF & upload tests
│   ├── path_traversal/
│   │   └── index.js           # Directory traversal
│   ├── network_vapt/
│   │   └── index.js           # Port scanning
│   ├── api_security/
│   │   └── index.js           # API testing
│   └── vulnerability_scanning/
│       └── index.js            # General vuln scan
├── integrations/
│   ├── nmap.js                 # Nmap wrapper
│   ├── sqlmap.js               # SQLMap wrapper
│   └── subdomain.js            # Subdomain enumeration
├── utils/
│   ├── httpClient.js           # HTTP request wrapper
│   ├── logger.js               # Logging utility
│   └── payloads.js             # Attack payloads
└── report_generation/
    ├── generator.js            # Report orchestrator
    ├── htmlTemplate.js         # HTML report template
    └── pdfExporter.js          # PDF generation
```

### Frontend Structure
```
frontend/src/
├── pages/
│   ├── AuthPage.js             # Login/Register
│   ├── Dashboard.js            # Main dashboard
│   ├── ScanPage.js             # Scan execution view
│   └── ReportPage.js           # Report viewer
├── components/
│   ├── StatsCards.js           # Dashboard statistics
│   ├── ModuleSuggestionTable.js # Suggested modules
│   ├── ModuleRunner.js         # Module execution UI
│   ├── OwaspChart.js           # OWASP Top 10 chart
│   └── ReportViewer.js         # Report display
└── services/
    ├── api.js                  # API client
    └── socket.js               # WebSocket client
```

## Implementation Phases

### Phase 1: Core Backend (Week 1-2)
1. ✅ Setup Express server with security middleware
2. ✅ Create database models (User, Scan, Finding)
3. ✅ Implement authentication (JWT)
4. ✅ Build scan context management
5. ✅ Create reconnaissance module

### Phase 2: Security Modules (Week 3-4)
1. Implement OWASP Top 10 modules:
   - Access Control (A01)
   - Cryptographic Failures (A02)
   - Injection (A03) - SQL, XSS, Command
   - Insecure Design (A04)
   - Security Misconfiguration (A05)
   - Vulnerable Components (A06)
   - Authentication Failures (A07)
   - Data Integrity Failures (A08)
   - Logging Failures (A09)
   - SSRF (A10)

### Phase 3: Frontend Dashboard (Week 5-6)
1. Complete dashboard with real statistics
2. Module suggestion interface
3. Real-time scan progress
4. OWASP Top 10 visualization

### Phase 4: Reporting & Polish (Week 7-8)
1. Report generation (HTML/PDF/JSON)
2. Analytics dashboard
3. Export functionality
4. Testing & documentation

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Scans
- `POST /api/scans/analyze` - Analyze target URL
- `GET /api/scans/:scanId` - Get scan details
- `POST /api/scans/:scanId/modules/:moduleName/run` - Run module
- `GET /api/scans/user/:userId` - Get user's scans

### Reports
- `GET /api/reports/:scanId` - Get scan report
- `GET /api/reports/:scanId/pdf` - Download PDF report
- `GET /api/reports/:scanId/json` - Download JSON report

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  stats: {
    totalScans: Number,
    totalVulnerabilities: Number,
    criticalCount: Number,
    highCount: Number,
    mediumCount: Number,
    lowCount: Number
  },
  createdAt: Date
}
```

### Scan
```javascript
{
  _id: ObjectId,
  scanId: String (UUID),
  userId: ObjectId (ref: User),
  target: {
    url: String,
    domain: String,
    ip: String
  },
  profile: String (Quick/Full/API),
  status: String (Analyzing/Ready/Running/Completed/Failed),
  reconnaissance: {
    technologies: [String],
    pages: [String],
    forms: [Object],
    apis: [String],
    headers: Object
  },
  modules: [{
    name: String,
    category: String,
    status: String (Pending/Running/Completed/Failed),
    findings: Number,
    severity: Object
  }],
  createdAt: Date,
  completedAt: Date
}
```

### Finding
```javascript
{
  _id: ObjectId,
  scanId: String,
  module: String,
  owaspCategory: String (A01-A10),
  severity: String (Critical/High/Medium/Low/Info),
  title: String,
  description: String,
  endpoint: String,
  method: String,
  evidence: {
    request: String,
    response: String,
    payload: String
  },
  recommendation: String,
  cwe: String,
  cvss: Number,
  createdAt: Date
}
```

## Module Standard Interface

Each security module must export:

```javascript
module.exports = {
  name: 'module_name',
  category: 'OWASP A0X',
  description: 'Module description',
  
  async run(scanContext) {
    // Perform security tests
    // Return findings array
    return {
      status: 'completed',
      findings: [
        {
          severity: 'High',
          title: 'Vulnerability title',
          description: 'Details',
          endpoint: '/api/endpoint',
          evidence: { ... },
          recommendation: 'Fix suggestion'
        }
      ]
    };
  }
};
```

## Scan Workflow

1. **User submits URL** → POST /api/scans/analyze
2. **Backend creates ScanContext** → Assigns scanId
3. **Reconnaissance runs** → Discovers technologies, pages, APIs
4. **Module suggestions generated** → Based on discovered context
5. **Frontend displays modules** → User sees suggested scans
6. **User runs modules** → POST /api/scans/:scanId/modules/:name/run
7. **Real-time updates** → Socket.IO emits progress
8. **Findings stored** → Database records vulnerabilities
9. **Report generated** → HTML/PDF/JSON export
10. **User views report** → Dashboard shows results

## Key Features

### Dashboard
- Total scans, targets, vulnerabilities by severity
- OWASP Top 10 distribution chart
- Recent scans activity feed
- Quick scan input with profile selection

### Guided Workflow
- Context-aware module suggestions
- Step-by-step execution
- Real-time progress tracking
- Status badges (Pending/Running/Completed)

### Reporting
- OWASP Top 10 categorization
- Severity-based filtering
- Professional PDF export
- JSON API for integrations

## Security Considerations

1. **Rate Limiting** - Prevent abuse
2. **Input Validation** - Sanitize all inputs
3. **Authentication** - JWT with secure storage
4. **Authorization** - User can only access own scans
5. **Scan Throttling** - Prevent target overload
6. **Data Privacy** - No external data storage

## Testing Strategy

1. **Unit Tests** - Individual module testing
2. **Integration Tests** - API endpoint testing
3. **E2E Tests** - Full workflow testing
4. **Security Tests** - Validate scanner accuracy

## Deployment

1. **Development** - Local MongoDB + React dev server
2. **Production** - MongoDB Atlas + Docker containers
3. **Environment Variables** - .env configuration
4. **Monitoring** - Logging and error tracking

## Next Steps

1. Install backend dependencies: `cd backend && npm install`
2. Setup MongoDB (local or Atlas)
3. Configure .env file
4. Run backend: `npm run dev`
5. Test authentication endpoints
6. Implement reconnaissance module
7. Build first security module (XSS)
8. Connect frontend to backend API
9. Implement real-time updates
10. Build report generation

---

**Note**: This is a comprehensive academic project. Focus on demonstrating understanding of OWASP Top 10, security testing methodologies, and full-stack development skills.
