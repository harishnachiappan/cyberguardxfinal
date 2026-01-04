@echo off
title CyberGuardX - Complete Startup
color 0A
cls

echo.
echo ========================================
echo    🛡️  CyberGuardX Security Platform
echo ========================================
echo    AI-Powered Vulnerability Scanner
echo    With PDF Report Generation
echo ========================================
echo.

echo [STEP 1/6] Checking Prerequisites...
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js is installed

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: npm is not available!
    pause
    exit /b 1
)
echo ✅ npm is available

echo.
echo [STEP 2/6] Installing Backend Dependencies...
cd /d "%~dp0CyberGuardX\backend"
if not exist node_modules (
    echo 📦 Installing backend packages...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
    echo ✅ Backend dependencies installed
) else (
    echo ✅ Backend dependencies already installed
)

echo.
echo [STEP 3/6] Installing Frontend Dependencies...
cd /d "%~dp0CyberGuardX\frontend"
if not exist node_modules (
    echo 📦 Installing frontend packages...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend dependencies already installed
)

echo.
echo [STEP 4/6] Starting Backend Server...
echo 🚀 Starting CyberGuardX AI-Only Backend...
echo.
start "CyberGuardX Backend" cmd /k "cd /d \"%~dp0CyberGuardX\backend\" && echo 🧠 Starting AI-Powered Backend... && npm run ai-only"

echo ⏳ Waiting for backend to initialize...
timeout /t 8 /nobreak >nul

echo.
echo [STEP 5/6] Starting Frontend Application...
echo 🌐 Starting React Frontend...
echo.
start "CyberGuardX Frontend" cmd /k "cd /d \"%~dp0CyberGuardX\frontend\" && echo 🎨 Starting React Application... && npm start"

echo ⏳ Waiting for frontend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo [STEP 6/6] Opening Application...
echo.
echo ========================================
echo  ✅ CyberGuardX is Now Running!
echo ========================================
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo 📊 Health:   http://localhost:5000/api/health
echo.
echo 🔐 Demo Credentials:
echo    Admin: admin@cyberguardx.com / admin123
echo    User:  user@cyberguardx.com / user123
echo.
echo 🎯 Features Available:
echo    ✅ AI-Powered Target Analysis
echo    ✅ Real Vulnerability Scanning
echo    ✅ PDF Report Generation
echo    ✅ OWASP Top 10 Coverage
echo    ✅ Real-time Scan Progress
echo.

timeout /t 3 /nobreak >nul
start http://localhost:3000

echo 🎉 Application opened in your browser!
echo.
echo Press any key to view system status...
pause >nul

echo.
echo ========================================
echo  📊 System Status Check
echo ========================================
echo.

REM Check if backend is running
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend: Running on port 5000
) else (
    echo ❌ Backend: Not responding
)

REM Check if frontend is accessible
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend: Running on port 3000
) else (
    echo ⏳ Frontend: Still starting up...
)

echo.
echo ========================================
echo  🛠️  Troubleshooting
echo ========================================
echo.
echo If you encounter issues:
echo 1. Check if ports 3000 and 5000 are free
echo 2. Restart the application
echo 3. Check the terminal windows for errors
echo.
echo To stop the application:
echo - Close both terminal windows
echo - Or press Ctrl+C in each terminal
echo.
echo 📚 Documentation: Check README.md
echo 🐛 Issues: Check Code Issues Panel
echo.
echo Press any key to exit this window...
pause >nul