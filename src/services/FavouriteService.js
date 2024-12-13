import axios from 'axios';
import { getUserFromToken } from "../components/readtoken";

const API_URL = 'http://localhost:8083/foodwed/favourites';

/**
 * Hàm tiện ích để lấy token từ localStorage
 * @returns {string|null} Token hoặc null nếu không tồn tại
 */
const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Hàm tiện ích để lấy userId từ token
 * @returns {string|null} UserId hoặc null nếu không thể giải mã
 */
const getUserId = () => {
  const token = getToken();
  if (token) {
    const decoder = getUserFromToken(token); // Cần phải pass token vào getUserFromToken
    return decoder?.userid || null; // Trả về userId nếu tồn tại
  }
  return null;
};

const FavouriteService = {
  /**
   * Lấy danh sách yêu thích của người dùng
   * @returns {Promise<Array>} Danh sách yêu thích hoặc mảng rỗng nếu có lỗi
   */
  getFavourites: async (userId, token) => {
    if (!userId || !token) {
      console.error('User ID and token are required to fetch favourites.');
      return [];
    }
  
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const data = response.data;
      
  
      if (data.status === 'success' && data.result) {
        console.log(data.result)
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
   * @returns {Promise<Object>} Đối tượng yêu thích vừa thêm
   */
  addFavourite: async (recipeId) => {
    const token = getToken();
    const userId = getUserId();

    if (!userId || !recipeId || !token) {
      console.error('User ID, Recipe ID, and token are required.');
      throw new Error('User ID, Recipe ID và token không được để trống.');
    }

    try {
      const response = await axios.post(
        `${API_URL}/add`, 
        {}, // Không gửi dữ liệu trong body
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          params: {
            recipeId, // Truyền `recipeId` dưới dạng query parameter
            userId,   // Truyền `userId` dưới dạng query parameter
          },
        }
      );

      const data = response.data;
      console.log("service", data)
      if (data) {
        return data;
      } else {
        console.error('Unexpected API response format:', data);
        
      }
    } catch (error) {
      console.error('Failed to add to favourites:', error);
      
    }
  },
  isExit: async (recipeId) => {
    const token = getToken();
    const userId = getUserId();

    if (!userId || !recipeId || !token) {
      return
    }

    try {
      const response = await axios.post(
        `${API_URL}/isExits`, 
        {}, // Không gửi dữ liệu trong body
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          params: {
            recipeId, // Truyền `recipeId` dưới dạng query parameter
            userId,   // Truyền `userId` dưới dạng query parameter
          },
        }
      );

      
      if (response.data) {
        return true;
      } else {
        return false;
        
      }
    } catch (error) {
      console.error('Failed to add to favourites:', error);
      
    }
  },
  /**
   * Xóa một recipe khỏi danh sách yêu thích
   * @param {string} recipeId - ID món ăn
   * @returns {Promise<void>} Kết quả xóa
   */
  removeFavourite: async (recipeId) => {
    const token = getToken();
    const userId = getUserId();

    if (!userId || !recipeId || !token) {
      console.error('User ID, Recipe ID, and token are required.');
      throw new Error('User ID, Recipe ID và token không được để trống.');
    }

    try {
      const response = await axios.delete(`${API_URL}/delete`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: {
          userId,
          recipeId, 
             
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
