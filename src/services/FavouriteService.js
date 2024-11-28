import axios from 'axios';

const API_URL = 'http://localhost:8083/foodwed/favourites'; // Endpoint quản lý yêu thích

const FavouriteService = {
  /**
   * Lấy danh sách yêu thích của người dùng
   * @param {string} userId - ID người dùng
   * @returns {Promise<Array>} Danh sách yêu thích hoặc mảng rỗng nếu có lỗi
   */
  getFavourites: async (userId) => {
    if (!userId) {
      console.error('User ID is required to fetch favourites.');
      return [];
    }

    try {
      const response = await axios.get(`${API_URL}/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
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
      console.error('Failed to fetch favourites:', error);
      return [];
    }
  },

  /**
   * Thêm một recipe vào danh sách yêu thích
   * @param {string} userId - ID người dùng
   * @param {string} recipeId - ID món ăn
   * @returns {Promise<Object>} Đối tượng yêu thích vừa thêm
   */
  addFavourite: async (userId, recipeId) => {
    try {
      const response = await axios.post(API_URL, { userId, recipeId });
      return response.data;
    } catch (error) {
      console.error('Failed to add to favourites:', error);
      throw new Error('Có lỗi khi thêm món ăn vào danh sách yêu thích.');
    }
  },

  /**
   * Xóa một recipe khỏi danh sách yêu thích
   * @param {string} favouriteId - ID của mục yêu thích
   * @returns {Promise<void>} Kết quả xóa
   */
  removeFavourite: async (favouriteId) => {
    try {
      await axios.delete(`${API_URL}/${favouriteId}`);
    } catch (error) {
      console.error('Failed to remove favourite:', error);
      throw new Error('Có lỗi khi xóa món ăn khỏi danh sách yêu thích.');
    }
  },
};

export default FavouriteService;
