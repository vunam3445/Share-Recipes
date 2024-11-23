// src/services/SuggestionService.js

import axios from 'axios';

const API_URL = 'http://localhost:8083/foodwed/suggestion/08361f4f-8ac2-471c-adbd-e1c8affc4f56';

const SuggestionService = {
  getSuggestions: async () => {
    try {
      const response = await axios.get(API_URL, {
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
