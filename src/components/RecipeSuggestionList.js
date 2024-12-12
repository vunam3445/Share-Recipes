import React, { useEffect, useState } from 'react';
import SuggestionService from '../services/SuggestionService';
import RecipeSuggestionCard from './RecipeSuggestionCard';
import "../styles/main.css";

function RecipeSuggestionList({recipeId}) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Gọi hàm getSuggestions từ SuggestionService
    SuggestionService.getSuggestions().then((data) => {
      setRecipes(data);
    });
  }, []);

  return (
    <div>
      <h3>Other Recipes You May Like</h3>
      <div>
        {recipes.map((recipe) => (
          <RecipeSuggestionCard key={recipe.id} name={recipe.name} image={recipe.image} serves={recipe.serves} time={recipe.time} />
        ))}
      </div>
    </div>
  );
}

export default RecipeSuggestionList;
