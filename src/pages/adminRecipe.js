import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
import ListCategoryCheckBox from "../components/ListCategoryCheckBox";
import "../styles/adminRecipeCss.css";
import AdminRecipeTable from "../components/AdminRecipeTable";
import RecipeService from "../services/RecipeService"; // Đảm bảo import RecipeService

function AdminRecipe() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]); // State lưu danh sách category đã chọn
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    ingredien: "",
    step: "",
    image: null,
    time: "",
    serves: "",
  });
  const [editingRecipe, setEditingRecipe] = useState(null); // Recipe đang được chỉnh sửa

  const navigate = useNavigate(); // Khởi tạo useNavigate

  const fetchRecipes = async () => {
    try {
      const response = await RecipeService.getRecipes(0, 10); // Lấy 10 bản ghi mỗi trang
      setRecipeData(response.result.content); // Cập nhật danh sách recipes
    } catch (err) {
      console.error("Có lỗi khi lấy danh sách recipes", err);
    }
  };
  const toggleModal = (recipe = null, categories = []) => {
    if (recipe) {
      setRecipeData({
        name: recipe.name,
        description: recipe.description,
        ingredien: recipe.ingredien,
        step: recipe.step,
        image: recipe.image,
        time: recipe.time,
        price: recipe.price,
        serves: recipe.serves,
      });
      
      // Cập nhật danh sách selectedCategories
      setSelectedCategories(
        categories && Array.isArray(categories)
          ? categories.map((category) => category.categoryid)
          : [] // Nếu categories không tồn tại hoặc không phải mảng, đặt mảng rỗng
      );
    } else {
      setRecipeData({
        name: "",
        description: "",
        ingredien: "",
        step: "",
        image: null,
        time: "",
        price:"",
        serves: "",
      });
      setSelectedCategories([]);
    }
  
    setEditingRecipe(recipe);
    setIsModalOpen(!isModalOpen);
  };
  
  
  
  

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.includes(categoryId)
          ? prevSelected.filter((id) => id !== categoryId) // Bỏ chọn category
          : [...prevSelected, categoryId] // Thêm category vào danh sách đã chọn
    );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRecipeData({
      ...recipeData,
      [id]: value,
    });
  };

  const handleImageChange = (e) => {
    setRecipeData({
      ...recipeData,
      image: e.target.files[0],
    });
  };


  const handleSaveRecipe = async () => {
    try {
      console.log(recipeData);
      // Nếu không thay đổi ảnh, giữ lại ảnh cũ
      const updatedRecipeData = {
        ...recipeData,
        image: recipeData.image || editingRecipe?.image, // Nếu không có ảnh mới, giữ lại ảnh cũ
      };
      console.log(selectedCategories)
  
      if (editingRecipe) {
        // Cập nhật Recipe
        await RecipeService.updateRecipe(
          editingRecipe.id,
          updatedRecipeData,
          selectedCategories
        );
        alert("Recipe đã được cập nhật!");
      } else {
        // Tạo mới Recipe
        await RecipeService.createRecipe(updatedRecipeData, selectedCategories);
        alert("Recipe được thêm thành công!");
      }
  
      navigate("/admin/recipe"); // Chuyển về danh sách
      setEditingRecipe(null); // Đặt lại trạng thái chỉnh sửa
      setIsModalOpen(false); // Đóng modal
    } catch (error) {
      //alert("Có lỗi xảy ra khi lưu Recipe.");
      const errorMessage = error.response?.data || error.message || "Có lỗi xảy ra khi lưu Recipe.";
      alert(errorMessage); // Hiển thị thông báo lỗi cho người dùng
    }
  };
  
  

  return (
    <div className="container">
      <div className="header">
        <h1>Quản lý Recipe</h1>
        <Link to="/admin">Trở về trang chủ</Link>
        <button onClick={() => toggleModal()}>Thêm Recipe</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div
            className="modal-content scrollable-main"
            onClick={(e) => e.stopPropagation()} // Ngăn sự kiện đóng modal khi nhấp bên trong
          >
            <h2>Thêm Recipe</h2>
            <div className="form-group">
              <label htmlFor="recipeName">Tên Recipe:</label>
              <input
                type="text"
                id="name"
                placeholder="Nhập tên recipe"
                value={recipeData.name}
                onChange={handleInputChange}
              />

              <label htmlFor="description">Mô tả:</label>
              <textarea
                id="description"
                placeholder="Nhập mô tả về món ăn"
                value={recipeData.description}
                onChange={handleInputChange}
              ></textarea>

              <label htmlFor="ingredients">Nguyên liệu:</label>
              <textarea
                id="ingredien"
                placeholder="Nhập nguyên liệu, ngăn cách bởi dấu chấm phẩy"
                value={recipeData.ingredien}
                onChange={handleInputChange}
              ></textarea>

              <label htmlFor="steps">Các bước nấu:</label>
              <textarea
                id="step"
                placeholder="Nhập các bước nấu ăn, ngăn cách bởi dấu chấm phẩy"
                value={recipeData.step}
                onChange={handleInputChange}
              ></textarea>

              <label htmlFor="image">Chọn ảnh món ăn:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />

<label htmlFor="time">Thời gian nấu (phút):</label>
<input
  type="number"
  id="time"
  placeholder="Nhập thời gian nấu ăn"
  value={recipeData.time}
  onChange={(e) => {
    const value = Math.max(0, Math.floor(Number(e.target.value) || 0));
    setRecipeData({ ...recipeData, time: value });
  }}
/>

<label htmlFor="serves">Số lượng người phục vụ:</label>
<input
  type="number"
  id="serves"
  placeholder="Nhập số người phục vụ"
  value={recipeData.serves}
  onChange={(e) => {
    const value = Math.max(0, Math.floor(Number(e.target.value) || 0));
    setRecipeData({ ...recipeData, serves: value });
  }}
/>

<label htmlFor="price">Giá nguyên liệu:</label>
<input
  type="number"
  id="price"
  placeholder="Nhập giá nguyên liệu"
  value={recipeData.price}
  onChange={(e) => {
    const value = Math.max(0, Math.floor(Number(e.target.value) || 0));
    setRecipeData({ ...recipeData, price: value });
  }}
/>



              <ListCategoryCheckBox
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />

              <button onClick={handleSaveRecipe}>
                {editingRecipe ? "Cập nhật Recipe" : "Thêm Recipe"}
              </button>

              <button className="close-btn" onClick={toggleModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

<AdminRecipeTable toggleModal={toggleModal} fetchRecipes={fetchRecipes} />
    </div>
  );
}

export default AdminRecipe;
