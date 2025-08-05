import React from 'react';
import Header from './Header';

const SuccessScreen = ({ transactionData, onSendMore, onGoHome }) => {
  return (
    <div>
      <Header />

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 70px)', padding: '24px'}}>
        {/* Green Checkmark Circle */}
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom: '24px'}}>
          <circle cx="60" cy="60" r="50" stroke="#2EB67D" strokeWidth="5" fill="none" />
          <path d="M35 65L55 85L90 45" stroke="#2EB67D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        
        <p style={{fontSize: '1.1rem', color: '#666', marginBottom: '32px', textAlign: 'center'}}>
          You have sent <strong>{transactionData?.amount || '0,00'} EUR</strong> to <strong>{transactionData?.recipient || '@user'}</strong>
        </p>
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px'}}>
          <button 
            onClick={onSendMore}
            style={{
              width: '100%',
              background: '#0070ba',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              padding: '12px 20px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            Send more money
          </button>
          
          <button 
            onClick={onGoHome}
            style={{
              background: 'transparent',
              color: '#666',
              border: 'none',
              padding: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
