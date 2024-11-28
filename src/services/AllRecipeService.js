import axios from "axios";

const API_URL = "http://localhost:8083/foodwed/recipe/recipeAll";

const AllRecipeService = {
  /**
   * Fetch recipes from API
   * @param {number} page - Page number (starts from 0)
   * @param {number} size - Number of items per page
   * @returns {Promise<Object>} API response data
   */
  getRecipes: async (page = 0, size = 9) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          page: page,
          size: size,
        },
      });

      // Log toàn bộ phản hồi để debug
      console.log("API Response:", response.data);

      if (response.data?.result) {
        return response.data.result;
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      throw new Error("Failed to fetch recipes");
    }
  },
};

export default AllRecipeService;
