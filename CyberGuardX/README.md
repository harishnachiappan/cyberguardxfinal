# 🛡️ CyberGuardX

**Unlocking the Secrets of Digital Safety**

A comprehensive cybersecurity platform for vulnerability assessment and penetration testing. CyberGuardX provides an intuitive interface for security professionals to conduct thorough security scans and generate detailed reports.

## ✨ Key Features

- 🔐 **Authentication System** - User and Admin role management with JWT
- 🎯 **AI-Powered Target Analysis** - Local AI vulnerability scanning without database
- 📊 **Real-time Dashboard** - Live scan monitoring and statistics
- 📋 **Report Generation** - Detailed security assessment reports with PDF export
- 🌐 **Interactive Globe** - Visual network representation
- ⚡ **Real-time Updates** - Socket.io powered live updates
- 🤖 **AI-Only Mode** - Works without MongoDB using local AI analysis
- 🚀 **One-Click Startup** - Batch files for easy backend/frontend launch

## 🛠️ Technology Stack

### Frontend (UI/UX)
- **React 18** - Modern component-based UI framework
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework with custom cybersecurity theme
- **Heroicons** - Beautiful SVG icon library
- **React Globe GL** - Interactive 3D globe visualization
- **Framer Motion** - Smooth animations and transitions
- **React Hot Toast** - Elegant notification system
- **Axios** - HTTP client for API communication

### Backend (API & Services)
- **Express.js** - Fast, unopinionated web framework for Node.js
- **Node.js** - JavaScript runtime environment
- **Socket.io** - Real-time bidirectional event-based communication
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcryptjs** - Password hashing and salting
- **CORS** - Cross-Origin Resource Sharing middleware
- **Helmet** - Security middleware for HTTP headers
- **Express Rate Limit** - API rate limiting
- **Morgan** - HTTP request logger middleware

### AI & Analysis
- **Local AI Engine** - Free AI-powered vulnerability analysis
- **Google Generative AI** - Advanced threat analysis
- **OpenAI Integration** - Smart vulnerability assessment
- **Rule-based Scanning** - Pattern-based vulnerability detection
- **In-memory Storage** - Database-free operation mode

### Development Tools
- **Git** - Version control system
- **GitHub** - Code repository and collaboration
- **VS Code** - Primary development environment
- **Postman** - API testing and documentation
- **ESLint** - JavaScript linting utility
- **Prettier** - Code formatting tool
- **Nodemon** - Development server auto-restart

### Deployment & Hosting
- **Vercel/Netlify** - Frontend deployment
- **Railway/Heroku** - Backend deployment
- **MongoDB Atlas** - Database hosting
- **Cloudflare** - CDN and security

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **No MongoDB required** - AI-only mode works out of the box!

## 🚀 Quick Start

### Option 1: One-Click Startup (Recommended)

**Start AI Backend:**
```bash
# Double-click or run from command line
start-ai-backend.bat
```

**Start Frontend:**
```bash
# Double-click or run from command line
start-frontend.bat
```

**Start Both Together:**
```bash
# Double-click or run from command line
start-cyberguardx.bat
```

### Option 2: Manual Setup

**1. Install Dependencies:**
```bash
# Backend
cd CyberGuardX/backend
npm install

# Frontend
cd CyberGuardX/frontend
npm install
```

**2. Start AI-Only Backend:**
```bash
cd CyberGuardX/backend
npm run ai-only
```

**3. Start Frontend:**
```bash
cd CyberGuardX/frontend
npm start
```

### 4. Access the Application

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

### 4. Demo Credentials (AI-Only Mode)

**Pre-registered Accounts:**
- **Admin:** `admin@cyberguardx.com` / `admin123`
- **Harish:** `harish@cyberguardx.com` / `harish123`
- **Thirumalai:** `thirumalai@cyberguardx.com` / `thiru123`
- **Test User:** `user@cyberguardx.com` / `user123`

**Or register new accounts** - All data stored in memory (no database needed)

## 📁 Project Architecture

```
CyberGuardX/
├── frontend/                    # React Frontend Application
│   ├── public/
│   │   ├── index.html          # Main HTML template
│   │   ├── favicon.ico         # App icon
│   │   └── assets/             # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── AppShell.js     # Main app layout wrapper
│   │   │   ├── CyberGlobe.jsx  # 3D interactive globe
│   │   │   ├── CredentialsInfo.js # Demo login credentials
│   │   │   ├── Navbar.js       # Top navigation bar
│   │   │   ├── Sidebar.js      # Side navigation menu
│   │   │   ├── LoadingSpinner.js # Loading animations
│   │   │   └── ProtectedRoute.js # Route authentication
│   │   ├── pages/              # Full Page Components
│   │   │   ├── AuthPage.js     # Login/Register page
│   │   │   ├── HomePage.js     # Landing page
│   │   │   ├── AboutPage.js    # About/Features page
│   │   │   ├── Dashboard.js    # Main dashboard
│   │   │   ├── TargetAnalysis.js # Target analysis page
│   │   │   ├── TargetScanPage.js # Guided scanning
│   │   │   ├── GuidedScanModule.js # Sequential scans
│   │   │   ├── ScanModule.js   # Individual scan modules
│   │   │   ├── Reports.js      # Reports listing
│   │   │   ├── ReportPage.js   # Detailed report view
│   │   │   ├── Settings.js     # User settings
│   │   │   └── NotFound.js     # 404 error page
│   │   ├── services/           # API & External Services
│   │   │   ├── api.js          # Axios API client
│   │   │   ├── auth.js         # Authentication service
│   │   │   ├── socket.js       # Socket.io client
│   │   │   └── storage.js      # LocalStorage utilities
│   │   ├── utils/              # Helper Functions
│   │   │   ├── constants.js    # App constants
│   │   │   ├── validators.js   # Form validation
│   │   │   └── formatters.js   # Data formatting
│   │   ├── hooks/              # Custom React Hooks
│   │   │   ├── useAuth.js      # Authentication hook
│   │   │   └── useSocket.js    # Socket connection hook
│   │   ├── App.js              # Main app component
│   │   ├── index.js            # React DOM entry point
│   │   └── index.css           # Global styles
│   ├── package.json            # Frontend dependencies
│   └── tailwind.config.js      # Tailwind configuration
├── backend/                     # Express.js Backend API
│   ├── routes/                 # API Route Handlers
│   │   ├── auth.js             # Authentication routes
│   │   ├── scans.js            # Scan management routes
│   │   ├── reports.js          # Report generation routes
│   │   └── tools.js            # Security tools routes
│   ├── ai/                     # AI Analysis Engine
│   │   └── freeAIAnalyzer.js   # Local AI vulnerability analyzer
│   ├── scanners/               # Vulnerability Scanners
│   │   ├── enhancedScanner.js  # Enhanced pattern-based scanner
│   │   ├── improvedAI.js       # AI-powered analysis
│   │   └── realScanner.js      # Real vulnerability testing
│   ├── utils/                  # Utilities
│   │   └── pdfGenerator.js     # PDF report generation
│   ├── middleware/             # Custom Middleware
│   │   ├── auth.js             # JWT authentication
│   │   ├── validation.js       # Request validation
│   │   ├── errorHandler.js     # Error handling
│   │   └── rateLimiter.js      # API rate limiting
│   ├── services/               # Business Logic Services
│   │   ├── scanService.js      # Scan execution logic
│   │   ├── reportService.js    # Report generation
│   │   ├── emailService.js     # Email notifications
│   │   └── securityService.js  # Security utilities
│   ├── config/                 # Configuration Files
│   │   ├── database.js         # MongoDB connection
│   │   ├── jwt.js              # JWT configuration
│   │   └── socket.js           # Socket.io setup
│   ├── utils/                  # Backend Utilities
│   │   ├── logger.js           # Logging utility
│   │   ├── encryption.js       # Data encryption
│   │   └── validators.js       # Data validation
│   ├── server.js               # Express server setup
│   ├── package.json            # Backend dependencies
│   └── .env                    # Environment variables
├── docs/                       # Documentation
│   ├── API.md                  # API documentation
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── CONTRIBUTING.md         # Contribution guidelines
├── tests/                      # Test Suite
│   ├── frontend/               # Frontend tests
│   └── backend/                # Backend tests
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
└── README.md                   # Project documentation
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  profile: {
    firstName: String,
    lastName: String,
    organization: String,
    avatar: String
  },
  preferences: {
    theme: String,
    notifications: Boolean,
    language: String
  },
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

### Scan Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  targetUrl: String,
  scanType: String,
  status: String (pending/running/completed/failed),
  progress: Number (0-100),
  results: {
    vulnerabilities: Array,
    riskScore: Number,
    findings: Array,
    recommendations: Array
  },
  metadata: {
    duration: Number,
    toolsUsed: Array,
    scanDate: Date,
    ipAddress: String,
    userAgent: String
  },
  createdAt: Date,
  completedAt: Date
}
```

### Report Collection
```javascript
{
  _id: ObjectId,
  scanId: ObjectId (ref: Scan),
  userId: ObjectId (ref: User),
  title: String,
  summary: String,
  severity: String,
  findings: Array,
  recommendations: Array,
  exportFormats: {
    pdf: String,
    json: String,
    csv: String
  },
  shared: Boolean,
  tags: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎮 Usage Guide

### Getting Started

1. **Access the Platform**
   - Visit `http://localhost:3000`
   - Navigate through Home and About pages
   - Click "Get Started" to access authentication

2. **Login/Register**
   - Choose User or Admin login type
   - Use demo credentials or create new account
   - View credentials by clicking "Show" in demo section

3. **Dashboard Overview**
   - View security statistics
   - Monitor recent scans
   - Access quick actions

### Phase 1: Guided Scanning

1. **Target Analysis**
   - Enter target URL in Dashboard
   - Click "Analyze & Start Scans"
   - Review target information and suggested scans

2. **Sequential Scanning**
   - Start with first suggested scan
   - Complete scan and click "Next"
   - Return to Target Analysis page
   - Continue with next scan in sequence

### Phase 2: Individual Scanning

1. **Access Scan Modules**
   - Use sidebar navigation
   - Select specific security module
   - Enter target URL manually
   - Run independent scans

### Reporting

1. **View Reports**
   - Access Reports page from sidebar
   - Filter by status, date, or scan type
   - Click "View" for detailed analysis

2. **Export Reports**
   - Download PDF reports
   - Export scan data
   - Share findings with team

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/cyberguardx
JWT_SECRET=cyberguardx-super-secret-key-2024
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

### Frontend Environment Variables
Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

### Database Setup

**Local MongoDB:**
1. Install MongoDB locally
2. Start MongoDB service
3. Database will be created automatically

**MongoDB Atlas (Optional):**
1. Create MongoDB Atlas account
2. Create cluster and get connection string
3. Update `MONGODB_URI` in backend `.env`

### UI/UX Design System

**Color Palette:**
- Primary: Cyber Blue (#00D4FF)
- Secondary: Matrix Green (#00FF41)
- Accent: Neon Purple (#8B5CF6)
- Dark: Deep Black (#0A0A0A)
- Gray: Slate variations

**Typography:**
- Headings: Inter font family
- Body: System font stack
- Code: JetBrains Mono

**Components:**
- Glassmorphism effects
- Neon glow animations
- Cyberpunk-inspired UI elements
- Dark mode optimized
- Responsive design (mobile-first)

**Tailwind Configuration:**
Custom configuration optimized for cybersecurity themes with extended color palette, custom animations, and component utilities.

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

**Backend:**
```bash
# Start development server
npm start

# Start with nodemon (auto-restart)
npm run dev

# Run tests
npm test
```

### Code Structure Guidelines

- **Frontend Components**: Reusable UI components in `/frontend/src/components`
- **Frontend Pages**: Full page components in `/frontend/src/pages`
- **Backend Routes**: API endpoints in `/backend/routes`
- **Database Models**: Mongoose schemas in `/backend/models`
- **Routing**: Centralized in `App.js`
- **Styling**: Tailwind CSS classes with custom cybersecurity theme
- **State Management**: localStorage for persistence, React state for UI
- **API Communication**: Centralized in `/frontend/src/services/api.js`

## 🚀 Deployment

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
# Set NODE_ENV=production in .env
# Configure production MongoDB URI
npm start
```

### Deploy Frontend to Netlify/Vercel
1. Connect your repository
2. Set build command: `cd frontend && npm run build`
3. Set publish directory: `frontend/build`
4. Add environment variables
5. Deploy automatically on push

### Deploy Backend to Heroku/Railway
1. Create new app on platform
2. Connect repository
3. Set environment variables
4. Configure MongoDB Atlas connection
5. Deploy backend service

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛡️ Security

CyberGuardX is designed for educational and authorized security testing purposes only. Always ensure you have proper authorization before scanning any targets.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/harishimp/CyberGuardX/issues)
- **Documentation**: [Project Wiki](https://github.com/harishimp/CyberGuardX/wiki)
- **Email**: support@cyberguardx.com
- **Developers**: Harish Nachiappan & Thirumalai

## 🎯 Roadmap

### ✅ Completed Features
- [x] **Frontend React Application** - Modern UI/UX with Tailwind CSS
- [x] **AI-Only Backend** - Works without MongoDB using local AI
- [x] **Authentication System** - JWT-based with in-memory user storage
- [x] **Role-Based Access Control** - User and Admin role management
- [x] **Landing Pages** - Home and About pages with 3D globe
- [x] **Interactive Dashboard** - Statistics and scan management
- [x] **AI-Powered Target Analysis** - Local AI vulnerability assessment
- [x] **Real-time Updates** - Socket.io powered live progress tracking
- [x] **PDF Report Generation** - Detailed security assessment reports
- [x] **Batch File Automation** - One-click startup scripts
- [x] **Enhanced Scanners** - Pattern-based and AI-powered analysis
- [x] **Responsive Design** - Mobile-first responsive interface
- [x] **Security Middleware** - CORS, Helmet, rate limiting
- [x] **In-Memory Storage** - Database-free operation mode
- [x] **Real Vulnerability Testing** - Payload-based vulnerability verification

### 🔄 In Progress
- [ ] **Advanced AI Models** - Integration with multiple AI providers
- [ ] **Real-time Collaborative Scanning** - Multi-user scan sessions
- [ ] **Enhanced PDF Reports** - Charts and visual analytics
- [ ] **Email Notifications** - Scan completion alerts
- [ ] **Advanced Dashboard Analytics** - Trend analysis and insights
- [ ] **Custom Scan Configurations** - User-defined scan parameters

### 📅 Planned Features
- [ ] **Multi-tenant support for organizations**
- [ ] **API rate limiting and advanced security**
- [ ] **Mobile app companion (React Native)**
- [ ] **Integration with CI/CD pipelines**
- [ ] **Advanced analytics and trending**
- [ ] **Custom scan configurations**
- [ ] **Scheduled scanning capabilities**
- [ ] **Machine learning threat prediction**
- [ ] **Blockchain security auditing**
- [ ] **Cloud infrastructure scanning**
- [ ] **Compliance reporting (SOC2, ISO27001)**
- [ ] **Integration with SIEM systems**

## 🙏 Acknowledgments

### Development Team
- **Lead Developers**: Harish Nachiappan & Thirumalai
- **AI Assistance**: Amazon Q Developer, GitHub Copilot, ChatGPT, Claude
- **Code Review**: Cursor IDE AI, Amazon Q Code Review

### Open Source Community
- **OWASP Foundation** - Security guidelines, best practices, and tools
- **React Community** - Excellent documentation and ecosystem
- **Node.js Foundation** - JavaScript runtime and community
- **MongoDB Inc.** - Flexible NoSQL database solution
- **Tailwind Labs** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icon library
- **Socket.io** - Real-time communication framework
- **Express.js** - Fast, minimalist web framework

### Security Tools & Resources
- **OWASP ZAP** - Web application security scanner
- **Nmap Project** - Network discovery and security auditing
- **Nikto** - Web server vulnerability scanner
- **Burp Suite** - Web application security testing
- **Cybersecurity Community** - Knowledge sharing and best practices

### Development Tools
- **GitHub** - Version control and collaboration platform
- **Vercel/Netlify** - Frontend deployment platforms
- **Railway/Heroku** - Backend hosting services
- **MongoDB Atlas** - Cloud database service
- **Postman** - API development and testing

---

**Made with ❤️ for the cybersecurity community**

*CyberGuardX - Unlocking the Secrets of Digital Safety*

**Developed by Harish Nachiappan and Thirumalai**