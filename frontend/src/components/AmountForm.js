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
        <div style={{ color: '#666', flex: 1, padding: '3px 0', fontWeight: '500' }}>Send</div>
        <div style={{ color: '#666', flex: 1, padding: '3px 0', fontWeight: '500' }}>Ask</div>
        <div style={{ color: '#666', flex: 1, padding: '3px 0', fontWeight: '500' }}>Contact</div>
        <div style={{ color: '#666', flex: 1, padding: '3px 0', fontWeight: '500' }}>Plus</div>
      </div>

      <div className="container" style={{maxWidth: '450px', margin: '0 auto', padding: '0.5rem', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
        <form className="payment-form" onSubmit={handleSubmit} style={{padding: '1rem'}}>
          <h1 className="form-title" style={{textAlign: 'center', fontWeight: 700, fontSize: '1.8rem', marginBottom: '1rem', color: '#333'}}>Send money to</h1>
          <div style={{textAlign: 'center', color: '#0070ba', fontSize: '1.4rem', fontWeight: '500', marginBottom: '1.5rem'}}>
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
              <div style={{fontSize: '3.5rem', fontWeight: '500', color: '#333', margin: '0.5rem 0'}}>{amount || '0,00'}</div>
              <div style={{fontSize: '1.25rem', color: '#767676', margin: '0.25rem 0'}}>EUR</div>
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
          
          <div style={{margin: '2rem 0', color: '#767676', textAlign: 'center', fontSize: '1rem'}}>
            Why this payment?
          </div>
          
          <div style={{
            margin: '1.5rem 0',
            borderTop: '1px solid #e0e0e0',
            borderBottom: '1px solid #e0e0e0',
            height: '4rem'
          }}></div>
          
          <div style={{textAlign: 'center', color: '#767676', margin: '1.5rem 0 2rem', fontSize: '0.9rem'}}>
            To find out more, see our Terms of use.
          </div>
          
          <button type="submit" className="btn btn-primary btn-full" style={{
            fontSize: '1.25rem', 
            fontWeight: 600, 
            borderRadius: '2rem', 
            background: '#0070ba', 
            boxShadow: 'none', 
            padding: '0.75rem 0', 
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