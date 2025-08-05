import React, { useState, useEffect, useRef } from 'react';

const PaymentForm = ({ onSendMoney }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
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

  useEffect(() => {
    if (recipient.length > 0) {
      const filtered = mockUsers.filter(user =>
        user.username.toLowerCase().includes(recipient.toLowerCase()) ||
        user.email.toLowerCase().includes(recipient.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredUsers([]);
    }
    setSelectedSuggestion(-1);
  }, [recipient]);

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleSuggestionClick = (user) => {
    setRecipient(user.username);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredUsers.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < filteredUsers.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : filteredUsers.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(filteredUsers[selectedSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
      default:
        break;
    }
  };

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
    if (!recipient || !amount) {
      alert('Please fill in all fields');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onSendMoney({
      recipient: recipient,
      amount: formatAmount(amount),
      currency: '€ EUR'
    });
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }, 200);
  };

  const handleInputFocus = () => {
    if (recipient.length > 0 && filteredUsers.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div>
      {/* PayPal Header */}
      <header className="paypal-header">
        <nav className="header-nav">
          <a href="#" className="logo">PayPal</a>
          <ul className="nav-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">Activity</a></li>
            <li><a href="#">Making and accepting payments</a></li>
            <li><a href="#">Promote your business</a></li>
            <li><a href="#">Funding</a></li>
            <li><a href="#">Professional tools</a></li>
          </ul>
        </nav>
      </header>

      <div className="container">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Send money</h1>

          {/* Recipient Input */}
          <div className="form-group">
            <label className="form-label" htmlFor="recipient">
              To
            </label>
            <div className="recipient-container">
              <input
                type="text"
                id="recipient"
                className="form-input"
                placeholder="@"
                value={recipient}
                onChange={handleRecipientChange}
                onKeyDown={handleKeyDown}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                autoComplete="off"
              />
              
              {showSuggestions && filteredUsers.length > 0 && (
                <div className="suggestions-dropdown">
                  {filteredUsers.map((user, index) => (
                    <div
                      key={user.username}
                      ref={el => suggestionRefs.current[index] = el}
                      className={`suggestion-item ${
                        index === selectedSuggestion ? 'selected' : ''
                      }`}
                      onClick={() => handleSuggestionClick(user)}
                      style={{
                        backgroundColor: index === selectedSuggestion ? '#f5f7fa' : 'white'
                      }}
                    >
                      <div className="suggestion-avatar">
                        {user.username.charAt(1).toUpperCase()}
                      </div>
                      <div className="suggestion-details">
                        <div className="suggestion-username">{user.username}</div>
                        <div className="suggestion-email">{user.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount Input */}
          <div className="form-group">
            <label className="form-label" htmlFor="amount">
              Amount
            </label>
            <div className="amount-container">
              <span className="currency-symbol">€</span>
              <input
                type="text"
                id="amount"
                className="form-input amount-input"
                placeholder="0,00"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            {amount && (
              <div style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.9rem', 
                color: '#6c7378' 
              }}>
                Amount: {formatAmount(amount)} EUR
              </div>
            )}
          </div>

          {/* Send Button */}
          <button type="submit" className="btn btn-primary btn-full">
            Next
          </button>

          {/* More Ways Section */}
          <div className="more-ways">
            <h3 className="more-ways-title">More ways to send money</h3>
            <div className="more-ways-list">
              <div className="more-way-item">
                <div className="more-way-icon icon-send">📤</div>
                <div className="more-way-content">
                  <div className="more-way-title">Send with phone number</div>
                  <div className="more-way-desc">Quick and easy payments</div>
                </div>
              </div>
              
              <div className="more-way-item">
                <div className="more-way-icon icon-group">👥</div>
                <div className="more-way-content">
                  <div className="more-way-title">Make a group payment</div>
                  <div className="more-way-desc">Pay up to 5,000 people at a time, with no monthly fees.</div>
                </div>
              </div>
              
              <div className="more-way-item">
                <div className="more-way-icon icon-gift">🎁</div>
                <div className="more-way-content">
                  <div className="more-way-title">Send and receive gifts</div>
                  <div className="more-way-desc">Find help or support others now.</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
