# PayPal Clone - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Step 1: Prepare Your Repository
Make sure all your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub account
4. Select your `paypal-clone` repository

### Step 3: Configure Deployment Settings
- **Framework Preset**: Other
- **Root Directory**: `./` (leave default)
- **Build Command**: Auto-detect
- **Output Directory**: Auto-detect

### Step 4: Environment Variables (if needed)
Add these in Vercel Dashboard → Settings → Environment Variables:
```
NODE_ENV=production
FIREBASE_API_KEY=your_key_here
FIREBASE_AUTH_DOMAIN=your_domain_here
```

### Step 5: Deploy!
Click "Deploy" and wait for the build to complete.

## 📁 Project Structure
```
paypal-clone/
├── frontend/          # React.js app
├── backend/
│   └── api/           # Vercel serverless functions
└── vercel.json        # Deployment configuration
```

## 🔧 API Endpoints
- `GET /api/health` - Health check
- `POST /api/send-money` - Send money
- `POST /api/request-money` - Request money
- `GET /api/transactions` - Get transactions
- `GET /api/balance` - Get balance

## 🐛 Troubleshooting
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify API routes are working locally first

## 🌐 Live URLs
- Frontend: `https://your-app-name.vercel.app`
- API: `https://your-app-name.vercel.app/api/health`
