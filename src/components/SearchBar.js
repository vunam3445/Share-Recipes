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
  const categoryId = new URLSearchParams(location.search).get("categoryId");

  // Hàm tìm kiếm
  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const data = await SearchService.searchRecipes(query, categoryId || ""); // Lấy kết quả tìm kiếm
      console.log("data",data)
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
      const categoryParam = selectedCategory ? `&categoryId=${selectedCategory}` : "";
      navigate(`/search?name=${searchQuery}${categoryParam}`); // Điều hướng với từ khóa tìm kiếm và categoryId nếu có
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
    setSelectedCategory(categoryId || null); // Cập nhật selectedCategory khi categoryId thay đổi
  }, [query, categoryId]);

  useEffect(() => {
    fetchSearchResults(); // Gọi lại kết quả tìm kiếm khi query hoặc categoryId thay đổi
  }, [query, categoryId]);

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
          onKeyDown={handleSearchSubmit} // Tìm kiếm khi nhấn Enter
        />
      </div>

      
    </div>
  );
};

export default Search;
