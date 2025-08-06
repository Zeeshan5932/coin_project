import React from 'react';
import Header from './Header';

const SuccessScreen = ({ transactionData, onSendMore, onGoHome }) => {
  return (
    <div>
      <Header />

      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 'calc(100vh - 70px)', 
        padding: window.innerWidth <= 480 ? '16px' : '24px'
      }}>
        {/* Green Checkmark Circle */}
        <svg 
          width={window.innerWidth <= 480 ? "80" : "120"} 
          height={window.innerWidth <= 480 ? "80" : "120"} 
          viewBox="0 0 120 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{marginBottom: window.innerWidth <= 480 ? '16px' : '24px'}}
        >
          <circle cx="60" cy="60" r="50" stroke="#2EB67D" strokeWidth="5" fill="none" />
          <path d="M35 65L55 85L90 45" stroke="#2EB67D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        
        <p style={{
          fontSize: window.innerWidth <= 480 ? '1.3rem' : '1.5rem', 
          color: '#666', 
          marginBottom: window.innerWidth <= 480 ? '24px' : '32px', 
          textAlign: 'center',
          padding: window.innerWidth <= 480 ? '0 16px' : '0',
          fontWeight: '600'
        }}>
          You have sent <strong>{transactionData?.amount || '0,00'} € EUR</strong> to <strong>{transactionData?.recipient || '@user'}</strong>
        </p>
        
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%', 
          maxWidth: window.innerWidth <= 480 ? '280px' : '300px'
        }}>
          <button 
            onClick={onSendMore}
            style={{
              width: '100%',
              background: '#0070ba',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              padding: window.innerWidth <= 480 ? '10px 16px' : '12px 20px',
              fontSize: window.innerWidth <= 480 ? '1.1rem' : '1.3rem',
              fontWeight: '600',
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
              fontSize: window.innerWidth <= 480 ? '1.1rem' : '1.3rem',
              cursor: 'pointer',
              fontWeight: '600'
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
