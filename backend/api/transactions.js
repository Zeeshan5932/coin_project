// Get transactions API endpoint for Vercel
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
    // Demo transactions data following your PayPal clone patterns
    const demoTransactions = [
      {
        id: '1',
        type: 'sent',
        recipient: '@xaliciax',
        amount: 25.00,
        description: 'Lunch money',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        status: 'completed'
      },
      {
        id: '2',
        type: 'received',
        sender: '@mikebidjvg5',
        amount: 150.00,
        description: 'Freelance payment',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        status: 'completed'
      },
      {
        id: '3',
        type: 'sent',
        recipient: '@sarah.smith',
        amount: 75.50,
        description: 'Dinner split',
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        status: 'completed'
      },
      {
        id: '4',
        type: 'request',
        fromEmail: 'john.doe@email.com',
        amount: 50.00,
        description: 'Movie tickets',
        timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        status: 'pending'
      }
    ];
    
    res.json({
      success: true,
      transactions: demoTransactions,
      total: demoTransactions.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch transactions'
    });
  }
};
