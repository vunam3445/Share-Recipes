import axios from "axios";

const BASE_URL = "http://localhost:8083/foodwed/comments";

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
  const token = localStorage.getItem("token");  // Lấy token từ localStorage

  // const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlIjoiQURNSU4iLCJpc3MiOiJxdXlkZXB0cmFpLmNvbSIsImV4cCI6MTczMzU4ODE3NSwiaWF0IjoxNzMzNTg0NTc1LCJ1c2VyaWQiOiJmOWU5MDkzZi0zODA1LTQ3YjQtYjZiYS1kYmQ3ODNiMDk3Y2IifQ.bYf6gPnsO_L-PD5xgNUktzNqSDLWm5FSQbcwvIRvhlNhOBIBkM3jEDYAtHnjSaDzvnwqiwOFQMi5TZJL03jbPw"

  if (!token) {
    throw new Error("Token is required for adding a comment.");
  }

  try {
    const response = await axios.post(BASE_URL, commentData, {
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
