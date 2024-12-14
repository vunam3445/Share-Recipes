import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchService from "../services/SearchService";
import RecipeCard from "../components/RecipeCard";
import "../styles/home.css"

const HomeRecipe = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const data = await SearchService.searchRecipes(searchQuery);
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        {recipes.length === 0 ? (
          <p>No recipes found for "{searchQuery}"</p>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card-wrapper">
                <RecipeCard id={recipe.id} name={recipe.name} image={recipe.image} serves={recipe.serves} time={recipe.time}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeRecipe;
