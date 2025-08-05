// Send money API endpoint for Vercel
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { recipient, amount, description } = req.body;
    
    if (!recipient || !amount) {
      return res.status(400).json({ 
        error: 'Recipient and amount are required' 
      });
    }

    // Simulate processing delay (1-3 seconds like in your original code)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
    
    res.json({
      success: true,
      transactionId: Date.now(),
      recipient,
      amount: parseFloat(amount),
      description: description || '',
      timestamp: new Date().toISOString(),
      message: 'Money sent successfully!'
    });
  } catch (error) {
    console.error('Send money error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process payment'
    });
  }
};
