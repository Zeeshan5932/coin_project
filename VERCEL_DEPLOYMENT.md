# Vercel Deployment Guide for PayPal Clone

## 🚀 Quick Deploy to Vercel

### Prerequisites
1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Make sure you have a Vercel account at [vercel.com](https://vercel.com)

### Deployment Steps

1. **Login to Vercel**:
```bash
vercel login
```

2. **Deploy from project root**:
```bash
vercel
```

3. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? **paypal-clone**
   - In which directory is your code located? **./** (current directory)

4. **For production deployment**:
```bash
vercel --prod
```

## 🏗️ Project Structure for Vercel

The project has been configured with:

- ✅ `vercel.json` - Vercel configuration
- ✅ Serverless API functions in `backend/api/`
- ✅ Frontend build configuration
- ✅ CORS handling for API endpoints
- ✅ Environment variable support

## 📡 API Endpoints

After deployment, your API endpoints will be available at:

- `https://your-app.vercel.app/api/health` - Health check
- `https://your-app.vercel.app/api/send-money` - Send money
- `https://your-app.vercel.app/api/request-money` - Request money
- `https://your-app.vercel.app/api/balance` - Get balance
- `https://your-app.vercel.app/api/transactions` - Get transactions

## 🔧 Environment Variables

If you need environment variables, add them in your Vercel dashboard:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add your variables (e.g., `JWT_SECRET`, `FIREBASE_CONFIG`, etc.)

## 🎯 Demo Features

Your deployed app includes:

- ✅ Demo balance: €19,705,736.00
- ✅ Send money simulation with 1-3 second processing
- ✅ Request money functionality
- ✅ Transaction history with demo data
- ✅ PayPal-style UI with Tailwind CSS
- ✅ Responsive design for mobile and desktop

## 🔄 Automatic Deployments

After initial setup, Vercel will automatically deploy when you:
- Push to your main branch (if connected to Git)
- Run `vercel --prod` manually

## 🧪 Testing Your Deployment

1. Visit your Vercel URL
2. Test the demo features:
   - View balance
   - Send money to `@xaliciax` or `@mikebidjvg5`
   - Request money
   - Check transaction history

## 🛠️ Local Development

For local development, continue using:
```bash
npm run dev
```

This runs both frontend (localhost:3000) and backend (localhost:5000) with live reload.

## 🔍 Troubleshooting

If you encounter issues:

1. **Check build logs** in Vercel dashboard
2. **Verify API endpoints** at `/api/health`
3. **Check browser console** for frontend errors
4. **Review Vercel function logs** in dashboard

## 📱 Mobile Testing

The app is optimized for mobile devices with:
- Responsive PayPal-style design
- Touch-friendly interfaces
- Mobile-first approach

---

**Ready to deploy?** Run `vercel` from your project root! 🚀
