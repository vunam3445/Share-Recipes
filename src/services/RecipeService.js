import axios from 'axios';

// URL của API
const BASE_URL = 'http://localhost:8083/foodwed/recipe';
// token
const token = localStorage.getItem("token");
// Hàm lấy thông tin các recipe với phân trang và Bearer token
const getRecipes = async (page = 0, size = 10) => {
  try {
    // Gửi yêu cầu GET với token trong header Authorization
    

    const response = await axios.get(BASE_URL, {
      params: { page, size },
      headers: {
        'Authorization': `Bearer ${token}`,  // Thêm Bearer token vào header
      },
    });

    // Trả về dữ liệu nếu yêu cầu thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
// Hàm gửi yêu cầu POST để tạo một recipe mới
const createRecipe = async (recipeData, selectedCategories) => {
  // Kiểm tra các trường dữ liệu có bị null hoặc trống
  if (!recipeData.name || !recipeData.description || !recipeData.ingredien || !recipeData.step || !recipeData.time || !recipeData.serves || !recipeData.price) {
    throw new Error("Các trường 'Tên', 'Mô tả', 'Nguyên liệu', 'Các bước', 'Thời gian' và 'Số lượng' và 'giá' không được để trống.");
  }

  if (!selectedCategories || selectedCategories.length === 0) {
    throw new Error("Vui lòng chọn ít nhất một danh mục.");
  }

  const formData = new FormData();
  formData.append("name", recipeData.name);
  formData.append("description", recipeData.description);
  formData.append("ingredien", recipeData.ingredien);
  formData.append("step", recipeData.step);
  formData.append("time", recipeData.time);
  formData.append("serves", recipeData.serves);
  formData.append("price", recipeData.price);
  formData.append("image", recipeData.image); // File ảnh
  console.log(selectedCategories)
  // Append từng phần tử của selectedCategories vào formData
  selectedCategories.forEach((categoryId) => {
    formData.append("categoryids", categoryId); // Thêm từng categoryId vào formData
    
  });

  try {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
  }
  console.log(token)
    const response = await axios.post(BASE_URL + "/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw new Error("Có lỗi khi thêm Recipe.");
  }
};

  //update
  const updateRecipe = async (recipeId, recipeData, selectedCategories) => {
    // Kiểm tra các trường dữ liệu có bị null hoặc trống
    if (!recipeData.name || !recipeData.description || !recipeData.ingredien || !recipeData.step || !recipeData.time || !recipeData.serves || !recipeData.price) {
      throw new Error("Các trường 'Tên', 'Mô tả', 'Nguyên liệu', 'Các bước', 'Thời gian' và 'Số lượng' và 'giá' không được để trống.");
    }
  
    if (!selectedCategories || selectedCategories.length === 0) {
      throw new Error("Vui lòng chọn ít nhất một danh mục.");
    }
  
    const formData = new FormData();
    formData.append("id", recipeId);
    formData.append("name", recipeData.name);
    formData.append("description", recipeData.description);
    formData.append("ingredien", recipeData.ingredien);
    formData.append("step", recipeData.step);
    formData.append("time", recipeData.time);
    
    formData.append("serves", recipeData.serves);
    formData.append("price",recipeData.price);
    console.log("kdfa",recipeData.price)
  
    if (recipeData.image) {
      formData.append("image", recipeData.image); // Nếu có ảnh mới, thêm vào formData
    }else{
      formData.append("image", "");
    }
  
    selectedCategories.forEach((categoryId) => {
      formData.append("categoryids", categoryId);
    });
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
  }
    try {

      const response = await axios.put(`${BASE_URL}/update`, formData, {
        headers: {
         "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("aaa",response.data)
      return response.data;
    } catch (error) {
      console.error("Error updating recipe:", error.response?.data || error.message);
      throw new Error("Có lỗi khi cập nhật Recipe.");
    }
  };
  
// Hàm xóa recipe
const deleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${recipeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Thêm Bearer token vào header
      },
    });
    return response.data; // Trả về phản hồi từ server (nếu có)
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw new Error("Có lỗi khi xóa Recipe.");
  }
};
// Hàm lấy chi tiết recipe
const detailRecipe = async (recipeId) => {
  if (!recipeId) {
    throw new Error("Recipe ID không được để trống.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/recipeDetail/${recipeId}`, {
    
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe detail:", error.response?.data || error.message);
    throw new Error("Có lỗi khi lấy thông tin chi tiết Recipe.");
  }
};




export default {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  detailRecipe
};
