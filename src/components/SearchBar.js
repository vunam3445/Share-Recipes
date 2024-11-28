import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchService from "../services/SearchService";
import RecipeCard from "../components/RecipeCard";
import FilterBar from "../components/FilterBar";
import CategoryService from "../services/CategoryService";
import 'uikit/dist/css/uikit.min.css';
import "../styles/main.css";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Chỉ một category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy query và categoryId từ URL
  const query = new URLSearchParams(location.search).get("name");
  const categoryIdFromUrl = new URLSearchParams(location.search).get("categoryId");

  // Hàm tìm kiếm
  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const data = await SearchService.searchRecipes(query, categoryIdFromUrl || ""); // Lấy kết quả tìm kiếm
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách categories
  const fetchCategories = async () => {
    try {
      const categoryData = await CategoryService.getCategories(0, 10);
      setCategories(categoryData.content);
    } catch (err) {
      setError('Failed to load categories');
    }
  };

  // Xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Tìm kiếm khi nhấn Enter
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?name=${searchQuery}`); // Điều hướng với từ khóa tìm kiếm
    }
  };

  // Xử lý thay đổi category
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId); // Chỉ một category được chọn
    if (categoryId) {
      navigate(`/search?name=${searchQuery}&categoryId=${categoryId}`); // Cập nhật URL nếu có categoryId
    } else {
      navigate(`/search?name=${searchQuery}`); // Nếu không có category, chỉ tìm theo searchQuery
    }
  };

  // Lấy dữ liệu khi trang tải hoặc khi query/categoryId thay đổi
  useEffect(() => {
    fetchCategories();
    setSearchQuery(query || "");
  }, [query]);

  // Lấy dữ liệu tìm kiếm khi query/categoryId thay đổi
  useEffect(() => {
    fetchSearchResults(); // Gọi lại kết quả tìm kiếm khi query hoặc categoryId thay đổi
  }, [query, categoryIdFromUrl]);

  // Lấy selectedCategory từ URL khi trang tải lại
  useEffect(() => {
    // Nếu categoryId từ URL tồn tại, cập nhật selectedCategory
    if (categoryIdFromUrl) {
      setSelectedCategory(categoryIdFromUrl);
    } else {
      setSelectedCategory(null); // Nếu không có categoryId trong URL, đặt lại thành null
    }
  }, [categoryIdFromUrl]); // Chỉ chạy lại khi categoryId thay đổi

  if (loading) return <p>Loading search results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="search-page">
      <header className="uk-text-center">
        <h1>Search Recipes</h1>
      </header>

      {/* Thanh tìm kiếm */}
      <div className="search-bar uk-margin-large-bottom">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="uk-input uk-border-rounded"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
      </div>

      {/* Lọc theo category */}
      <FilterBar
        categories={categories}
        selectedCategory={categoryIdFromUrl}  // Chuyển categoryId từ URL vào FilterBar
        onCategoryChange={handleCategoryChange}
      />

      {/* Kết quả tìm kiếm */}
      {recipes.length === 0 ? (
        <p>No recipes found for "{searchQuery}"</p>
      ) : (
        <div className="uk-grid uk-grid-small uk-child-width-1-3@s uk-child-width-1-4@m">
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard name={recipe.name} image={recipe.image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
