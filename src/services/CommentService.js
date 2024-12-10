import axios from "axios";

const BASE_URL = "http://localhost:8083/foodwed/comments";
const token = localStorage.getItem("token");
console.log(token)
// Lấy comments của một recipe (không cần token)
export const getCommentsByRecipe = async (recipeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${recipeId}`);
    return response.data.result || []; // Đảm bảo trả về mảng rỗng nếu không có dữ liệu
  } catch (error) {
    console.error("Error fetching comments:", error);
    return []; // Trả về mảng rỗng khi có lỗi
  }
};

// Thêm một comment hoặc reply (cần token)
export const addComment = async (commentData) => {
  //   // Lấy token từ localStorage


  if (!token) {
    throw new Error("Token is required for adding a comment.");
  }

  try {
    const response = await axios.post(`${BASE_URL}/addcomments`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Thêm token vào header của request
        'Content-Type': 'application/json',  // Đảm bảo content type là JSON
      },
    });
    return response.data.result; // Trả về comment vừa được thêm
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};
