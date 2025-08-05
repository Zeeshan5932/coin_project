// API configuration for development and production
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000/api'
  },
  production: {
    baseURL: '/api'
  }
};

const getApiConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  return API_CONFIG[environment];
};

export const API_BASE_URL = getApiConfig().baseURL;

// API endpoints
export const ENDPOINTS = {
  health: '/health',
  sendMoney: '/send-money',
  requestMoney: '/request-money',
  balance: '/balance',
  transactions: '/transactions'
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
