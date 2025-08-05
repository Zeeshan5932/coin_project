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
          src={require('../images/Adobe Express - file.png')}
          alt="PayPal Logo"
          style={{
            width: '150px',
            height: '42px',
            paddingLeft:`35px`,
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
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
      <div style={{display: 'flex', alignItems: 'center', marginRight: '15px'}}>
        <img 
          src={require('../images/images.png')}
          alt="PayPal Logo"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div style={{fontSize: '14px', padding: '3px 2px', color: '#666'}}>Home</div>
        <div style={{fontSize: '14px', padding: '3px 2px', color: '#666'}}>Activity</div>
        <div style={{fontSize: '14px', padding: '3px 2px', color: '#666', borderBottom: '3px solid #0070ba', fontWeight: 'bold'}}>Making and accepting payments</div>
        <div style={{fontSize: '14px', padding: '3px 2px', color: '#666'}}>Promote your business</div>
        <div style={{fontSize: '14px', padding: '3px 2px', color: '#666'}}>Funding</div>
        <div style={{fontSize: '14px', padding: '3px 2px', color: '#666'}}>Professional tools</div>
      </div>
    </header>
    </div>
  );
};

export default Header;
