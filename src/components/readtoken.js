import { jwtDecode } from 'jwt-decode';

// Hàm để lấy userId từ token
export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);  // Giải mã token
      return decoded;  // Lấy userid từ payload của token
    } catch (error) {
      console.error('Không thể giải mã token:', error);
      return null;
    }
  }
  return null;
};
