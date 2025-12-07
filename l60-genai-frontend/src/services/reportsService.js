import axios from 'axios';
import authService from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'https://l60.vercel.app/api';

const reportsService = {
  getReportsData: async () => {
    try {
      const response = await axios.get(`${API_URL}/reports`, {
        headers: authService.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch reports data';
      const err = new Error(errorMessage);
      err.response = error.response;
      throw err;
    }
  }
};

export default reportsService;

