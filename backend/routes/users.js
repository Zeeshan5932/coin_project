const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { authenticateUser, ensureUserExists, validateRequest, rateLimit } = require('../middleware/auth');
const Joi = require('joi');

// Apply authentication middleware to all routes
router.use(authenticateUser);
router.use(ensureUserExists);

/**
 * GET /api/users/profile
 * Get current user's profile
 */
router.get('/profile', async (req, res) => {
  try {
    const user = req.userData;
    
    // Remove sensitive data before sending
    const { activityLogs, ...userProfile } = user;
    
    res.json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get user profile'
    });
  }
});

/**
 * PUT /api/users/profile
 * Update user profile
 */
const updateProfileSchema = Joi.object({
  fullName: Joi.string().min(2).max(100),
  profileImage: Joi.string().uri().allow(''),
  language: Joi.string().valid('en', 'es', 'fr', 'de'),
  timezone: Joi.string(),
  currency: Joi.string().valid('EUR', 'USD', 'GBP')
});

router.put('/profile', 
  validateRequest(updateProfileSchema),
  rateLimit(5, 300000), // 5 requests per 5 minutes
  async (req, res) => {
    try {
      const updateData = req.body;
      
      await userService.updateProfile(req.uid, updateData, {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      // Get updated user data
      const updatedUser = await userService.getUserByUid(req.uid);
      const { activityLogs, ...userProfile } = updatedUser;
      
      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: userProfile
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }
);

/**
 * POST /api/users/send-money
 * Send money to another user
 */
const sendMoneySchema = Joi.object({
  recipientEmail: Joi.string().email().required(),
  amount: Joi.number().positive().precision(2).required(),
  description: Joi.string().max(200).allow(''),
  reference: Joi.string().max(50).allow('')
});

router.post('/send-money',
  validateRequest(sendMoneySchema),
  rateLimit(10, 600000), // 10 transactions per 10 minutes
  async (req, res) => {
    try {
      const { recipientEmail, amount, description, reference } = req.body;
      
      // Find recipient by email
      const recipient = await userService.getUserByEmail(recipientEmail);
      if (!recipient) {
        return res.status(404).json({
          error: 'User Not Found',
          message: 'Recipient user not found'
        });
      }
      
      // Process the transfer
      const result = await userService.processMoneyTransfer(
        req.uid,
        recipient.uid,
        amount,
        { description, reference }
      );
      
      res.json({
        success: true,
        message: `Successfully sent €${amount.toFixed(2)} to ${recipient.fullName}`,
        data: {
          transactionId: result.transactionId,
          newBalance: result.senderNewBalance,
          recipient: {
            name: recipient.fullName,
            email: recipient.email
          },
          amount: amount,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error sending money:', error);
      res.status(400).json({
        error: 'Transaction Failed',
        message: error.message
      });
    }
  }
);

/**
 * GET /api/users/balance
 * Get current user's balance
 */
router.get('/balance', async (req, res) => {
  try {
    const user = await userService.getUserByUid(req.uid);
    
    res.json({
      success: true,
      data: {
        balance: user.balance,
        currency: user.currency || 'EUR',
        totalSent: user.totalAmountSent || 0,
        totalReceived: user.totalAmountReceived || 0,
        transactionCount: user.transactionCount || 0
      }
    });
  } catch (error) {
    console.error('Error getting balance:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get balance'
    });
  }
});

/**
 * GET /api/users/activity-logs
 * Get user's activity logs
 */
router.get('/activity-logs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const activityLogs = await userService.getActivityLogs(req.uid, limit);
    
    res.json({
      success: true,
      data: {
        logs: activityLogs,
        total: activityLogs.length
      }
    });
  } catch (error) {
    console.error('Error getting activity logs:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get activity logs'
    });
  }
});

/**
 * GET /api/users/payment-history
 * Get user's payment history
 */
router.get('/payment-history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const paymentHistory = await userService.getPaymentHistory(req.uid, limit);
    
    res.json({
      success: true,
      data: {
        transactions: paymentHistory,
        total: paymentHistory.length
      }
    });
  } catch (error) {
    console.error('Error getting payment history:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get payment history'
    });
  }
});

/**
 * POST /api/users/enable-2fa
 * Enable two-factor authentication
 */
router.post('/enable-2fa',
  rateLimit(3, 300000), // 3 attempts per 5 minutes
  async (req, res) => {
    try {
      await userService.update2FA(req.uid, true, {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      res.json({
        success: true,
        message: 'Two-factor authentication enabled successfully'
      });
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to enable 2FA'
      });
    }
  }
);

/**
 * POST /api/users/disable-2fa
 * Disable two-factor authentication
 */
router.post('/disable-2fa',
  rateLimit(3, 300000), // 3 attempts per 5 minutes
  async (req, res) => {
    try {
      await userService.update2FA(req.uid, false, {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      res.json({
        success: true,
        message: 'Two-factor authentication disabled successfully'
      });
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to disable 2FA'
      });
    }
  }
);

/**
 * POST /api/users/log-activity
 * Log custom user activity
 */
const logActivitySchema = Joi.object({
  type: Joi.string().required(),
  message: Joi.string().max(200),
  metadata: Joi.object()
});

router.post('/log-activity',
  validateRequest(logActivitySchema),
  async (req, res) => {
    try {
      const { type, message, metadata } = req.body;
      
      await userService.logActivity(req.uid, type, {
        message,
        ...metadata,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      res.json({
        success: true,
        message: 'Activity logged successfully'
      });
    } catch (error) {
      console.error('Error logging activity:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to log activity'
      });
    }
  }
);

module.exports = router;
