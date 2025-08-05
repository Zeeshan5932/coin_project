import demoAuthService from './demoAuthService';

// Check if we're in demo mode (when Firebase config is demo)
const isDemoMode = () => {
  return process.env.REACT_APP_FIREBASE_PROJECT_ID === 'demo-project' || 
         process.env.REACT_APP_FIREBASE_API_KEY === 'demo-api-key';
};

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authToken = null;
    
    // Use demo mode if Firebase is not properly configured
    if (isDemoMode()) {
      console.log('🎭 Using Demo Auth Service for testing');
      // Return the demo service directly
      return demoAuthService;
    }
    
    // Try to load Firebase (will be used when you set up real Firebase)
    try {
      const { auth } = require('../config/firebase');
      const { onAuthStateChanged } = require('firebase/auth');
      
      // Listen for auth state changes (real Firebase)
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = user;
          this.authToken = await user.getIdToken();
          console.log('✅ User authenticated:', user.email);
        } else {
          this.currentUser = null;
          this.authToken = null;
          console.log('❌ User signed out');
        }
      });
    } catch (error) {
      console.warn('⚠️ Firebase not available, using demo mode:', error.message);
      return demoAuthService;
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(email, password, fullName) {
    try {
      // Use demo service in demo mode
      if (isDemoMode()) {
        return await demoAuthService.signUp(email, password, fullName);
      }

      // Real Firebase implementation would go here
      const { createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
      const { auth } = require('../config/firebase');
      
      console.log('🔄 Creating account...');
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with full name
      await updateProfile(user, {
        displayName: fullName
      });
      
      // Get ID token
      const idToken = await user.getIdToken();
      
      // Call backend to create user in Firestore
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: fullName,
          idToken
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      console.log('✅ Account created successfully');
      return {
        success: true,
        user: data.user,
        token: idToken
      };
    } catch (error) {
      console.error('❌ Signup error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email, password) {
    try {
      // Use demo service in demo mode
      if (isDemoMode()) {
        return await demoAuthService.signIn(email, password);
      }

      // Real Firebase implementation would go here
      const { signInWithEmailAndPassword } = require('firebase/auth');
      const { auth } = require('../config/firebase');
      
      console.log('🔄 Signing in...');
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get ID token
      const idToken = await user.getIdToken();
      
      // Call backend to sync user data
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      console.log('✅ Login successful');
      return {
        success: true,
        user: data.user,
        token: idToken
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      // Use demo service in demo mode
      if (isDemoMode()) {
        return await demoAuthService.signOut();
      }

      // Real Firebase implementation would go here
      const { signOut } = require('firebase/auth');
      const { auth } = require('../config/firebase');
      
      console.log('🔄 Signing out...');
      await signOut(auth);
      console.log('✅ Signed out successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Signout error:', error);
      throw new Error(error.message || 'Signout failed');
    }
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    if (isDemoMode()) {
      return demoAuthService.getCurrentUser();
    }
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    if (isDemoMode()) {
      return demoAuthService.isAuthenticated();
    }
    return !!this.currentUser;
  }

  /**
   * Get authentication token
   */
  getToken() {
    if (isDemoMode()) {
      return demoAuthService.getToken();
    }
    return this.authToken;
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
