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

      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '16px',
        '@media (min-width: 768px)': {
          padding: '32px 24px'
        }
      }}>
        {/* Header Section */}
        <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '24px',
          flexDirection: 'column',
          gap: '16px',
          '@media (min-width: 768px)': {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '32px'
          }
        }}>
          <div>
            <h1 style={{
              fontWeight: '700', 
              fontSize: '1.8rem', 
              color: '#1a202c',
              margin: '0 0 8px 0',
              '@media (min-width: 768px)': {
                fontSize: '2.5rem'
              }
            }}>
              Payment History
            </h1>
            <p style={{
              color: '#718096',
              fontSize: '1rem',
              margin: 0,
              '@media (min-width: 768px)': {
                fontSize: '1.1rem'
              }
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
              padding: '12px 20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 112, 186, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'stretch',
              justifyContent: 'center',
              '@media (min-width: 768px)': {
                padding: '14px 28px',
                fontSize: '1rem',
                alignSelf: 'auto'
              }
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
          gridTemplateColumns: '1fr',
          gap: '16px',
          marginBottom: '24px',
          '@media (min-width: 640px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '32px'
          }
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            '@media (min-width: 768px)': {
              padding: '24px'
            }
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', opacity: 0.9, '@media (min-width: 768px)': { fontSize: '0.9rem' } }}>Total Sent</h3>
            <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: '700', '@media (min-width: 768px)': { fontSize: '2rem' } }}>
              €{history.reduce((sum, payment) => sum + parseFloat(payment.amount.replace(/[^0-9.,]/g, '').replace(',', '.')), 0).toFixed(2)}
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 8px 25px rgba(245, 87, 108, 0.3)',
            '@media (min-width: 768px)': {
              padding: '24px'
            }
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', opacity: 0.9, '@media (min-width: 768px)': { fontSize: '0.9rem' } }}>Transactions</h3>
            <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: '700', '@media (min-width: 768px)': { fontSize: '2rem' } }}>{history.length}</p>
          </div>
        </div>

        {/* Transactions List */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          '@media (min-width: 768px)': {
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
          }
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px 20px',
            fontWeight: '600',
            fontSize: '1rem',
            '@media (min-width: 768px)': {
              padding: '20px 24px',
              fontSize: '1.1rem'
            }
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
                  padding: '16px 20px',
                  borderBottom: index < history.length - 1 ? '1px solid #f1f5f9' : 'none',
                  transition: 'background-color 0.2s ease',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '12px',
                  '@media (min-width: 640px)': {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '0',
                    padding: '20px 24px'
                  }
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Mobile Layout */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  '@media (min-width: 640px)': {
                    width: 'auto',
                    flex: 1
                  }
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '1rem',
                    marginRight: '12px',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    '@media (min-width: 640px)': {
                      width: '48px',
                      height: '48px',
                      fontSize: '1.2rem',
                      marginRight: '16px'
                    }
                  }}>
                    {payment.recipient.charAt(1).toUpperCase()}
                  </div>
                  
                  {/* Transaction Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '1rem',
                      color: '#2d3748',
                      marginBottom: '2px',
                      '@media (min-width: 640px)': {
                        fontSize: '1.1rem',
                        marginBottom: '4px'
                      }
                    }}>
                      {payment.recipient}
                    </div>
                    <div style={{
                      color: '#718096',
                      fontSize: '0.85rem',
                      '@media (min-width: 640px)': {
                        fontSize: '0.9rem'
                      }
                    }}>
                      {payment.date}
                    </div>
                  </div>
                </div>
                
                {/* Amount and Status - Mobile stacked, Desktop side by side */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  '@media (min-width: 640px)': {
                    width: 'auto',
                    gap: '20px'
                  }
                }}>
                  {/* Amount */}
                  <div style={{
                    textAlign: 'left',
                    '@media (min-width: 640px)': {
                      textAlign: 'right'
                    }
                  }}>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '1.1rem',
                      color: '#e53e3e',
                      '@media (min-width: 640px)': {
                        fontSize: '1.2rem'
                      }
                    }}>
                      -{payment.amount}
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div>
                    <span style={{
                      background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      boxShadow: '0 2px 8px rgba(72, 187, 120, 0.3)',
                      '@media (min-width: 640px)': {
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem'
                      }
                    }}>
                      ✓ {payment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {history.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#a0aec0',
              '@media (min-width: 768px)': {
                padding: '60px 24px'
              }
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px', '@media (min-width: 768px)': { fontSize: '3rem', marginBottom: '16px' } }}>💳</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#4a5568', fontSize: '1.1rem', '@media (min-width: 768px)': { fontSize: '1.2rem' } }}>No transactions yet</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', '@media (min-width: 768px)': { fontSize: '1rem' } }}>Start sending money to see your transaction history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryScreen;
