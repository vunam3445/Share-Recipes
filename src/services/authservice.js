import axios from 'axios';

// Địa chỉ API gốc
const API_URL = 'http://localhost:8083/foodwed/auth';

// Thiết lập một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
  }
});

// Đăng ký người dùng
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/signup', userData);
    return response.data;  // Trả về kết quả phản hồi từ API
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi đăng ký');
  }
};

// Đăng nhập người dùng
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/token', userData);
    return response.data;  // Trả về kết quả từ API, có thể là token nếu đăng nhập thành công
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi đăng nhập');
  }
};


// export const googleLogin = async (googleToken) => {
//   try {
//     const response = await axiosInstance.post('/google', { token: googleToken });
//     return response.data;  // Token sẽ được trả về từ API của bạn nếu đăng nhập thành công
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Lỗi khi đăng nhập Google');
//   }
// };



