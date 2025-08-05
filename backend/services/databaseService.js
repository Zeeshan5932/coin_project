const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

// Collections
const USERS_COLLECTION = 'users';
const TRANSACTIONS_COLLECTION = 'transactions';
const PAYMENT_REQUESTS_COLLECTION = 'paymentRequests';

// User operations
const userService = {
  async createUser(userData) {
    try {
      const userId = uuidv4();
      const user = {
        id: userId,
        ...userData,
        balance: 1000.00, // Starting balance
        createdAt: new Date().toISOString()
      };
      
      await db.collection(USERS_COLLECTION).doc(userId).set(user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getUserByEmail(email) {
    try {
      const snapshot = await db.collection(USERS_COLLECTION)
        .where('email', '==', email)
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        return null;
      }
      
      return snapshot.docs[0].data();
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const doc = await db.collection(USERS_COLLECTION).doc(userId).get();
      
      if (!doc.exists) {
        return null;
      }
      
      return doc.data();
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  },

  async updateUserBalance(userId, newBalance) {
    try {
      await db.collection(USERS_COLLECTION).doc(userId).update({
        balance: newBalance
      });
    } catch (error) {
      console.error('Error updating user balance:', error);
      throw error;
    }
  }
};

// Transaction operations
const transactionService = {
  async createTransaction(transactionData) {
    try {
      const transactionId = uuidv4();
      const transaction = {
        id: transactionId,
        ...transactionData,
        date: new Date().toISOString(),
        status: 'completed'
      };
      
      await db.collection(TRANSACTIONS_COLLECTION).doc(transactionId).set(transaction);
      return transaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  async getUserTransactions(userId) {
    try {
      const snapshot = await db.collection(TRANSACTIONS_COLLECTION)
        .where('userId', '==', userId)
        .orderBy('date', 'desc')
        .get();
      
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting user transactions:', error);
      throw error;
    }
  },

  async getTransactionById(transactionId, userId) {
    try {
      const doc = await db.collection(TRANSACTIONS_COLLECTION).doc(transactionId).get();
      
      if (!doc.exists) {
        return null;
      }
      
      const transaction = doc.data();
      
      // Verify the transaction belongs to the user
      if (transaction.userId !== userId) {
        return null;
      }
      
      return transaction;
    } catch (error) {
      console.error('Error getting transaction by ID:', error);
      throw error;
    }
  }
};

// Payment request operations
const paymentRequestService = {
  async createPaymentRequest(requestData) {
    try {
      const requestId = uuidv4();
      const paymentRequest = {
        id: requestId,
        ...requestData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      await db.collection(PAYMENT_REQUESTS_COLLECTION).doc(requestId).set(paymentRequest);
      return paymentRequest;
    } catch (error) {
      console.error('Error creating payment request:', error);
      throw error;
    }
  },

  async getReceivedRequests(userEmail) {
    try {
      const snapshot = await db.collection(PAYMENT_REQUESTS_COLLECTION)
        .where('fromEmail', '==', userEmail)
        .orderBy('createdAt', 'desc')
        .get();
      
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting received requests:', error);
      throw error;
    }
  },

  async getSentRequests(requesterId) {
    try {
      const snapshot = await db.collection(PAYMENT_REQUESTS_COLLECTION)
        .where('requesterId', '==', requesterId)
        .orderBy('createdAt', 'desc')
        .get();
      
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting sent requests:', error);
      throw error;
    }
  },

  async getPaymentRequestById(requestId) {
    try {
      const doc = await db.collection(PAYMENT_REQUESTS_COLLECTION).doc(requestId).get();
      
      if (!doc.exists) {
        return null;
      }
      
      return doc.data();
    } catch (error) {
      console.error('Error getting payment request by ID:', error);
      throw error;
    }
  },

  async updatePaymentRequestStatus(requestId, status, paidAt = null) {
    try {
      const updateData = { status };
      if (paidAt) {
        updateData.paidAt = paidAt;
      }
      
      await db.collection(PAYMENT_REQUESTS_COLLECTION).doc(requestId).update(updateData);
    } catch (error) {
      console.error('Error updating payment request status:', error);
      throw error;
    }
  }
};

// Database initialization with sample data
const initializeDatabase = async () => {
  try {
    // Check if sample user already exists
    const existingUser = await userService.getUserByEmail('john.doe@email.com');
    
    if (!existingUser) {
      console.log('Initializing database with sample data...');
      
      // Create sample user
      const sampleUser = await userService.createUser({
        email: 'john.doe@email.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        name: 'John Doe'
      });

      console.log('Database initialized successfully!');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

module.exports = {
  userService,
  transactionService,
  paymentRequestService,
  initializeDatabase
};
