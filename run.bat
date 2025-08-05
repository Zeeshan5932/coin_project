@echo off
echo Starting PayPal Clone Backend and Frontend...
echo.

:: Start backend in a new window
echo Starting Backend Server...
start "PayPal Clone Backend" cmd /k "cd backend && npm start"

:: Wait a moment for backend to start
timeout /t 3 /nobreak > nul

:: Start frontend in a new window
echo Starting Frontend Server...
start "PayPal Clone Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this script (servers will continue running)
pause > nul
