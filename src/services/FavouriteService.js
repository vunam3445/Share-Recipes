import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083/foodwed/favourites';

const FavouriteService = {
    // Lấy danh sách yêu thích của người dùng
    getUserFavourites: async (userId, token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error("Error fetching user favourites:", error);
            throw error; // Ném lỗi ra ngoài để xử lý tiếp
        }
    },

    // Thêm một mục vào danh sách yêu thích
    addFavourite: async (userId, recipeId, token) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/add`,
                null, // Không có body nên gửi null
                {
                    params: { recipeId, userId }, // Tham số truy vấn
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error("Error adding favourite:", error);
            throw error; // Ném lỗi ra ngoài để xử lý tiếp
        }
    },

    // Xóa một mục khỏi danh sách yêu thích
    deleteFavourite: async (userId, recipeId, token) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/delete/${userId}/${recipeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error("Error deleting favourite:", error);
            throw error;
        }
    },
};

export default FavouriteService;
