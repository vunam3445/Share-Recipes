// src/pages/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng trang
import RecipeList from "../components/RecipeList"; // Giữ nguyên việc hiển thị danh sách công thức
import "../styles/main.css"; // Import style riêng của bạn nếu có

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Lưu từ khóa tìm kiếm
  const navigate = useNavigate(); // Dùng để điều hướng trang

  // Hàm xử lý tìm kiếm khi nhấn Enter
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?name=${searchQuery}`); // Điều hướng tới trang tìm kiếm với từ khóa
    }
  };

  return (
    <div className="home-page">
      <header className="uk-text-center uk-margin-large-top">
        <h1 className="uk-heading-medium">Welcome to Recipe App</h1>
        <p className="uk-text-lead">Explore a wide variety of delicious recipes!</p>
      </header>

      <main className="uk-container uk-container-large uk-margin-top">
        {/* Thanh tìm kiếm */}
        <div className="search-bar uk-margin-large-bottom">
          <input
            type="text"
            placeholder="Search for recipes..."
            className="uk-input uk-border-rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa tìm kiếm
            onKeyDown={handleSearch} // Khi nhấn Enter, thực hiện tìm kiếm
          />
        </div>

        {/* Danh sách công thức */}
        <RecipeList />
      </main>
    </div>
  );
};

export default Home;
