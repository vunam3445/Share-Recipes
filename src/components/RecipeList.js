import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import AllRecipeService from "../services/AllRecipeService";


const RecipeList = () => {
  const [recipes, setRecipes] = useState([]); // Lưu danh sách công thức
  const [loading, setLoading] = useState(true); // Lưu trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số công thức

  const location = useLocation(); // Lấy thông tin URL hiện tại
  const navigate = useNavigate(); // Dùng để điều hướng mà không reload

  // Lấy số trang từ query parameter, mặc định là 1
  const currentPage = parseInt(new URLSearchParams(location.search).get("page") || 1, 10);

  // Hàm fetch công thức từ API
  const fetchRecipes = async (page) => {
    try {
      setLoading(true);
      const data = await AllRecipeService.getRecipes(page - 1, 9); // `page - 1` vì API có thể bắt đầu từ 0
      setRecipes(data.content || []); // Đảm bảo dữ liệu là mảng
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dữ liệu khi `currentPage` thay đổi
  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  // Điều hướng tới trang mới
  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}`);
  };

  // Sinh danh sách số trang
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const totalDisplayPages = 5; // Tổng số trang hiển thị (3 đầu + 2 cuối)

    // Nếu tổng số trang nhỏ hơn hoặc bằng 6, hiển thị hết
    if (totalPages <= totalDisplayPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Luôn thêm trang đầu tiên
      pageNumbers.push(1);

      // Hiển thị dấu "..." nếu cần
      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Hiển thị trang gần với currentPage
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }

      // Nếu trang hiện tại gần cuối
      else if (currentPage <= 2) {
        for (let i = 2; i <= Math.min(3, totalPages - 2); i++) {
          pageNumbers.push(i);
        }
      } else {
        // Nếu trang hiện tại gần cuối, hiển thị trang cuối
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }

      // Hiển thị dấu "..." nếu cần
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Luôn thêm trang cuối cùng
      pageNumbers.push(totalPages);
    }

    // Loại bỏ các trang trùng nhau
    const uniquePageNumbers = [];
    pageNumbers.forEach((number, index) => {
      if (number !== pageNumbers[index - 1]) {
        uniquePageNumbers.push(number);
      }
    });

    return uniquePageNumbers;
  };

  // Xử lý khi đang loading
  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-list-container">
      {/* Hiển thị danh sách công thức */}
      <div className="uk-grid uk-grid-small uk-child-width-1-3@s uk-child-width-1-4@m">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard name={recipe.name} image={recipe.image} />
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="uk-margin-large-top">
        <ul className="uk-pagination uk-flex-center uk-text-500 uk-margin-remove">
          {/* Nút "Previous" */}
          <li className={currentPage === 1 ? "uk-disabled" : ""}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
          </li>

          {/* Số trang */}
          {generatePageNumbers().map((number, index) => (
            <li key={index} className={currentPage === number ? "uk-active" : ""}>
              {number === "..." ? (
                <span className="pagination-dots">...</span>
              ) : (
                <button onClick={() => handlePageChange(number)}>{number}</button>
              )}
            </li>
          ))}

          {/* Nút "Next" */}
          <li className={currentPage === totalPages ? "uk-disabled" : ""}>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecipeList;
