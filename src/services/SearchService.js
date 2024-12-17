import axios from 'axios';

const searchRecipes = async (query, categoryId = '') => {
  try {
    // Tạo URL API để gửi yêu cầu
    const url = categoryId
      ? `http://localhost:8083/foodwed/search?name=${query}&categoryId=${categoryId}`
      : `http://localhost:8083/foodwed/search?name=${query}`;

    // Gọi API với axios
    const response = await axios.get(url);

    // Kiểm tra nếu response.data chứa kết quả hợp lệ
    if (response.data && Array.isArray(response.data)) {
      console.log("data", response.data);
      return response.data; // Trả về mảng các công thức
    } else {
      return []; // Trả về mảng rỗng nếu dữ liệu không hợp lệ
    }
  } catch (err) {
    // Xử lý lỗi nếu có
    console.error('Error fetching recipes:', err);
    throw new Error('Failed to fetch recipes: ' + err.message);
  }
};

export default { searchRecipes };
