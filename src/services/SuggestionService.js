// src/services/SuggestionService.js

import axios from 'axios';

const API_URL = 'http://localhost:8083/foodwed/suggestion';

const SuggestionService = {
  getSuggestions: async (recipeId) => {
    try {
      const response = await axios.get(`${API_URL}/${recipeId}`);

      const data = response.data;
      console.log(data)

      if (data.status === 'success' && data.result) {
        console.log(data.result)
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
