#!/bin/bash
# Simple deployment script for Factory Management App

echo "🏭 Factory Management App Deployment"
echo "===================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run 'git init' first."
    exit 1
fi

# Check for GitHub remote
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  No GitHub remote found."
    echo "Please add your GitHub repository:"
    echo "git remote add origin https://github.com/yourusername/your-repo-name.git"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    git remote add origin "$repo_url"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment Instructions:"
echo "1. Go to your GitHub repository"
echo "2. Click Settings → Pages"  
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch"
echo "5. Your app will be live at: https://yourusername.github.io/repository-name"
echo ""
echo "📱 Mobile Installation:"
echo "- Android: Open in Chrome → Install banner"
echo "- iOS: Open in Safari → Share → Add to Home Screen"
echo ""
echo "🎉 Your Factory Management App is ready!"