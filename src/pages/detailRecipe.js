import React from "react";
import RecipeDetail from "../components/RecipeDetail";
import Navbar from "../components/Navbar";
import Footer from "../components/HomeFooter";
import RecipeSuggestionList from "../components/RecipeSuggestionList";
 function RecipeDetailPage(){
    return(
        <div>
            <Navbar></Navbar>
            <RecipeDetail></RecipeDetail>
            <RecipeSuggestionList />
            <Footer></Footer>

        </div>
    )

 }
 export default RecipeDetailPage;