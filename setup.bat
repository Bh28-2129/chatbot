@echo off
REM Colors and setup for AI Chatbot

echo.
echo ====================================
echo   AI Chatbot - MERN Setup
echo ====================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js v14 or higher
    echo Download from: https://nodejs.org
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js installed: %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm installed: %NPM_VERSION%
echo.

REM Setup Backend
echo Setting up Backend...
cd server
if not exist ".env" (
    copy .env.example .env
    echo [OK] Created .env file
    echo [WARNING] Please edit server\.env with your credentials:
    echo   - DATABASE_URL ^(NeonDB connection string^)
    echo   - GEMINI_API_KEY ^(Google API key^)
    echo   - JWT_SECRET ^(Any random string^)
)
echo Installing dependencies...
call npm install
echo [OK] Backend dependencies installed
echo.

REM Setup Frontend
echo Setting up Frontend...
cd ..\client
echo Installing dependencies...
call npm install
echo [OK] Frontend dependencies installed
echo.

echo ====================================
echo   Setup Complete!
echo ====================================
echo.
echo Next Steps:
echo 1. Edit server\.env with your credentials
echo 2. Open Terminal 1: cd server ^&^& npm run dev
echo 3. Open Terminal 2: cd client ^&^& npm start
echo 4. Open http://localhost:3000 in your browser
echo.
pause
