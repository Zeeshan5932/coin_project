// import React, { useState, useEffect, useRef } from 'react';
// import Header from './Header';

// const RecipientForm = ({ onRecipientSubmit, initialRecipient = '' }) => {
//   const [recipient, setRecipient] = useState(initialRecipient);
//   const [amount, setAmount] = useState('');
//   const [paymentReason, setPaymentReason] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
//   const suggestionRefs = useRef([]);

//   // Mock user data for suggestions
//   const mockUsers = [
//     { username: '@gabrielebrezins', email: 'gabriele.brezins@email.com' },
//     { username: '@lorensa.dentals', email: 'lorensa.dentals@email.com' },
//     { username: '@lorensadentals', email: 'lorensa.dentals.alt@email.com' },
//     { username: '@gabrielemorgans', email: 'gabriele.morgans@email.com' },
//     { username: '@rafaelmoreand', email: 'rafael.moreand@email.com' },
//     { username: '@richardai', email: 'richard.ai@email.com' },
//     { username: '@gabrieletech', email: 'gabriele.tech@email.com' },
//     { username: '@lorensaofficial', email: 'lorensa.official@email.com' }
//   ];

//   const [filteredUsers, setFilteredUsers] = useState([]);

//   const handleSuggestionClick = (user) => {
//     setRecipient(user.username);
//     setShowSuggestions(false);
//     setSelectedSuggestion(-1);
//   };

//   const handleAmountChange = (e) => {
//     // Only allow numbers and one decimal point
//     let value = e.target.value.replace(/,/g, '');
//     if (/^\d*(\.\d{0,2})?$/.test(value)) {
//       setAmount(value);
//     }
//   };

//   // Format amount for display (add commas for thousands, no forced decimals)
//   // Format amount for display (European style: 2.000,00)
//   const formatDisplayAmount = (amount) => {
//     if (!amount) return '';
//     // Remove any non-digit/non-decimal
//     let clean = amount.replace(/[^\d.,]/g, '');
//     // Replace comma with dot if user types comma as decimal
//     clean = clean.replace(/,/g, '.');
//     const num = parseFloat(clean);
//     if (isNaN(num)) return amount;
//     // Format: 2.000,00
//     return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!recipient) {
//       alert('Please select a recipient');
//       return;
//     }
//     if (!amount) {
//       alert('');
//       return;
//     }
//     onRecipientSubmit({ recipient, amount, paymentReason });
//   };

//   // Show initial suggestions when component loads
//   useEffect(() => {
//     setFilteredUsers(mockUsers);
//     setShowSuggestions(true);
//   }, []);

//   return (
//     <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
//       <Header />
      
//       <div style={{ 
//         maxWidth: '400px', 
//         margin: '20px auto', 
//         backgroundColor: 'white', 
//         borderRadius: '12px', 
//         padding: '24px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//       }}>
//         <form onSubmit={handleSubmit}>
//           {/* Title */}
//           <h1 style={{
//             textAlign: 'center',
//             fontSize: '1.8rem',
//             fontWeight: '600',
//             color: '#333',
//             marginBottom: '24px',
//             margin: '0 0 24px 0'
//           }}>
//             Send money to
//           </h1>
          
//           {/* User Suggestions - Always visible if no recipient selected */}
//           {!recipient && showSuggestions && filteredUsers.length > 0 && (
//             <div style={{
//               marginBottom: '24px',
//               border: '1px solid #e5e7eb',
//               borderRadius: '8px',
//               maxHeight: '200px',
//               overflowY: 'auto'
//             }}>
//               {filteredUsers.map((user, index) => (
//                 <div
//                   key={user.username}
//                   onClick={() => handleSuggestionClick(user)}
//                   style={{
//                     padding: '12px 16px',
//                     cursor: 'pointer',
//                     borderBottom: index < filteredUsers.length - 1 ? '1px solid #f3f4f6' : 'none',
//                     backgroundColor: '#fff'
//                   }}
//                   onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
//                 >
//                   <div style={{fontWeight: 500, color: '#333'}}>{user.username}</div>
//                   <div style={{fontSize: '0.875rem', color: '#6b7280'}}>{user.email}</div>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           {/* Recipient Display - Only show when selected */}
//           {recipient && (
//             <div style={{
//               textAlign: 'center',
//               color: '#0070ba',
//               fontSize: '1.2rem',
//               fontWeight: '500',
//               marginBottom: '40px',
//               cursor: 'pointer'
//             }}
//             onClick={() => {
//               setRecipient('');
//               setShowSuggestions(true);
//             }}
//             >
//               {recipient}
//             </div>
//           )}
          
//           {/* Amount Display - Only show when recipient is selected */}
//           {recipient && (
//             <>
//               <div style={{ textAlign: 'center', marginBottom: '40px' }}>
//                 <input
//                   type="text"
//                   value={amount}
//                   onChange={handleAmountChange}
//                   placeholder="0"
//                   style={{
//                     fontSize: '4rem',
//                     fontWeight: '400',
//                     color: '#333',
//                     textAlign: 'center',
//                     border: 'none',
//                     outline: 'none',
//                     backgroundColor: 'transparent',
//                     width: '100%'
//                   }}
//                 />
//                 <div style={{
//                   fontSize: '1.4rem',
//                   color: '#888',
//                   fontWeight: '400',
//                   marginTop: '8px'
//                 }}>
//                   {amount ? `${formatDisplayAmount(amount)} EUR` : '€ EUR'}
//                 </div>
//               </div>
              
//               {/* Why this payment section */}
//               <div style={{
//                 color: '#888',
//                 fontSize: '1rem',
//                 marginBottom: '16px',
//                 textAlign: 'left'
//               }}>
//                 Why this payment?
//               </div>
              
         
              
//               {/* Divider line */}
//               <div style={{
//                 height: '1px',
//                 backgroundColor: '#e0e0e0',
//                 margin: '0 0 24px 0'
//               }}></div>
              
//               {/* Terms text */}
//               <div style={{
//                 textAlign: 'center',
//                 color: '#888',
//                 fontSize: '0.9rem',
//                 marginBottom: '32px'
//               }}>
//                 To find out more, see our Terms of use.
//               </div>
              
//               {/* Buttons */}
//               <div style={{ textAlign: 'center' }}>
//                 <button
//                   type="submit"
//                   style={{
//                     backgroundColor: '#0070ba',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '24px',
//                     padding: '12px 40px',
//                     fontSize: '1.1rem',
//                     fontWeight: '500',
//                     cursor: 'pointer',
//                     marginBottom: '16px',
//                     minWidth: '120px'
//                   }}
//                 >
//                   Send
//                 </button>
                
//                 <div>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setRecipient('');
//                       setAmount('');
//                       setPaymentReason('');
//                       setShowSuggestions(true);
//                     }}
//                     style={{
//                       backgroundColor: 'transparent',
//                       color: '#0070ba',
//                       border: 'none',
//                       fontSize: '1rem',
//                       cursor: 'pointer',
//                       textDecoration: 'underline'
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RecipientForm;






import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';

const RecipientForm = ({ onRecipientSubmit, initialRecipient = '' }) => {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [amount, setAmount] = useState('');
  const [paymentReason, setPaymentReason] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const suggestionRefs = useRef([]);

  // Mock user data for suggestions
  const mockUsers = [
    { username: '@gabrielebrezins', email: 'gabriele.brezins@email.com' },
    { username: '@lorensa.dentals', email: 'lorensa.dentals@email.com' },
    { username: '@lorensadentals', email: 'lorensa.dentals.alt@email.com' },
    { username: '@gabrielemorgans', email: 'gabriele.morgans@email.com' },
    { username: '@rafaelmoreand', email: 'rafael.moreand@email.com' },
    { username: '@richardai', email: 'richard.ai@email.com' },
    { username: '@gabrieletech', email: 'gabriele.tech@email.com' },
    { username: '@lorensaofficial', email: 'lorensa.official@email.com' }
  ];

  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSuggestionClick = (user) => {
    setRecipient(user.username);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/,/g, ''); // Remove commas for parsing
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      // Format with thousands separator
      const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setAmount(formatted);
    } else if (value === '') {
      setAmount('');
    }
  };

  // Format amount for display (add commas for thousands, decimal comma for European style)
  const formatDisplayAmount = (amount) => {
    if (!amount) return '';
    // Remove any non-digit/non-decimal
    let clean = amount.replace(/[^\d,]/g, '');
    // Format as a European style with comma as decimal separator
    const num = clean.split(',');
    if (num[1] && num[1].length > 2) {
      num[1] = num[1].slice(0, 2); // limit to two decimal places
    }
    return num.length === 2
      ? `${num[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${num[1]}`
      : num[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipient) {
      alert('Please select a recipient');
      return;
    }
    if (!amount) {
      alert('Please enter an amount');
      return;
    }
    onRecipientSubmit({ recipient, amount, paymentReason });
  };

  // Show initial suggestions when component loads
  useEffect(() => {
    setFilteredUsers(mockUsers);
    setShowSuggestions(true);
  }, []);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ 
        maxWidth: '400px', 
        margin: '20px auto', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: window.innerWidth <= 480 ? '16px' : '24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: window.innerWidth <= 480 ? 'calc(100% - 40px)' : 'auto'
      }}>
        <form onSubmit={handleSubmit}>
          <h1 style={{
            textAlign: 'center',
            fontSize: window.innerWidth <= 480 ? '1.5rem' : '1.8rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '24px',
            margin: '0 0 24px 0'
          }}>
            Send money to
          </h1>
          
          {/* User Suggestions - Always visible if no recipient selected */}
          {!recipient && showSuggestions && filteredUsers.length > 0 && (
            <div style={{
              marginBottom: '24px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              maxHeight: window.innerWidth <= 480 ? '150px' : '200px',
              overflowY: 'auto'
            }}>
              {filteredUsers.map((user, index) => (
                <div
                  key={user.username}
                  onClick={() => handleSuggestionClick(user)}
                  style={{
                    padding: window.innerWidth <= 480 ? '10px 12px' : '12px 16px',
                    cursor: 'pointer',
                    borderBottom: index < filteredUsers.length - 1 ? '1px solid #f3f4f6' : 'none',
                    backgroundColor: '#fff'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                >
                  <div style={{
                    fontWeight: 500, 
                    color: '#333',
                    fontSize: window.innerWidth <= 480 ? '14px' : '16px'
                  }}>{user.username}</div>
                  <div style={{
                    fontSize: window.innerWidth <= 480 ? '12px' : '0.875rem', 
                    color: '#6b7280'
                  }}>{user.email}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Recipient Display - Only show when selected */}
          {recipient && (
            <div style={{
              textAlign: 'center',
              color: '#0070ba',
              fontSize: window.innerWidth <= 480 ? '1rem' : '1.2rem',
              fontWeight: '500',
              marginBottom: window.innerWidth <= 480 ? '30px' : '40px',
              cursor: 'pointer'
            }}
            onClick={() => {
              setRecipient('');
              setShowSuggestions(true);
            }}
            >
              {recipient}
            </div>
          )}
          
          {/* Amount Display - Only show when recipient is selected */}
          {recipient && (
            <>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: window.innerWidth <= 480 ? '30px' : '40px' 
              }}>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  style={{
                    fontSize: window.innerWidth <= 480 ? '3rem' : '4rem',
                    fontWeight: '400',
                    color: '#333',
                    textAlign: 'center',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    width: '100%'
                  }}
                  inputMode="numeric"
                />
                <div style={{
                  fontSize: window.innerWidth <= 480 ? '1.2rem' : '1.4rem',
                  color: '#888',
                  fontWeight: '400',
                  marginTop: '8px'
                }}>
                  € EUR
                </div>
              </div>
              
              {/* Why this payment section */}
              <div style={{
                color: '#888',
                fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem',
                marginBottom: '16px',
                textAlign: 'left'
              }}>
                Why this payment?
              </div>
              
              {/* Divider line */}
              <div style={{
                height: '1px',
                backgroundColor: '#e0e0e0',
                margin: '0 0 24px 0'
              }}></div>
              
              {/* Terms text */}
              <div style={{
                textAlign: 'center',
                color: '#888',
                fontSize: window.innerWidth <= 480 ? '0.8rem' : '0.9rem',
                marginBottom: window.innerWidth <= 480 ? '24px' : '32px'
              }}>
                To find out more, see our Terms of use.
              </div>
              
              {/* Buttons */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#0070ba',
                    color: 'white',
                    border: 'none',
                    borderRadius: '24px',
                    padding: window.innerWidth <= 480 ? '10px 30px' : '12px 40px',
                    fontSize: window.innerWidth <= 480 ? '1rem' : '1.1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginBottom: '16px',
                    minWidth: window.innerWidth <= 480 ? '100px' : '120px'
                  }}
                >
                  Send
                </button>
                
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setRecipient('');
                      setAmount('');
                      setPaymentReason('');
                      setShowSuggestions(true);
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#0070ba',
                      border: 'none',
                      fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RecipientForm;



