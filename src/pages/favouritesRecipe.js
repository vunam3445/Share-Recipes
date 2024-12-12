import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/HomeHeader";
import SubscribeSection from "../components/HomeSubscribeSection";
import Footer from "../components/HomeFooter";
import RecipeFavouriteList from "../components/RecipeFavouriteList";
import { getUserFromToken } from "../components/readtoken";
import '../styles/home.css';

function FavouritesRecipe() {
  const token = localStorage.getItem('token');
  const user = getUserFromToken();
  const userId = user.userid;

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
