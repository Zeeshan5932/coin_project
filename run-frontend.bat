@echo off
echo Starting PayPal Clone Frontend...
echo.
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)
echo.
echo Starting development server...
npm start
