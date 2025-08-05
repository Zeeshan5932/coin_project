import React from 'react';
import Header from './Header';

const PaymentHistoryScreen = ({ onSendMoney, paymentHistory }) => {
  // If there's no payment history, provide some sample data
  const history = paymentHistory || [
    { 
      id: '1', 
      recipient: '@gabrielebrezins', 
      amount: '300,00 EUR', 
      date: 'August 2, 2025',
      status: 'Completed'
    },
    { 
      id: '2', 
      recipient: '@zeeshan', 
      amount: '150,00 EUR', 
      date: 'July 30, 2025',
      status: 'Completed'
    },
    { 
      id: '3', 
      recipient: '@richardai', 
      amount: '75,00 EUR', 
      date: 'July 25, 2025',
      status: 'Completed'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Header />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Header Section */}
        <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontWeight: '700', 
              fontSize: '2.5rem', 
              color: '#1a202c',
              margin: '0 0 8px 0'
            }}>
              Payment History
            </h1>
            <p style={{
              color: '#718096',
              fontSize: '1.1rem',
              margin: 0
            }}>
              Track all your transactions
            </p>
          </div>
          
          <button 
            onClick={onSendMoney}
            style={{
              background: 'linear-gradient(135deg, #0070ba 0%, #005ea6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 112, 186, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 112, 186, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 112, 186, 0.3)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Send Money
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', opacity: 0.9 }}>Total Sent</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>
              €{history.reduce((sum, payment) => sum + parseFloat(payment.amount.replace(/[^0-9.,]/g, '').replace(',', '.')), 0).toFixed(2)}
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 8px 25px rgba(245, 87, 108, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', opacity: 0.9 }}>Transactions</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>{history.length}</p>
          </div>
        </div>

        {/* Transactions List */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px 24px',
            fontWeight: '600',
            fontSize: '1.1rem'
          }}>
            Recent Transactions
          </div>
          
          {/* Transaction Items */}
          <div>
            {history.map((payment, index) => (
              <div 
                key={payment.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px 24px',
                  borderBottom: index < history.length - 1 ? '1px solid #f1f5f9' : 'none',
                  transition: 'background-color 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  marginRight: '16px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}>
                  {payment.recipient.charAt(1).toUpperCase()}
                </div>
                
                {/* Transaction Details */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    color: '#2d3748',
                    marginBottom: '4px'
                  }}>
                    {payment.recipient}
                  </div>
                  <div style={{
                    color: '#718096',
                    fontSize: '0.9rem'
                  }}>
                    {payment.date}
                  </div>
                </div>
                
                {/* Amount */}
                <div style={{
                  textAlign: 'right',
                  marginRight: '20px'
                }}>
                  <div style={{
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    color: '#e53e3e'
                  }}>
                    -{payment.amount}
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <span style={{
                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    boxShadow: '0 2px 8px rgba(72, 187, 120, 0.3)'
                  }}>
                    ✓ {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {history.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 24px',
              color: '#a0aec0'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💳</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#4a5568' }}>No transactions yet</h3>
              <p style={{ margin: 0 }}>Start sending money to see your transaction history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryScreen;
