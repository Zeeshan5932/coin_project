// Health check endpoint for Vercel
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'PayPal Clone API is running on Vercel!'
  });
};
