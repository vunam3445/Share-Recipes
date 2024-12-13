import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchService from "../services/SearchService"; // Ensure the service exists for fetching recipes based on search
import RecipeCard from "../components/RecipeCard"; // Make sure RecipeCard is a functional component that displays recipe data

const HomeRecipe = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch recipes based on the selected recipe name (searchQuery)
  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const data = await SearchService.searchRecipes(searchQuery); // Assuming SearchService has a searchRecipes function
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  // Trigger the search when the component mounts or when searchQuery changes
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
        {/* Display recipes if found */}
        {recipes.length === 0 ? (
          <p>No recipes found for "{searchQuery}"</p>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <RecipeCard name={recipe.name} image={recipe.image} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeRecipe;
