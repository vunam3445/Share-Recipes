// src/services/SuggestionService.js

import axios from 'axios';

const API_URL = 'http://localhost:8083/foodwed/suggestion';

const SuggestionService = {
  getSuggestions: async (recipeid) => {
    try {
      const response = await axios.get(`${API_URL}/${recipeid}`, {
        headers: {
          'Content-Type': 'application/json', // Đặt Content-Type nếu cần thiết
        },
      });

      const data = response.data;

      if (data.status === 'success' && data.result) {
        return data.result;
      } else {
        console.error('Unexpected API response format:', data);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      return [];
    }
  },
};

export default SuggestionService;
