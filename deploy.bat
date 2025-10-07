@echo off
title Factory Management App Deployment

echo.
echo 🏭 Factory Management App Deployment
echo ====================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git not initialized. Run 'git init' first.
    pause
    exit /b 1
)

REM Check for GitHub remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ⚠️  No GitHub remote found.
    echo Please add your GitHub repository:
    echo git remote add origin https://github.com/yourusername/your-repo-name.git
    echo.
    set /p repo_url="Enter your GitHub repository URL: "
    git remote add origin "%repo_url%"
)

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Deployment Instructions:
echo 1. Go to your GitHub repository
echo 2. Click Settings → Pages
echo 3. Select 'Deploy from a branch'
echo 4. Choose 'main' branch
echo 5. Your app will be live at: https://yourusername.github.io/repository-name
echo.
echo 📱 Mobile Installation:
echo - Android: Open in Chrome → Install banner
echo - iOS: Open in Safari → Share → Add to Home Screen
echo.
echo 🎉 Your Factory Management App is ready!
echo.
pause