import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/HomeHeader";
import RecipeSlidebar from "../components/HomeRecipeSlidebar";
import SubscribeSection from "../components/HomeSubscribeSection";
import Footer from "../components/HomeFooter";
import RecipeList from "../components/RecipeList";
import HomeRecipe from "../components/HomeRecipe";

import '../styles/home.css'; // Make sure the path is correct.

function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState(""); // To store the selected recipe name
  const [isRecipeSelected, setIsRecipeSelected] = useState(false); // To track if a recipe is selected

  // Handle item click to set the selected recipe
  const handleItemClick = (item) => {
    setSelectedRecipe(item);
    setIsRecipeSelected(true); // Set the flag when a recipe is selected
  };

  // Reset the selected recipe when "cancel" button is clicked
  const handleCancel = () => {
    setSelectedRecipe("");
    setIsRecipeSelected(false); // Reset the flag
  };

  // Optionally, you can use useEffect here for any side-effects or fetching data
  useEffect(() => {
    // For example, you could fetch data or trigger actions based on the selected recipe
    if (selectedRecipe) {
      // Any logic related to selectedRecipe can go here
    }
  }, [selectedRecipe]); // Runs whenever the selected recipe changes

  return (
    <div className="divMain">
      <div className="divHome">
        <Navbar />
        <Header />
        <div className="mainContent">
          <div className="recipeLayout">
            <RecipeSlidebar className="sidebar" onItemClick={handleItemClick} />
            {/* Show RecipeList if no recipe is selected */}
            {!isRecipeSelected ? (
              <RecipeList />
            ) : (
              <div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <p style={{width: 400,textAlign: "center"}}>{selectedRecipe}</p>
                  <button onClick={handleCancel} style={{width: 500}}>Cancel</button>
                </div>
                
                {/* Pass the selected recipe to HomeRecipe for search */}
                <HomeRecipe searchQuery={selectedRecipe} />
              </div>
            )}
          </div>
        </div>
        <SubscribeSection />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
