// src/services/CategoryService.js

import axios from 'axios';

const API_URL = 'http://localhost:8083/foodwed/category';
const token = localStorage.getItem("token");
console.log(token)
const CategoryService = {
  // Lấy danh sách categories với phân trang
  getCategories: async (pageNumber = 0, pageSize = 4) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          page: pageNumber,  // Số trang bắt đầu từ 0
          size: pageSize,    // Số lượng items mỗi trang
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      if (data.status === 'success' && data.result) {
        return {
          content: data.result.content,          // Mảng danh sách category
          totalElements: data.result.totalElements, // Tổng số category
          totalPages: data.result.totalPages,     // Tổng số trang
          currentPage: data.result.pageNumber,    // Trang hiện tại
          pageSize: data.result.pageSize,         // Kích thước trang
        };
      } else {
        console.error('Unexpected API response format:', data);
        return {
          content: [],
          totalElements: 0,
          totalPages: 0,
          currentPage: pageNumber,
          pageSize: pageSize,
        };
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        currentPage: pageNumber,
        pageSize: pageSize,
      };
    }
  },

  // Thêm category mới
  createCategory: async (categoryName) => {
    try {
      // Thêm token vào header của yêu cầu

      if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập.");
      }

      const response = await axios.post(
        `${API_URL}/create`,
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.result;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Cập nhật category
  updateCategory: async (categoryId, categoryName) => {
    try {

      if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập.");
      }

      const response = await axios.put(
        `${API_URL}/update/${categoryId}`,
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.result;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  // Xóa category
  deleteCategory: async (categoryId) => {
    try {

      if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập.");
      }

      const response = await axios.delete(
        `${API_URL}/delete/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },
};

export default CategoryService;
