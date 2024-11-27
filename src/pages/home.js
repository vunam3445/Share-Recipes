import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/HomeHeader";
import RecipeSlidebar from "../components/HomeRecipeSlidebar";
import Recipes from "../components/HomeRecipe";
import SubscribeSection from "../components/HomeSubscribeSection";
import Footer from "../components/HomeFooter";

import '../styles/home.css'; // Sử dụng đường dẫn chính xác.

function Home() {
  return (
    <div style={{ backgroundColor: "white", padding: "0px", margin: "0px" }}>
      <Navbar />
      <Header />
      <div className="mainContent">
        <div className="recipeLayout">
          <RecipeSlidebar />
          <Recipes />
        </div>
      </div>
      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Home;
