import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Để lấy recipeid từ URL
import SuggestionService from '../services/SuggestionService';
import RecipeSuggestionCard from './RecipeSuggestionCard';
import RecipeCard  from './RecipeCard';
import "../styles/main.css";

function RecipeSuggestionList() {
  const [recipes, setRecipes] = useState([]); // Lưu danh sách công thức gợi ý
  const { recipeId } = useParams(); // Lấy recipeid từ URL params

  useEffect(() => {
    // Kiểm tra recipeid trước khi gọi API
    if (recipeId) {
      SuggestionService.getSuggestions(recipeId).then((data) => {
        setRecipes(data);
      });
    }
  }, [recipeId]); // Chỉ gọi lại khi recipeid thay đổi

  return (
    <div>
      <h3>Other Recipes You May Like</h3>
      <div className='list'>
        {recipes.map((recipe) => (
          <div className='card'>
          <RecipeSuggestionCard key={recipe.id} name={recipe.name} image={recipe.image} serves={recipe.serves} time={recipe.time}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSuggestionList;
