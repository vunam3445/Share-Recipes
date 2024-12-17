import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/HomeHeader";
import SubscribeSection from "../components/HomeSubscribeSection";
import Footer from "../components/HomeFooter";
import RecipeFavouriteList from "../components/RecipeFavouriteList";
import { getUserFromToken } from "../components/readtoken"; // Hàm giải mã token
import '../styles/home.css';
import ModalLogin from '../components/modallogin';

function FavouritesRecipe() {
  const [userId, setUserId] = useState(null); // Trạng thái cho userId
  const [token, setToken] = useState(null); // Trạng thái cho token
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    if(!storedToken){
      setShowLoginModal(true);
      return;
    }
  }, []);
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
          <ModalLogin show={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </div>
        <SubscribeSection />
        <Footer />
      </div>
    </div>
  );
}

export default FavouritesRecipe;
