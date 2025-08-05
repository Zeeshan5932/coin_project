// Get balance API endpoint for Vercel
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Demo balance as specified in your coding instructions
    const demoBalance = 19705736; // €19,705,736.00
    
    res.json({
      success: true,
      balance: demoBalance,
      currency: 'EUR',
      formatted: new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(demoBalance / 100), // Assuming balance is in cents
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch balance'
    });
  }
};
