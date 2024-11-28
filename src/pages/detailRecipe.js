import React from "react";
import RecipeDetail from "../components/RecipeDetail";
import Navbar from "../components/Navbar";
import Footer from "../components/HomeFooter";
 function RecipeDetailPage(){
    return(
        <div>
            <Navbar></Navbar>
            <RecipeDetail></RecipeDetail>
            <Footer></Footer>

        </div>
    )

 }
 export default RecipeDetailPage;