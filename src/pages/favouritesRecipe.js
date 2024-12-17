import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/HomeHeader";
import SubscribeSection from "../components/HomeSubscribeSection";
import Footer from "../components/HomeFooter";
import RecipeFavouriteList from '../components/RecipeFavouriteList';
import { getUserFromToken } from "../components/readtoken"; // Hàm giải mã token
import '../styles/home.css';

function FavouritesRecipe() {
  const [userId, setUserId] = useState(null); // Trạng thái cho userId
  const [token, setToken] = useState(null); // Trạng thái cho token

  // Lấy token từ localStorage và giải mã userId
  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // Lấy token từ localStorage

    if (storedToken) {
      setToken(storedToken); // Lưu token vào state
      try {
        const decodedToken = getUserFromToken(storedToken); // Giải mã token
        if (decodedToken?.userid) {
          setUserId(decodedToken.userid); // Lưu userId vào state
        } else {
          console.error("Invalid token structure.");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
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