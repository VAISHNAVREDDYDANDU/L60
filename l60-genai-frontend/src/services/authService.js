import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://l60.vercel.app/api';

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        username,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getAuthHeaders: () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
};

export default authService;

