import axios from 'axios';

const API_URL = 'http://localhost:8083/foodwed/user/change';

// Hàm changePassword
export const changePassword = async (data, userId) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, {
        oldpassword: data.oldPassword,
        newpassword: data.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };
