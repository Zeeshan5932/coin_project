import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';

const UserSelectionScreen = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const suggestionRefs = useRef([]);

  // Mock user data for suggestions
  const mockUsers = React.useMemo(() => [
    { username: '@gabrielebrezins', email: 'gabriele.brezins@email.com', avatar: 'G' },
    { username: '@lorensa.dentals', email: 'lorensa.dentals@email.com', avatar: 'L' },
    { username: '@lorensadentals', email: 'lorensa.dentals.alt@email.com', avatar: 'L' },
    { username: '@gabrielemorgans', email: 'gabriele.morgans@email.com', avatar: 'G' },
    { username: '@rafaelmoreand', email: 'rafael.moreand@email.com', avatar: 'R' },
    { username: '@richardai', email: 'richard.ai@email.com', avatar: 'R' },
    { username: '@zeeshan', email: 'zeeshan@email.com', avatar: 'Z' },
    { username: '@gabrieletech', email: 'gabriele.tech@email.com', avatar: 'G' },
    { username: '@lorensaofficial', email: 'lorensa.official@email.com', avatar: 'L' }
  ], []);

  // Get saved users from localStorage and combine with mock users
  const getSavedUsers = () => {
    try {
      const saved = localStorage.getItem('savedUsers');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  };

  const [allUsers, setAllUsers] = useState(() => {
    const savedUsers = getSavedUsers();
    return [...mockUsers, ...savedUsers];
  });
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

  useEffect(() => {
    setFilteredUsers(allUsers);
    setShowSuggestions(false); // Don't show suggestions initially
  }, [allUsers]);

  useEffect(() => {
    // Only show suggestions if search term starts with @
    if (searchTerm.startsWith('@') && searchTerm.length > 1) {
      const filtered = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredUsers(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    setSelectedSuggestion(-1);
  }, [searchTerm, allUsers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Show suggestions only when @ is typed
    if (e.target.value.startsWith('@') && e.target.value.length > 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleUserClick = (user) => {
    onUserSelect(user.username);
  };

  // Function to save new user when payment is completed
  const saveNewUser = (username) => {
    // Only save if it starts with @ and doesn't already exist
    if (username.startsWith('@')) {
      const existingUser = allUsers.find(user => 
        user.username.toLowerCase() === username.toLowerCase()
      );
      
      if (!existingUser) {
        const newUser = {
          username: username,
          email: `${username.substring(1)}@email.com`, // Generate email from username
          avatar: username.substring(1, 2).toUpperCase() // First letter as avatar
        };
        
        const savedUsers = getSavedUsers();
        const updatedSavedUsers = [...savedUsers, newUser];
        
        // Save to localStorage
        try {
          localStorage.setItem('savedUsers', JSON.stringify(updatedSavedUsers));
          // Update state
          setAllUsers(prev => [...prev, newUser]);
        } catch (error) {
          console.error('Failed to save user:', error);
        }
      }
    }
  };

  // Function to handle user selection and save if new
  const handleUserSelect = (username) => {
    saveNewUser(username);
    onUserSelect(username);
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
          handleUserClick(filteredUsers[selectedSuggestion]);
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

      <div className="container">
        <div style={{maxWidth: '800px', margin: '24px auto', padding: '20px'}}>
          <h1 style={{textAlign: 'left', fontWeight: 600, fontSize: '2rem', marginBottom: '2rem'}}>Send money</h1>
          
          {/* Search Input */}
          <div style={{position: 'relative', marginBottom: '24px', maxWidth: '100%'}}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Name, @username, email address or mobile number"
              style={{
                width: '100%',
                padding: '16px 24px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '30px',
                boxShadow: 'none',
                outline: 'none',
                color: '#666',
                backgroundColor: '#ffffff',
                fontFamily: 'inherit',
                height: '56px',
                boxSizing: 'border-box'
              }}
            />
            <span style={{
              position: 'absolute',
              top: '50%',
              right: '24px',
              transform: 'translateY(-50%)',
              cursor: 'text',
              color: '#999',
              fontSize: '18px'
            }}>|</span>
            
            {/* User Suggestions */}
            {showSuggestions && filteredUsers.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginTop: '8px',
                zIndex: 10,
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {filteredUsers.map((user, index) => (
                  <div 
                    key={user.username}
                    ref={el => suggestionRefs.current[index] = el}
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      backgroundColor: index === selectedSuggestion ? '#f5f7fa' : 'white'
                    }}
                    onClick={() => handleUserClick(user)}
                    onMouseEnter={() => setSelectedSuggestion(index)}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#0070ba',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: '12px'
                    }}>
                      {user.avatar}
                    </div>
                    <div>
                      <div style={{fontWeight: 500}}>{user.username}</div>
                      <div style={{fontSize: '0.85rem', color: '#666'}}>{user.email || 'No email'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Next Button */}
          <button 
            onClick={() => handleUserSelect(searchTerm)}
            disabled={!searchTerm.trim()} // Disable if no text entered
            style={{
              background: searchTerm.trim() ? '#0070ba' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: searchTerm.trim() ? 'pointer' : 'not-allowed',
              marginBottom: '32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
            Next
          </button>
          
          {/* More Ways Section */}
          <div style={{marginTop: '20px'}}>
            <h3 style={{fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px'}}>More ways to send</h3>
            
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px', cursor: 'pointer'}}>
              <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#0A3D80" />
                  <path d="M7 8H17M7 12H17M7 16H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div style={{fontWeight: 600, fontSize: '1rem'}}>Send a bill</div>
                <div style={{color: '#888', fontSize: '0.9rem'}}>Customize, track and send bills.</div>
              </div>
            </div>
            
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px', cursor: 'pointer'}}>
              <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#36B37E" />
                  <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{fontWeight: 600, fontSize: '1rem'}}>Make a group payment</div>
                <div style={{color: '#888', fontSize: '0.9rem'}}>Pay up to 5,000 people at a time, with no monthly fees.</div>
              </div>
            </div>
            
            <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
              <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#DB4D69" />
                  <rect x="8" y="8" width="8" height="8" fill="white" />
                  <path d="M14 10L10 14M10 10L14 14" stroke="#DB4D69" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div style={{fontWeight: 600, fontSize: '1rem'}}>Send and receive gifts</div>
                <div style={{color: '#888', fontSize: '0.9rem'}}>Find help or support others now.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionScreen;
