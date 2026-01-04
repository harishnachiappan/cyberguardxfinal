@echo off
title CyberGuardX Backend - Restart
color 0A

echo.
echo ========================================
echo    CyberGuardX Backend - Restarting
echo ========================================
echo.

echo Stopping any existing backend processes...
taskkill /f /im node.exe 2>nul

echo.
echo Starting CyberGuardX AI-Only Backend with persistent auth...
echo.
echo Features:
echo - ✅ AI-powered vulnerability analysis
echo - ✅ Persistent user registration
echo - ✅ In-memory user storage
echo - ✅ Real-time scanning capabilities
echo.

cd /d "d:\harishimp\CyberGuardX\CyberGuardX\backend"
node start-ai-only.js

pause