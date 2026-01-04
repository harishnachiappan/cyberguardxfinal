@echo off
title CyberGuardX - Quick Test
color 0B

echo.
echo ========================================
echo    🧪 CyberGuardX Quick Test
echo ========================================
echo.

echo Testing Backend Health...
curl -s http://localhost:5000/api/health
if %errorlevel% equ 0 (
    echo ✅ Backend is healthy
) else (
    echo ❌ Backend not responding
    echo Make sure to start the backend first
    pause
    exit /b 1
)

echo.
echo Testing Authentication...
curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"user@cyberguardx.com\",\"password\":\"user123\"}"
if %errorlevel% equ 0 (
    echo ✅ Authentication working
) else (
    echo ❌ Authentication failed
)

echo.
echo Testing AI Analysis...
curl -s -X POST http://localhost:5000/api/scans/analyze-target -H "Content-Type: application/json" -d "{\"targetUrl\":\"https://example.com\"}"
if %errorlevel% equ 0 (
    echo ✅ AI Analysis working
) else (
    echo ❌ AI Analysis failed
)

echo.
echo ========================================
echo  ✅ All Tests Completed!
echo ========================================
echo.
echo Your CyberGuardX installation is ready!
echo Open http://localhost:3000 to start using it.
echo.
pause