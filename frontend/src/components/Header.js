import React from 'react';

const Header = () => {
  return (
    <div>
      {/* Blue header with PayPal logo */}
      <div style={{
        backgroundColor: '#0070ba',
        padding: '6px 6px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <img 
          src={require('../images/logo.png')}
          alt="PayPal Logo"
          style={{
            width: window.innerWidth <= 768 ? '120px' : '150px',
            height: window.innerWidth <= 768 ? '34px' : '42px',
            paddingLeft: '5px',
            borderRadius: '50%',
            color: 'white',
          }}
        />
      </div>
      
      {/* Original header */}
      <header style={{
        backgroundColor: '#f5f5f5',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        flexWrap: window.innerWidth <= 768 ? 'wrap' : 'nowrap'
      }}>
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        marginRight: window.innerWidth <= 768 ? '10px' : '15px',
        marginBottom: window.innerWidth <= 768 ? '8px' : '0'
      }}>
        <img 
          src={require('../images/Adobe Express - file.png')}
          alt="PayPal Logo"
          style={{
            width: window.innerWidth <= 768 ? '40px' : '50px',
            height: window.innerWidth <= 768 ? '40px' : '50px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        flexWrap: window.innerWidth <= 768 ? 'wrap' : 'nowrap',
        gap: window.innerWidth <= 768 ? '8px' : '0'
      }}>
        <div style={{
          fontSize: window.innerWidth <= 480 ? '14px' : window.innerWidth <= 768 ? '15px' : '17px', 
          padding: '3px 2px', 
          color: '#666',
          whiteSpace: 'nowrap',
          fontWeight: '600'
        }}>Home</div>
        <div style={{
          fontSize: window.innerWidth <= 480 ? '14px' : window.innerWidth <= 768 ? '15px' : '17px', 
          padding: '3px 2px', 
          color: '#666',
          whiteSpace: 'nowrap',
          fontWeight: '600'
        }}>Activity</div>
        <div style={{
          fontSize: window.innerWidth <= 480 ? '14px' : window.innerWidth <= 768 ? '15px' : '17px', 
          padding: '3px 2px', 
          color: '#666', 
          borderBottom: '3px solid #0070ba', 
          fontWeight: 'bold',
          whiteSpace: window.innerWidth <= 768 ? 'normal' : 'nowrap'
        }}>
          {window.innerWidth <= 480 ? 'Payments' : 'Making and accepting payments'}
        </div>
        <div style={{
          fontSize: window.innerWidth <= 480 ? '14px' : window.innerWidth <= 768 ? '15px' : '17px', 
          padding: '3px 2px', 
          color: '#666',
          whiteSpace: 'nowrap',
          fontWeight: '600'
        }}>
          {window.innerWidth <= 480 ? 'Business' : 'Promote your business'}
        </div>
        <div style={{
          fontSize: window.innerWidth <= 480 ? '14px' : window.innerWidth <= 768 ? '15px' : '17px', 
          padding: '3px 2px', 
          color: '#666',
          whiteSpace: 'nowrap',
          fontWeight: '600'
        }}>Funding</div>
        <div style={{
          fontSize: window.innerWidth <= 480 ? '14px' : window.innerWidth <= 768 ? '15px' : '17px', 
          padding: '3px 2px', 
          color: '#666',
          whiteSpace: 'nowrap',
          display: window.innerWidth <= 480 ? 'none' : 'block',
          fontWeight: '600'
        }}>
          {window.innerWidth <= 768 ? 'Tools' : 'Professional tools'}
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;
