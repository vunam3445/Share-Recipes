// src/services/DetailService.js

import axios from 'axios';

// URL cơ sở cho API
const BASE_URL = 'http://localhost:8083/foodwed/recipe';

const DetailService = {
  /**
   * Lấy thông tin chi tiết của một recipe
   * @param {string} recipeId - ID của recipe cần lấy thông tin
   * @returns {Promise<Object>} Thông tin chi tiết của recipe hoặc null khi lỗi
   */
  getRecipeDetails: async (recipeId) => {
    if (!recipeId) {
      console.error('Recipe ID is required to fetch details.');
      return null;
    }

    const API_URL = `${BASE_URL}/${recipeId}`;

    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { data } = response;

      if (data.status === 'success' && data.result) {
        return data.result; // Trả về thông tin chi tiết của recipe
      } else {
        console.warn('Unexpected API response format:', data);
        return null;
      }
    } catch (error) {
      console.error('Failed to fetch recipe details:', error.message);
      return null;
    }
  },
};

export default DetailService;

