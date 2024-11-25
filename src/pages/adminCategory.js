import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../services/CategoryService";
import AdminCategoryTable from "../components/AdminCategoryTable"; // Import component bảng
import "../styles/adminCategoryCss.css";

function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Thêm state cho trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Thêm state cho tổng số trang
  const pageSize = 10;

  // Fetch categories khi trang hiện tại thay đổi
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await CategoryService.getCategories(currentPage, pageSize);
      setCategories(data.content);
      setTotalPages(data.totalPages);
    };

    fetchCategories();
  }, [currentPage]); // Fetch lại mỗi khi currentPage thay đổi

  const handleAddCategory = async () => {
    if (categoryName.trim() === "") {
      alert("Tên category không được để trống!");
      return;
    }

    try {
      const newCategory = await CategoryService.createCategory(categoryName);
      setCategories([...categories, newCategory]);
      setCategoryName("");
      alert("Category đã được thêm thành công!");
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Không thể thêm category. Vui lòng kiểm tra lại.");
    }
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setCategoryName(categoryName);
  };

  const handleUpdateCategory = async () => {
    if (categoryName.trim() === "") {
      alert("Tên category không được để trống!");
      return;
    }

    try {
      const updatedCategory = await CategoryService.updateCategory(
        selectedCategoryId,
        categoryName
      );
      setCategories(
        categories.map((category) =>
          category.categoryid === selectedCategoryId
            ? updatedCategory
            : category
        )
      );
      setCategoryName("");
      setSelectedCategoryId(null);
      alert("Category đã được sửa thành công!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Không thể sửa category. Vui lòng kiểm tra lại.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa category này không?");
    if (!isConfirmed) return;

    try {
      await CategoryService.deleteCategory(categoryId);
      setCategories(categories.filter((category) => category.categoryid !== categoryId));
      alert("Category đã được xóa thành công!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Không thể xóa category. Vui lòng kiểm tra lại.");
    }
  };

  // Chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="header-category">
        <h1>Quản lý Category</h1>
        <Link to={"/"}>Trở về trang chủ</Link>

        <div className="form-group">
          <label htmlFor="categoryName">Tên Category:</label>
          <input
            type="text"
            id="categoryName"
            placeholder="Nhập tên category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          {selectedCategoryId ? (
            <button onClick={handleUpdateCategory}>Sửa Category</button>
          ) : (
            <button onClick={handleAddCategory}>Thêm Category</button>
          )}
        </div>
      </div>

      <AdminCategoryTable
        categories={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminCategory;
