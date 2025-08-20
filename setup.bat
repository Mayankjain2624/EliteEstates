@echo off
REM Mayank Estate - Development Setup Script (Windows)
REM This script helps set up the development environment

echo 🏠 Setting up Mayank Estate development environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v14 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Install backend dependencies
echo 📦 Installing backend dependencies...
npm install

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd client
npm install
cd ..

REM Copy example environment files
echo 📋 Setting up environment files...

if not exist ".env" (
    copy .env.example .env >nul
    echo ✅ Created .env file from example
    echo ⚠️  Please edit .env with your actual MongoDB and JWT configuration
) else (
    echo ℹ️  .env file already exists
)

if not exist "client\.env" (
    copy client\.env.example client\.env >nul
    echo ✅ Created client\.env file from example
    echo ⚠️  Please edit client\.env with your Firebase API key
) else (
    echo ℹ️  client\.env file already exists
)

if not exist "client\src\firebase.js" (
    copy client\src\firebase.example.js client\src\firebase.js >nul
    echo ✅ Created firebase.js file from example
    echo ⚠️  Please edit client\src\firebase.js with your Firebase configuration
) else (
    echo ℹ️  firebase.js file already exists
)

echo.
echo 🎉 Setup complete! Next steps:
echo.
echo 1. Edit .env with your MongoDB connection string and JWT secret
echo 2. Edit client\.env with your Firebase API key
echo 3. Edit client\src\firebase.js with your Firebase configuration
echo.
echo 4. Start the development servers:
echo    Backend:  npm run dev
echo    Frontend: cd client ^&^& npm run dev
echo.
echo 📖 For detailed setup instructions, see README.md
echo.
pause
