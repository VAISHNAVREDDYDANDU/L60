import axios from 'axios';
import authService from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const summaryService = {
  getSummaryData: async () => {
    try {
      const response = await axios.get(`${API_URL}/summary`, {
        headers: authService.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch summary data';
      const err = new Error(errorMessage);
      err.response = error.response;
      throw err;
    }
  }
};

export default summaryService;

