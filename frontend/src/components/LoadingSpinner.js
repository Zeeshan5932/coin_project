import React from 'react';
import Header from './Header';

const LoadingSpinner = () => {
  
  return (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 70px)',
        backgroundColor: '#fff'
      }}>
        {/* Blue Spinner Animation */}
        <div style={{
          width: '80px',
          height: '80px',
          position: 'relative',
          marginBottom: '30px'
        }}>
          <svg 
            style={{
              width: '100%',
              height: '100%'
            }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#0070ba"
              strokeWidth="8"
              fill="none"
              strokeDasharray="251"
              strokeDashoffset="62.8"
              style={{
                animation: 'spin 4s linear infinite'
              }}
            />
            <style>
              {`
                @keyframes spin {
                  0% {
                    transform: rotate(0deg);
                    transform-origin: 50% 50%;
                  }
                  100% {
                    transform: rotate(360deg);
                    transform-origin: 50% 50%;
                  }
                }
              `}
            </style>
          </svg>
        </div>
  
      </div>
    </div>
  );
};

export default LoadingSpinner;
