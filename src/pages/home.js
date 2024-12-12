import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/HomeHeader";
import RecipeSlidebar from "../components/HomeRecipeSlidebar";
import SubscribeSection from "../components/HomeSubscribeSection";
import Footer from "../components/HomeFooter";
import RecipeList from "../components/RecipeList";


import '../styles/home.css'; // Sử dụng đường dẫn chính xác.


function Home() {
  return (
    <div className="divMain">
      <div className="divHome">
        <Navbar />
        <Header />
        <div className="mainContent">
          <div className="recipeLayout">
            <RecipeSlidebar className="sidebar" />
            <RecipeList />
          </div>
        </div>
        <SubscribeSection />
        <Footer />
      </div>
    </div>
    
  );
}

export default Home;
