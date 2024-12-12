// services/EmailService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8083/foodwed/emails"; // Thay thế với URL API của bạn

/**
 * Thêm email mới vào hệ thống
 * @param {string} emailAddress - Địa chỉ email cần thêm
 * @returns {Promise<Object>} - Dữ liệu phản hồi từ API, bao gồm thông tin email đã thêm
 */
export const addEmail = async (emailAddress) => {
  try {
    const response = await axios.post(API_BASE_URL, { emailAddress });

    // Kiểm tra nếu phản hồi thành công
    if (response.status === 201) {
      return {
        status: response.data.status,
        message: response.data.message,
        result: response.data.result, // Thông tin email đã thêm
      };
    } else {
      throw new Error("Failed to add email");
    }
  } catch (error) {
    console.error("Error adding email:", error);
    throw error; // Ném lỗi để có thể xử lý ở component
  }
};
