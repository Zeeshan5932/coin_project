import React, { useState } from 'react';
import Header from './Header';

const AmountForm = ({ recipient, onAmountSubmit, onBack }) => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const formatAmount = (value) => {
    if (!value) return '';
    const number = parseFloat(value);
    return number.toLocaleString('de-DE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll proceed even with 0 amount to match the screenshot
    onAmountSubmit(formatAmount(amount || '0'));
  };

  return (
    <div>
      <Header />
      <div className="nav-tabs" style={{
        display: 'flex',
        padding: '5px 0',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        textAlign: 'center'
      }}>
        <div style={{ 
          color: '#666', 
          flex: 1, 
          padding: '3px 0', 
          fontWeight: '500',
          fontSize: window.innerWidth <= 480 ? '12px' : '14px'
        }}>Send</div>
        <div style={{ 
          color: '#666', 
          flex: 1, 
          padding: '3px 0', 
          fontWeight: '500',
          fontSize: window.innerWidth <= 480 ? '12px' : '14px'
        }}>Ask</div>
        <div style={{ 
          color: '#666', 
          flex: 1, 
          padding: '3px 0', 
          fontWeight: '500',
          fontSize: window.innerWidth <= 480 ? '12px' : '14px'
        }}>Contact</div>
        <div style={{ 
          color: '#666', 
          flex: 1, 
          padding: '3px 0', 
          fontWeight: '500',
          fontSize: window.innerWidth <= 480 ? '12px' : '14px'
        }}>Plus</div>
      </div>

      <div className="container" style={{
        maxWidth: '450px', 
        margin: '0 auto', 
        padding: window.innerWidth <= 480 ? '8px' : '0.5rem', 
        backgroundColor: 'white', 
        borderRadius: '5px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        width: window.innerWidth <= 480 ? 'calc(100% - 32px)' : 'auto'
      }}>
        <form className="payment-form" onSubmit={handleSubmit} style={{
          padding: window.innerWidth <= 480 ? '16px' : '1rem'
        }}>
          <h1 className="form-title" style={{
            textAlign: 'center', 
            fontWeight: 700, 
            fontSize: window.innerWidth <= 480 ? '1.5rem' : '1.8rem', 
            marginBottom: '1rem', 
            color: '#333'
          }}>Send money to</h1>
          <div style={{
            textAlign: 'center', 
            color: '#0070ba', 
            fontSize: window.innerWidth <= 480 ? '1.2rem' : '1.4rem', 
            fontWeight: '500', 
            marginBottom: '1.5rem'
          }}>
            {typeof recipient === 'string' ? recipient : 
              (recipient && recipient.recipient ? recipient.recipient : '@user')}
          </div>
          <div className="recipient-display" style={{marginBottom: '1rem', display: 'none'}}>
            <div className="recipient-avatar">
              {typeof recipient === 'string' && recipient.includes('@') 
                ? recipient.charAt(1).toUpperCase() 
                : (typeof recipient === 'object' && recipient.recipient && recipient.recipient.includes('@')
                    ? recipient.recipient.charAt(1).toUpperCase()
                    : 'U')}
            </div>
            <div className="recipient-info">
              <div className="recipient-name">
                {typeof recipient === 'string' ? recipient : 
                 (recipient && recipient.recipient ? recipient.recipient : '@user')}
              </div>
              <div className="recipient-status">Available to receive money</div>
            </div>
          </div>
          <div className="form-group" style={{marginBottom: '0.5rem'}}>
            <div style={{textAlign: 'center', margin: '0.5rem 0'}}>
              <div style={{
                fontSize: window.innerWidth <= 480 ? '2.5rem' : '3.5rem', 
                fontWeight: '500', 
                color: '#333', 
                margin: '0.5rem 0'
              }}>{amount || '0,00'}</div>
              <div style={{
                fontSize: window.innerWidth <= 480 ? '1rem' : '1.25rem', 
                color: '#767676', 
                margin: '0.25rem 0'
              }}>EUR</div>
            </div>
            <div className="amount-container" style={{opacity: 0, height: 0, overflow: 'hidden'}}>
              <input
                type="text"
                id="amount"
                className="form-input amount-input"
                value={amount}
                onChange={handleAmountChange}
                autoFocus
              />
            </div>
          </div>
          
          <div style={{
            margin: '2rem 0', 
            color: '#767676', 
            textAlign: 'center', 
            fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem'
          }}>
            Why this payment?
          </div>
          
          <div style={{
            margin: '1.5rem 0',
            borderTop: '1px solid #e0e0e0',
            borderBottom: '1px solid #e0e0e0',
            height: window.innerWidth <= 480 ? '3rem' : '4rem'
          }}></div>
          
          <div style={{
            textAlign: 'center', 
            color: '#767676', 
            margin: '1.5rem 0 2rem', 
            fontSize: window.innerWidth <= 480 ? '0.8rem' : '0.9rem'
          }}>
            To find out more, see our Terms of use.
          </div>
          
          <button type="submit" className="btn btn-primary btn-full" style={{
            fontSize: window.innerWidth <= 480 ? '1rem' : '1.25rem', 
            fontWeight: 600, 
            borderRadius: '2rem', 
            background: '#0070ba', 
            boxShadow: 'none', 
            padding: window.innerWidth <= 480 ? '12px 0' : '0.75rem 0', 
            width: '100%',
            color: 'white',
            border: 'none'
          }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AmountForm;