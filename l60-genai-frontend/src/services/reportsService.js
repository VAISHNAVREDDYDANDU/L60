import axios from 'axios';
import authService from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const reportsService = {
  getReportsData: async () => {
    try {
      const response = await axios.get(`${API_URL}/reports`, {
        headers: authService.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch reports data' };
    }
  }
};

export default reportsService;

