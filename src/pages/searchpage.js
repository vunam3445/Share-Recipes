import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchService from "../services/SearchService";
import RecipeCard from "../components/RecipeCard";
import FilterBar from "../components/FilterBar";
import CategoryService from "../services/CategoryService";
import Footer from "../components/HomeFooter";
import Navbar from "../components/Navbar";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);  // Tất cả các bản ghi
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(8); // Số lượng bản ghi hiện tại

  // Lấy query và categoryId từ URL
  const query = new URLSearchParams(location.search).get("name");
  const categoryId = new URLSearchParams(location.search).get("categoryId");

  // Hàm tìm kiếm
  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const data = await SearchService.searchRecipes(query, categoryId || ""); // Lấy toàn bộ 12 bản ghi từ API
      setRecipes(data);  // Cập nhật toàn bộ danh sách recipes
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
    setSelectedCategory(categoryId || null); // Cập nhật selectedCategory khi categoryId thay đổi
  }, [query, categoryId]);

  useEffect(() => {
    if (query || categoryId) {
      fetchSearchResults(); // Gọi lại kết quả tìm kiếm khi query hoặc categoryId thay đổi
    }
  }, [query, categoryId]); // Không cần limit nữa vì API đã giới hạn số bản ghi trả về

  // Hàm để load thêm bản ghi
  const loadMoreRecipes = () => {
    setVisibleCount(visibleCount + 4); // Tăng số lượng bản ghi cần hiển thị
  };

  if (loading) return <p>Loading search results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "white", padding: "0px", margin: "0px" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <div style={{ width: "100%", maxWidth: "1200px", textAlign: "center" }}>
          {/* Tìm kiếm */}
          <div data-uk-grid>
            <div className="uk-width-1-2@m">
              <div className="uk-search uk-search-default uk-width-1-1 uk-margin-small-bottom">
                {/* Search icon inside the input */}
                <span data-uk-search-icon className="uk-search-icon"></span>
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  className="uk-search-input uk-text-small uk-border-rounded uk-form-large"
                  style={{ backgroundColor: "#f1f1f1", paddingLeft: "35px" }} // Custom background color
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchSubmit}
                />
              </div>
            </div>
          </div>

          {/* Filter by category */}
          {/* <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          /> */}

          {/* Search results */}
          {recipes.length === 0 ? (
            <p>No recipes found for "{searchQuery}"</p>
          ) : (
            <div className="uk-grid uk-grid-small uk-child-width-1-3@s uk-child-width-1-4@m">
              {recipes.slice(0, visibleCount).map((recipe) => (
                <div key={recipe.id} >
                  <RecipeCard id={recipe.id} name={recipe.name} image={recipe.image} serves={recipe.serves} time={recipe.time}/>
                </div>
              ))}
            </div>
          )}

          {/* Load more button */}
          {recipes.length > visibleCount && (
            <button onClick={loadMoreRecipes} className="btnLoadmore">
              Load More
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Search;
