# 🚀 CyberGuardX Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

## 🎯 Option 1: AI-Only Mode (Recommended for Quick Start)

### Step 1: Install Backend Dependencies
```bash
cd CyberGuardX/backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 3: Start Backend (AI-Only Mode)
```bash
cd ../backend
npm run ai-only
```
Backend will run on: http://localhost:5000

### Step 4: Start Frontend (New Terminal)
```bash
cd CyberGuardX/frontend
npm start
```
Frontend will run on: http://localhost:3000

## 🔧 Option 2: Full Mode (With MongoDB)

### Step 1: Install MongoDB
- Download from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud)

### Step 2: Create Backend .env File
```env
MONGODB_URI=mongodb://localhost:27017/cyberguardx
JWT_SECRET=cyberguardx-super-secret-key-2024
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

### Step 3: Start Full Backend
```bash
cd CyberGuardX/backend
npm start
```

## 🎮 Demo Credentials

**Admin Login:**
- Email: admin@cyberguardx.com
- Password: admin123

**User Logins:**
- harish@cyberguardx.com / harish123
- thirumalai@cyberguardx.com / thiru123
- user@cyberguardx.com / user123

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🔍 Testing the Application

1. Open http://localhost:3000
2. Click "Get Started"
3. Login with demo credentials
4. Try target analysis with: https://example.com
5. Run vulnerability scans
6. View AI-powered recommendations

## 🛠️ Troubleshooting

**Port Already in Use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

**Dependencies Issues:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**MongoDB Connection Issues:**
- Use AI-Only mode: `npm run ai-only`
- Or install MongoDB locally
- Or use MongoDB Atlas cloud service