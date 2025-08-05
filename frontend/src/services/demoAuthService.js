// Demo Auth Service for testing without Firebase
// This simulates Firebase authentication for development

class DemoAuthService {
  constructor() {
    this.currentUser = null;
    this.authToken = null;
    this.users = new Map(); // Simple in-memory user storage
  }

  // Simulate Firebase createUserWithEmailAndPassword
  async signUp(email, password, fullName) {
    try {
      console.log('🔄 Demo: Creating account...');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      if (this.users.has(email)) {
        throw new Error('The email address is already in use by another account.');
      }

      // Create demo user
      const demoUser = {
        uid: `demo-${Date.now()}`,
        email: email,
        displayName: fullName,
        emailVerified: true,
        createdAt: new Date().toISOString()
      };

      this.users.set(email, { ...demoUser, password });
      this.currentUser = demoUser;
      this.authToken = `demo-token-${demoUser.uid}`;

      console.log('✅ Demo: Account created successfully');
      
      return {
        success: true,
        user: demoUser,
        token: this.authToken
      };
    } catch (error) {
      console.error('❌ Demo Signup error:', error);
      throw error;
    }
  }

  // Simulate Firebase signInWithEmailAndPassword
  async signIn(email, password) {
    try {
      console.log('🔄 Demo: Signing in...');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists
      const userData = this.users.get(email);
      if (!userData) {
        throw new Error('There is no user record corresponding to this identifier.');
      }

      // Check password (in real app, this would be hashed)
      if (userData.password !== password) {
        throw new Error('The password is invalid or the user does not have a password.');
      }

      const { password: _, ...user } = userData; // Remove password from response
      this.currentUser = user;
      this.authToken = `demo-token-${user.uid}`;

      console.log('✅ Demo: Login successful');
      
      return {
        success: true,
        user: user,
        token: this.authToken
      };
    } catch (error) {
      console.error('❌ Demo Login error:', error);
      throw error;
    }
  }

  // Simulate Firebase signOut
  async signOut() {
    try {
      console.log('🔄 Demo: Signing out...');
      
      this.currentUser = null;
      this.authToken = null;
      
      console.log('✅ Demo: Signed out successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Demo Signout error:', error);
      throw error;
    }
  }

  // Get current authentication state
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get current token
  getToken() {
    return this.authToken;
  }

  // Simulate onAuthStateChanged listener
  onAuthStateChanged(callback) {
    // Immediately call with current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      console.log('Demo: Auth state listener unsubscribed');
    };
  }
}

// Create singleton instance
const demoAuthService = new DemoAuthService();

// Add some demo users for testing
demoAuthService.users.set('demo@paypal.com', {
  uid: 'demo-user-1',
  email: 'demo@paypal.com',
  displayName: 'Demo User',
  emailVerified: true,
  createdAt: new Date().toISOString(),
  password: 'password'
});

demoAuthService.users.set('john.doe@email.com', {
  uid: 'demo-user-2',
  email: 'john.doe@email.com',
  displayName: 'John Doe',
  emailVerified: true,
  createdAt: new Date().toISOString(),
  password: 'password'
});

export default demoAuthService;
