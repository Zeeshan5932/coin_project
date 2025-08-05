// Main API entry point for Vercel
const express = require('express');
const cors = require('cors');

const app = express();

// CORS Configuration - Fixed
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Health Check - Remove /api prefix (Vercel adds it automatically)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'PayPal Clone API is running!' });
});

// Send Money API - Remove /api prefix
app.post('/send-money', (req, res) => {
  const { amount, recipient, message } = req.body;
  res.json({ 
    success: true, 
    message: 'Money sent successfully!',
    amount,
    recipient,
    transactionId: Date.now()
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'PayPal Clone API' });
});

// Export for Vercel serverless
module.exports = app;
