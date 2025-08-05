const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'PayPal Clone Backend API is running!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Mock API endpoints for frontend
app.post('/api/send-money', (req, res) => {
  const { recipient, amount, description } = req.body;
  
  // Simulate processing delay
  setTimeout(() => {
    res.json({
      success: true,
      transactionId: Date.now(),
      recipient,
      amount: parseFloat(amount),
      description,
      timestamp: new Date().toISOString()
    });
  }, 1000);
});

app.post('/api/request-money', (req, res) => {
  const { fromEmail, amount, description } = req.body;
  
  setTimeout(() => {
    res.json({
      success: true,
      requestId: Date.now(),
      fromEmail,
      amount: parseFloat(amount),
      description,
      timestamp: new Date().toISOString()
    });
  }, 500);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`PayPal Clone Backend running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
