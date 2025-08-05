@echo off
echo ===================================
echo   PayPal Clone - One Command Setup
echo ===================================
echo.

echo [1/3] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo [3/3] Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..
echo.
echo ✅ Setup completed successfully!
echo.
echo 🚀 To start both servers with one command:
echo    npm start
echo.
echo 📱 After starting:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:3001
echo.
pause
