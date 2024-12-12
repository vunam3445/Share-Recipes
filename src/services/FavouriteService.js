import axios from 'axios';

const API_URL = 'http://localhost:8083/foodwed/favourites'; // Endpoint quản lý yêu thích


const FavouriteService = {

  getFavourites: async (userId, token) => {
    if (!userId || !token) {
      console.error('User ID and token are required to fetch favourites.');
      return [];
    }

    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Truyền token vào header
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
   * @param {string} token - Token xác thực của người dùng
   * @returns {Promise<Object>} Đối tượng yêu thích vừa thêm
   */
  addFavourite: async (userId, recipeId, token) => {
    if (!userId || !recipeId || !token) {
      console.error('User ID, Recipe ID, and token are required.');
      throw new Error('User ID, Recipe ID và token không được để trống.');
    }

    try {
      const response = await axios.post(`${API_URL}/add`, { userId, recipeId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Truyền token vào header
        },
      });

      const data = response.data;

      if (data.status === 'success') {
        return data.result;
      } else {
        console.error('Unexpected API response format:', data);
        throw new Error('Có lỗi khi thêm món ăn vào danh sách yêu thích.');
      }
    } catch (error) {
      console.error('Failed to add to favourites:', error);
      throw new Error('Có lỗi khi thêm món ăn vào danh sách yêu thích.');
    }
  },

  /**
   * Xóa một recipe khỏi danh sách yêu thích
   * @param {string} userId - ID người dùng
   * @param {string} recipeId - ID món ăn
   * @param {string} token - Token xác thực của người dùng
   * @returns {Promise<void>} Kết quả xóa
   */
  removeFavourite: async (userId, recipeId, token) => {
    if (!userId || !recipeId || !token) {
      console.error('User ID, Recipe ID, and token are required.');
      throw new Error('User ID, Recipe ID và token không được để trống.');
    }

    try {
      const response = await axios.delete(`${API_URL}/delete/${userId}/${recipeId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Truyền token vào header
        },
      });

      const data = response.data;

      if (data.status === 'success') {
        return;
      } else {
        console.error('Unexpected API response format:', data);
        throw new Error('Có lỗi khi xóa món ăn khỏi danh sách yêu thích.');
      }
    } catch (error) {
      console.error('Failed to remove favourite:', error);
      throw new Error('Có lỗi khi xóa món ăn khỏi danh sách yêu thích.');
    }
  },
};

export default FavouriteService;
