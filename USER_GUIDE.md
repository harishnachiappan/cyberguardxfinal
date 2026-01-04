# 🚀 CyberGuardX - Complete Startup Guide

## 🎯 Quick Start (Recommended)

### Option 1: One-Click Startup
```bash
# Double-click this file:
START-CYBERGUARDX.bat
```

### Option 2: Manual Startup
```bash
# Terminal 1 - Backend
cd CyberGuardX/backend
npm run ai-only

# Terminal 2 - Frontend  
cd CyberGuardX/frontend
npm start
```

## 🌐 Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **API Documentation**: http://localhost:5000/api

## 🔐 Demo Credentials

### Admin Access
- **Email**: admin@cyberguardx.com
- **Password**: admin123
- **Features**: Full access to all features

### User Access
- **Email**: user@cyberguardx.com
- **Password**: user123
- **Features**: Standard scanning and reporting

### Developer Access
- **Harish**: harish@cyberguardx.com / harish123
- **Thirumalai**: thirumalai@cyberguardx.com / thiru123

## 🎮 How to Use CyberGuardX

### 1. Login
1. Open http://localhost:3000
2. Click "Get Started"
3. Use demo credentials or register new account

### 2. Run Security Scan
1. Go to Dashboard
2. Enter target URL (e.g., https://example.com)
3. Click "Analyze & Start Scans"
4. Watch real-time AI analysis

### 3. View Results
1. Navigate to "Reports" section
2. View scan results and vulnerabilities
3. Download PDF reports
4. Analyze OWASP Top 10 findings

### 4. AI Chat Assistant
1. Click chat icon (bottom right)
2. Ask about vulnerabilities
3. Get security recommendations
4. Learn about scan methodology

## 🔧 Features Available

### ✅ Core Features
- **AI-Powered Analysis**: Multi-provider AI system
- **Real Vulnerability Scanning**: OWASP Top 10 coverage
- **PDF Report Generation**: Professional security reports
- **Real-time Progress**: Live scan updates
- **Interactive Dashboard**: Statistics and charts

### ✅ Security Modules
- SQL Injection Detection
- Cross-Site Scripting (XSS)
- CSRF Protection Analysis
- Security Headers Check
- Access Control Testing
- SSL/TLS Validation

### ✅ AI Capabilities
- Target reconnaissance
- Technology stack detection
- Risk assessment
- Vulnerability prioritization
- Security recommendations

## 🛠️ Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is free
netstat -an | findstr :5000

# Kill process if needed
taskkill /f /im node.exe

# Restart backend
cd CyberGuardX/backend
npm run ai-only
```

### Frontend Won't Start
```bash
# Check if port 3000 is free
netstat -an | findstr :3000

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
cd CyberGuardX/frontend
rm -rf node_modules
npm install
npm start
```

### Dependencies Issues
```bash
# Update Node.js to latest LTS
# Download from: https://nodejs.org/

# Clear all caches
npm cache clean --force

# Reinstall everything
cd CyberGuardX/backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend  
rm -rf node_modules package-lock.json
npm install
```

## 📊 System Requirements

- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)

## 🧪 Testing the Installation

Run the test script:
```bash
test-system.bat
```

Or manual testing:
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user@cyberguardx.com","password":"user123"}'

# Test AI analysis
curl -X POST http://localhost:5000/api/scans/analyze-target \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://example.com"}'
```

## 🎯 Sample Workflow

1. **Start Application**: Run `START-CYBERGUARDX.bat`
2. **Login**: Use admin@cyberguardx.com / admin123
3. **Analyze Target**: Enter https://example.com
4. **Run Scans**: Follow AI recommendations
5. **View Report**: Check Reports section
6. **Download PDF**: Click download button
7. **Chat with AI**: Ask security questions

## 📈 Performance Tips

- **Close unused applications** to free up memory
- **Use Chrome** for best performance
- **Scan one target at a time** for optimal results
- **Check system resources** if scans are slow

## 🔒 Security Notes

- **Educational Use Only**: For learning and authorized testing
- **Target Permission**: Only scan systems you own
- **Data Privacy**: All data stored locally in AI-only mode
- **No External Calls**: Works completely offline

## 📞 Support

- **Documentation**: Check README.md files
- **Code Issues**: Use Code Issues Panel in IDE
- **Logs**: Check terminal windows for errors
- **Health Check**: Visit http://localhost:5000/api/health

---

**🎉 Enjoy using CyberGuardX - Your AI-Powered Security Platform!**