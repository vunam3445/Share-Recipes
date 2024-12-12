import axios from 'axios';

const BASE_URL = 'http://localhost:8083/foodwed/order'; // URL gốc của API
const token = localStorage.getItem("token");

// Lấy danh sách đơn hàng với phân trang
const getOrders = async (isactive, page = 0, size = 3) => {
  try {
    console.log(isactive)
    const response = await axios.get(`${BASE_URL}`, {
      params: { isActive: isactive === "1", page, size },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Có lỗi khi lấy danh sách đơn hàng.');
  }
};

// Thêm đơn hàng mới
const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, orderData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Có lỗi khi tạo đơn hàng.');
  }
};

// Cập nhật đơn hàng
const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${orderId}`, orderData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Có lỗi khi cập nhật đơn hàng.');
  }
};

// Xóa đơn hàng
const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Có lỗi khi xóa đơn hàng.');
  }
};

// Lấy danh sách đơn hàng của người dùng
const getOrderByUser = async (uid, page = 0, size = 6) => {
  try {
    const response = await axios.get(`${BASE_URL}/uorder/${uid}`, {
      params: { page, size },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching orders for user:', error);
    throw new Error('Có lỗi khi lấy danh sách đơn hàng của người dùng.');
  }
};

// Lấy chi tiết đơn hàng
const getOrderDetail = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/orderDetail/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw new Error('Có lỗi khi lấy chi tiết đơn hàng.');
  }
};

export default {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByUser,
  getOrderDetail
};
