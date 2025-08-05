const { auth } = require('../config/firebase');
const userService = require('../services/userService');

/**
 * Middleware to verify Firebase authentication token
 */
async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'No valid authentication token provided' 
      });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    req.uid = decodedToken.uid;
    
    // Log authentication activity
    await userService.logActivity(req.uid, 'API_ACCESS', {
      endpoint: req.path,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Invalid or expired authentication token' 
    });
  }
}

/**
 * Middleware to ensure user exists in Firestore
 */
async function ensureUserExists(req, res, next) {
  try {
    let user = await userService.getUserByUid(req.uid);
    
    // If user doesn't exist in Firestore, create them
    if (!user) {
      console.log(`Creating Firestore user document for UID: ${req.uid}`);
      
      // Get user data from Firebase Auth
      const authUser = await auth.getUser(req.uid);
      
      const userData = {
        fullName: authUser.displayName || 'User',
        email: authUser.email,
        profileImage: authUser.photoURL || '',
        emailVerified: authUser.emailVerified,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      };
      
      user = await userService.createUser(req.uid, userData);
    } else {
      // Update last login
      await userService.updateLastLogin(req.uid, {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        method: 'api'
      });
    }
    
    req.userData = user;
    next();
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'Failed to initialize user data' 
    });
  }
}

/**
 * Middleware to validate request data
 */
function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details[0].message
      });
    }
    next();
  };
}

/**
 * Middleware to rate limit sensitive operations
 */
function rateLimit(maxRequests = 10, windowMs = 60000) {
  const requests = new Map();
  
  return (req, res, next) => {
    const key = `${req.uid}_${req.path}`;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get user's request history
    let userRequests = requests.get(key) || [];
    
    // Filter out old requests
    userRequests = userRequests.filter(time => time > windowStart);
    
    if (userRequests.length >= maxRequests) {
      return res.status(429).json({
        error: 'Rate Limit Exceeded',
        message: `Too many requests. Try again in ${Math.ceil(windowMs / 1000)} seconds.`
      });
    }
    
    // Add current request
    userRequests.push(now);
    requests.set(key, userRequests);
    
    next();
  };
}

module.exports = {
  authenticateUser,
  ensureUserExists,
  validateRequest,
  rateLimit
};
