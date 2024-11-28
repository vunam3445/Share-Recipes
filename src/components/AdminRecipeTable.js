import React, { useState, useEffect } from 'react';
import RecipeService from '../services/RecipeService';  // Đảm bảo bạn đã import RecipeService.js vào đúng thư mục

const AdminRecipeTable = ({ toggleModal , fetchRecipes}) => {
  // Các state để lưu dữ liệu và phân trang
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);  // Lưu trang hiện tại
  const [totalPages, setTotalPages] = useState(1);    // Lưu tổng số trang

  

  // Gọi API khi component được mount hoặc khi currentPage thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RecipeService.getRecipes(currentPage, 10);
        setRecipes(response.result.content);
        setTotalPages(response.result.totalPages);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, fetchRecipes]);

  // Các hàm xử lý phân trang
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);  // Giảm trang
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);  // Tăng trang
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);  // Chọn trang
  };

   // Xử lý xóa recipe
   const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công thức này?')) {
      try {
        const response = await RecipeService.deleteRecipe(recipeId); // Gọi API xóa recipe
        setRecipes(recipes.filter(recipe => recipe.recipe.id !== recipeId)); // Cập nhật lại danh sách recipes
        alert('Recipe đã được xóa!');
      } catch (error) {
        alert('Có lỗi khi xóa recipe');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Recipe</th>
            <th>Mô tả</th>
            <th>Nguyên liệu</th>
            <th>Các bước</th>
            <th>Ảnh</th>
            <th>Thời gian</th>
            <th>Phục vụ</th>
            <th>Giá nguyên liệu</th>
            <th>Categories</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.recipe.id}>
              <td>{recipe.recipe.id}</td>
              <td>{recipe.recipe.name}</td>
              <td>{recipe.recipe.description || 'Không có mô tả'}</td>
              <td>{recipe.recipe.ingredien}</td>
              <td>{recipe.recipe.step}</td>
              <td><img src={require(`../assests/images/${recipe.recipe.image}`)} alt={recipe.recipe.image} style={{ width: '100px' }} /></td>
              <td>{recipe.recipe.time}</td>
              <td>{recipe.recipe.serves}</td>
              <td>{recipe.recipe.price}</td>
              <td>
                {recipe.categories.map(category => (
                  <span key={category.categoryid}>{category.name} </span>
                ))}
              </td>
              <td>
              <button onClick={() => toggleModal(recipe.recipe,recipe.categories)}>Sửa</button>


              <button onClick={() => handleDeleteRecipe(recipe.recipe.id)}>Xóa</button> {/* Xử lý xóa */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          {"<<"}
        </button>

        {/* Hiển thị các số trang */}
        {Array.from({ length: totalPages }).map((_, index) => {
          // Tính toán phạm vi hiển thị trang
          if (index >= currentPage - 2 && index <= currentPage + 2) {
            return (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={index === currentPage ? "active" : ""}
              >
                {index + 1}
              </button>
            );
          }
          return null;
        })}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default AdminRecipeTable;
