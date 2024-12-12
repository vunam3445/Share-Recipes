import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/HomeHeader";
import SubscribeSection from "../components/HomeSubscribeSection";
import Footer from "../components/HomeFooter";
import RecipeFavouriteList from "../components/RecipeFavouriteList"; // Đảm bảo đã import đúng
import '../styles/home.css'; // Sử dụng đường dẫn chính xác.

// Component chính cho trang yêu thích món ăn
function FavouritesRecipe() {
  const [userId, setUserId] = useState(null); // Trạng thái cho userId
  const [token, setToken] = useState(null); // Trạng thái cho token

  // Dữ liệu giả lập cho userId và token (Bạn có thể lấy từ context hoặc localStorage nếu cần)
  useEffect(() => {
    // Lấy userId và token từ localStorage (hoặc context)
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  // Nếu chưa có userId hoặc token, yêu cầu người dùng đăng nhập
  if (!userId || !token) {
    return <div>Please log in to view your favourite recipes.</div>;
  }

  return (
    <div className="divMain">
      <div className="divHome">
        <Navbar />
        <Header />
        <div className="mainContent">
          <div className="recipeLayout">
            {/* Truyền userId và token vào RecipeFavouriteList */}
            <RecipeFavouriteList userId={userId} token={token} />
          </div>
        </div>
        <SubscribeSection />
        <Footer />
      </div>
    </div>
  );
}

export default FavouritesRecipe;
