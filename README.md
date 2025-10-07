# 🏭 Factory Management System

A complete mobile-responsive factory management application with Progressive Web App (PWA) capabilities.

## ✨ Features

- **4 Management Sections**: Loading, Salary, Received, Piece Work
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Local Storage**: Data persists between sessions
- **Month-wise Organization**: Separate data by month and year
- **PDF Export**: Download reports in PDF format
- **PWA Support**: Install as an app on your mobile device
- **Offline Capability**: Works without internet connection

## 📱 Mobile Installation

### Android Devices:
1. Open the app in Chrome browser
2. Look for the "Install" banner at the top
3. Tap "Install" to add to home screen
4. Or use Chrome menu → "Add to Home Screen"

### iOS Devices (iPhone/iPad):
1. Open the app in Safari browser
2. Tap the Share button (square with arrow)
3. Select "Add to Home Screen"
4. Confirm the installation

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended)
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Your app will be available at: `https://yourusername.github.io/repository-name`

### Option 2: Vercel (Easy Deployment)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Get a custom domain

### Option 3: Netlify
1. Drag and drop your project folder to Netlify
2. Get instant deployment
3. Custom domain available

## 🔧 Local Development

```bash
# Clone the repository
git clone [your-repo-url]

# Navigate to project
cd factory-management

# Start local server
python -m http.server 8080

# Open in browser
# http://localhost:8080
```

## 📦 File Structure

```
factory-management/
├── index.html          # Main application
├── styles.css          # Mobile-responsive styles
├── script.js           # Application logic
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
└── README.md          # This file
```

## 💾 Data Storage

- All data is stored locally in your browser
- Data persists between app sessions
- Month-wise data organization
- Export data as PDF reports

## 🛠️ Browser Support

- ✅ Chrome (Android/Desktop)
- ✅ Safari (iOS/macOS)
- ✅ Firefox (Android/Desktop)
- ✅ Edge (Windows/Android)

## 📊 Sections Overview

1. **📦 Loading**: Track DC numbers, fabric, providers, quantities
2. **💰 Salary**: Manage employee salaries, advances, totals
3. **📥 Received**: Monitor old balances, new quantities, payments
4. **⚙️ Piece Work**: Calculate piece-rate work and salaries

## 🎯 Usage Tips

- **Mobile**: Swipe tables horizontally to see all columns
- **Data Entry**: All calculations happen automatically
- **Month Selection**: Use dropdowns to switch between months
- **PDF Export**: Download complete month reports
- **Debug**: Use debug button to verify data storage

## 🔒 Privacy

- All data stays on your device
- No data is sent to external servers
- Complete offline functionality
- Your privacy is protected

## 📞 Support

For issues or questions, check the debug console or verify local storage functionality using the built-in debug tools.

---

**Made with ❤️ for efficient factory management**