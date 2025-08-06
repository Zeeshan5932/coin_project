import React, { useState } from 'react';
import './App.css';
import RecipientForm from './components/RecipientForm';
import UserSelectionScreen from './components/UserSelectionScreen';
import LoadingSpinner from './components/LoadingSpinner';
import SuccessScreen from './components/SuccessScreen';
import PaymentHistoryScreen from './components/PaymentHistoryScreen';

function App() {
  const [currentStep, setCurrentStep] = useState('userSelection');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [paymentData, setPaymentData] = useState({
    recipient: '',
    amount: '',
    paymentReason: ''
  });

  // Transaction history state
  const [transactionHistory, setTransactionHistory] = useState([
    { 
      id: '1', 
      recipient: '@gabrielebrezins', 
      amount: '300,00 EUR', 
      date: 'August 2, 2025',
      status: 'Completed'
    },
    { 
      id: '2', 
      recipient: '@zeeshan', 
      amount: '150,00 EUR', 
      date: 'July 30, 2025',
      status: 'Completed'
    }
  ]);

  const handleRecipientSubmit = (data) => {
    console.log('Payment submitted:', data);
    setPaymentData(data);
    
    // Show loading screen
    setCurrentStep('loading');
    
    // Simulate payment processing
    setTimeout(() => {
      // Add new transaction to history
      const newTransaction = {
        id: Date.now().toString(),
        recipient: data.recipient,
        amount: data.amount + ' EUR',
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        status: 'Completed'
      };
      
      setTransactionHistory(prev => [newTransaction, ...prev]);
      setCurrentStep('success');
    }, 4000); // 3 seconds loading time
  };

  const handleUserSelection = (user) => {
    setSelectedRecipient(user.username || user);
    setCurrentStep('recipient');
  };

  const handleSendMore = () => {
    setCurrentStep('userSelection');
    setSelectedRecipient('');
    setPaymentData({ recipient: '', amount: '', paymentReason: '' });
  };

  const handleGoHome = () => {
    setCurrentStep('home');
    setSelectedRecipient('');
    setPaymentData({ recipient: '', amount: '', paymentReason: '' });
  };

  const handleSendMoney = () => {
    setCurrentStep('userSelection');
  };

  return (
    <div className="App">
      {currentStep === 'home' && (
        <PaymentHistoryScreen 
          paymentHistory={transactionHistory}
          onSendMoney={handleSendMoney}
        />
      )}
      
      {currentStep === 'userSelection' && (
        <UserSelectionScreen onUserSelect={handleUserSelection} />
      )}
      
      {currentStep === 'recipient' && (
        <RecipientForm
          initialRecipient={selectedRecipient}
          onRecipientSubmit={handleRecipientSubmit}
        />
      )}
      
      {currentStep === 'loading' && (
        <LoadingSpinner />
      )}
      
      {currentStep === 'success' && (
        <SuccessScreen 
          transactionData={paymentData}
          onSendMore={handleSendMore}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}

export default App;
