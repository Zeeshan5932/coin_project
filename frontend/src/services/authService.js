import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authToken = null;
    
    // Listen for auth state changes
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
  }

  /**
   * Sign up with email and password
   */
  async signUp(email, password, fullName) {
    try {
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
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      await signOut(auth);
      console.log('✅ Signed out successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Sign out error:', error);
      throw new Error('Failed to sign out');
    }
  }

  /**
   * Get current user's ID token
   */
  async getIdToken() {
    if (this.currentUser) {
      return await this.currentUser.getIdToken();
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.currentUser;
  }

  /**
   * Get current user info
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Make authenticated API request
   */
  async makeAuthenticatedRequest(url, options = {}) {
    try {
      const token = await this.getIdToken();
      
      if (!token) {
        throw new Error('No authentication token available');
      }
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers
        }
      });
      
      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await this.currentUser.getIdToken(true);
        const retryResponse = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
            ...options.headers
          }
        });
        return retryResponse;
      }
      
      return response;
    } catch (error) {
      console.error('❌ Authenticated request error:', error);
      throw error;
    }
  }

  /**
   * Send money to another user
   */
  async sendMoney(recipientEmail, amount, description = '') {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/users/send-money`,
        {
          method: 'POST',
          body: JSON.stringify({
            recipientEmail,
            amount: parseFloat(amount),
            description
          })
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Transfer failed');
      }
      
      return data;
    } catch (error) {
      console.error('❌ Send money error:', error);
      throw error;
    }
  }

  /**
   * Get user balance
   */
  async getBalance() {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/users/balance`
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get balance');
      }
      
      return data.data;
    } catch (error) {
      console.error('❌ Get balance error:', error);
      throw error;
    }
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(limit = 50) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/users/payment-history?limit=${limit}`
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get payment history');
      }
      
      return data.data;
    } catch (error) {
      console.error('❌ Get payment history error:', error);
      throw error;
    }
  }

  /**
   * Get activity logs
   */
  async getActivityLogs(limit = 50) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/users/activity-logs?limit=${limit}`
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get activity logs');
      }
      
      return data.data;
    } catch (error) {
      console.error('❌ Get activity logs error:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/users/profile`,
        {
          method: 'PUT',
          body: JSON.stringify(profileData)
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      return data;
    } catch (error) {
      console.error('❌ Update profile error:', error);
      throw error;
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      console.log('🔄 Signing in with Google...');
      
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Get ID token
      const idToken = await user.getIdToken();
      
      // Call backend to create/login user in Firestore
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Google login failed');
      }
      
      console.log('✅ Google login successful');
      return {
        success: true,
        user: data.user,
        token: idToken
      };
    } catch (error) {
      console.error('❌ Google login error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  }

  /**
   * Sign in with Facebook
   */
  async signInWithFacebook() {
    try {
      console.log('🔄 Signing in with Facebook...');
      
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Get ID token
      const idToken = await user.getIdToken();
      
      // Call backend to create/login user in Firestore
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Facebook login failed');
      }
      
      console.log('✅ Facebook login successful');
      return {
        success: true,
        user: data.user,
        token: idToken
      };
    } catch (error) {
      console.error('❌ Facebook login error:', error);
      throw new Error(error.message || 'Failed to sign in with Facebook');
    }
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService;
