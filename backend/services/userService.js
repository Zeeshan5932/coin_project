const { db, auth } = require('../config/firebase');
const { FieldValue } = require('firebase-admin/firestore');

class UserService {
  constructor() {
    this.usersCollection = 'users';
  }

  /**
   * Create a new user with complete profile data
   */
  async createUser(authUid, userData) {
    try {
      const now = new Date().toISOString();
      
      const userDoc = {
        // Basic Information
        uid: authUid,
        fullName: userData.fullName || userData.displayName || 'User',
        email: userData.email,
        profileImage: userData.profileImage || userData.photoURL || '',
        
        // Account Details
        accountCreatedAt: now,
        lastLoginAt: now,
        
        // Financial Information
        balance: userData.initialBalance || 19725736.00, // Default PayPal balance
        totalAmountSent: 0,
        totalAmountReceived: 0,
        transactionCount: 0,
        
        // Security
        twoFactorEnabled: false,
        emailVerified: userData.emailVerified || false,
        
        // Activity Tracking
        activityLogs: [{
          type: 'ACCOUNT_CREATED',
          timestamp: now,
          details: {
            message: 'Account successfully created',
            ipAddress: userData.ipAddress || 'unknown',
            userAgent: userData.userAgent || 'unknown'
          }
        }],
        
        // Payment History
        paymentHistory: [],
        
        // Profile Settings
        currency: 'EUR',
        language: 'en',
        timezone: userData.timezone || 'UTC',
        
        // Status
        accountStatus: 'active',
        isVerified: false,
        
        // Timestamps
        createdAt: now,
        updatedAt: now
      };

      await db.collection(this.usersCollection).doc(authUid).set(userDoc);
      
      console.log(`✅ User created successfully: ${userData.email}`);
      return userDoc;
    } catch (error) {
      console.error('❌ Error creating user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Get user by authentication UID
   */
  async getUserByUid(uid) {
    try {
      const doc = await db.collection(this.usersCollection).doc(uid).get();
      
      if (!doc.exists) {
        return null;
      }
      
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('❌ Error getting user by UID:', error);
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email) {
    try {
      const snapshot = await db.collection(this.usersCollection)
        .where('email', '==', email)
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        return null;
      }
      
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    } catch (error) {
      console.error('❌ Error getting user by email:', error);
      throw new Error(`Failed to get user by email: ${error.message}`);
    }
  }

  /**
   * Update last login time and log activity
   */
  async updateLastLogin(uid, loginData = {}) {
    try {
      const now = new Date().toISOString();
      
      const updateData = {
        lastLoginAt: now,
        updatedAt: now,
        activityLogs: FieldValue.arrayUnion({
          type: 'LOGIN',
          timestamp: now,
          details: {
            message: 'User logged in',
            ipAddress: loginData.ipAddress || 'unknown',
            userAgent: loginData.userAgent || 'unknown',
            loginMethod: loginData.method || 'email'
          }
        })
      };

      await db.collection(this.usersCollection).doc(uid).update(updateData);
      
      console.log(`✅ Login updated for user: ${uid}`);
      return true;
    } catch (error) {
      console.error('❌ Error updating login:', error);
      throw new Error(`Failed to update login: ${error.message}`);
    }
  }

  /**
   * Update user profile and log activity
   */
  async updateProfile(uid, profileData, activityDetails = {}) {
    try {
      const now = new Date().toISOString();
      
      const updateData = {
        ...profileData,
        updatedAt: now,
        activityLogs: FieldValue.arrayUnion({
          type: 'PROFILE_UPDATED',
          timestamp: now,
          details: {
            message: 'Profile information updated',
            changedFields: Object.keys(profileData),
            ...activityDetails
          }
        })
      };

      await db.collection(this.usersCollection).doc(uid).update(updateData);
      
      console.log(`✅ Profile updated for user: ${uid}`);
      return true;
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }

  /**
   * Process money transfer (send/receive)
   */
  async processMoneyTransfer(senderUid, recipientUid, amount, transferData = {}) {
    const batch = db.batch();
    const now = new Date().toISOString();
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Get both users
      const [senderDoc, recipientDoc] = await Promise.all([
        db.collection(this.usersCollection).doc(senderUid).get(),
        db.collection(this.usersCollection).doc(recipientUid).get()
      ]);

      if (!senderDoc.exists || !recipientDoc.exists) {
        throw new Error('One or both users not found');
      }

      const senderData = senderDoc.data();
      const recipientData = recipientDoc.data();

      // Check sufficient balance
      if (senderData.balance < amount) {
        throw new Error('Insufficient balance');
      }

      // Prepare transaction record
      const transactionRecord = {
        id: transactionId,
        type: 'MONEY_SENT',
        recipient: recipientData.fullName,
        recipientEmail: recipientData.email,
        amount: amount,
        currency: 'EUR',
        status: 'completed',
        timestamp: now,
        description: transferData.description || `Money sent to ${recipientData.fullName}`,
        ...transferData
      };

      const receiveRecord = {
        id: transactionId,
        type: 'MONEY_RECEIVED',
        sender: senderData.fullName,
        senderEmail: senderData.email,
        amount: amount,
        currency: 'EUR',
        status: 'completed',
        timestamp: now,
        description: transferData.description || `Money received from ${senderData.fullName}`,
        ...transferData
      };

      // Update sender
      const senderUpdateData = {
        balance: senderData.balance - amount,
        totalAmountSent: (senderData.totalAmountSent || 0) + amount,
        transactionCount: (senderData.transactionCount || 0) + 1,
        updatedAt: now,
        activityLogs: FieldValue.arrayUnion({
          type: 'MONEY_SENT',
          timestamp: now,
          details: {
            message: `Sent €${amount.toFixed(2)} to ${recipientData.fullName}`,
            transactionId: transactionId,
            recipient: recipientData.fullName,
            amount: amount,
            newBalance: senderData.balance - amount
          }
        }),
        paymentHistory: FieldValue.arrayUnion(transactionRecord)
      };

      // Update recipient
      const recipientUpdateData = {
        balance: recipientData.balance + amount,
        totalAmountReceived: (recipientData.totalAmountReceived || 0) + amount,
        transactionCount: (recipientData.transactionCount || 0) + 1,
        updatedAt: now,
        activityLogs: FieldValue.arrayUnion({
          type: 'MONEY_RECEIVED',
          timestamp: now,
          details: {
            message: `Received €${amount.toFixed(2)} from ${senderData.fullName}`,
            transactionId: transactionId,
            sender: senderData.fullName,
            amount: amount,
            newBalance: recipientData.balance + amount
          }
        }),
        paymentHistory: FieldValue.arrayUnion(receiveRecord)
      };

      // Execute batch update
      batch.update(db.collection(this.usersCollection).doc(senderUid), senderUpdateData);
      batch.update(db.collection(this.usersCollection).doc(recipientUid), recipientUpdateData);

      await batch.commit();
      
      console.log(`✅ Money transfer completed: ${senderData.fullName} → ${recipientData.fullName} (€${amount})`);
      
      return {
        transactionId,
        senderNewBalance: senderData.balance - amount,
        recipientNewBalance: recipientData.balance + amount,
        transaction: transactionRecord
      };
    } catch (error) {
      console.error('❌ Error processing money transfer:', error);
      throw new Error(`Failed to process transfer: ${error.message}`);
    }
  }

  /**
   * Log general user activity
   */
  async logActivity(uid, activityType, details = {}) {
    try {
      const now = new Date().toISOString();
      
      const activityLog = {
        type: activityType,
        timestamp: now,
        details: {
          message: details.message || `User performed ${activityType}`,
          ...details
        }
      };

      await db.collection(this.usersCollection).doc(uid).update({
        activityLogs: FieldValue.arrayUnion(activityLog),
        updatedAt: now
      });
      
      console.log(`✅ Activity logged for user ${uid}: ${activityType}`);
      return true;
    } catch (error) {
      console.error('❌ Error logging activity:', error);
      throw new Error(`Failed to log activity: ${error.message}`);
    }
  }

  /**
   * Enable/Disable 2FA
   */
  async update2FA(uid, enabled, details = {}) {
    try {
      const now = new Date().toISOString();
      
      await db.collection(this.usersCollection).doc(uid).update({
        twoFactorEnabled: enabled,
        updatedAt: now,
        activityLogs: FieldValue.arrayUnion({
          type: enabled ? '2FA_ENABLED' : '2FA_DISABLED',
          timestamp: now,
          details: {
            message: `Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`,
            ...details
          }
        })
      });
      
      console.log(`✅ 2FA ${enabled ? 'enabled' : 'disabled'} for user: ${uid}`);
      return true;
    } catch (error) {
      console.error('❌ Error updating 2FA:', error);
      throw new Error(`Failed to update 2FA: ${error.message}`);
    }
  }

  /**
   * Get user's activity logs with pagination
   */
  async getActivityLogs(uid, limit = 50, startAfter = null) {
    try {
      const userDoc = await this.getUserByUid(uid);
      if (!userDoc) {
        throw new Error('User not found');
      }

      // Return recent activity logs (Firestore arrays are limited, 
      // for production you'd want a separate activityLogs collection)
      const activityLogs = userDoc.activityLogs || [];
      return activityLogs
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);
    } catch (error) {
      console.error('❌ Error getting activity logs:', error);
      throw new Error(`Failed to get activity logs: ${error.message}`);
    }
  }

  /**
   * Get user's payment history with pagination
   */
  async getPaymentHistory(uid, limit = 50, startAfter = null) {
    try {
      const userDoc = await this.getUserByUid(uid);
      if (!userDoc) {
        throw new Error('User not found');
      }

      const paymentHistory = userDoc.paymentHistory || [];
      return paymentHistory
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);
    } catch (error) {
      console.error('❌ Error getting payment history:', error);
      throw new Error(`Failed to get payment history: ${error.message}`);
    }
  }
}

module.exports = new UserService();
