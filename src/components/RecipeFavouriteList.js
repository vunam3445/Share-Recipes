import React, { useEffect, useState } from 'react';
import FavouriteService from '../services/FavouriteService';
import RecipeFavouriteCard from './RecipeFavouriteCard';
import "../styles/main.css";

function RecipeFavouriteList({ userId, token }) {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState(null); // Quản lý lỗi

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await FavouriteService.getFavourites(userId, token); // Fetch favourites
        setFavourites(data); // Update state with fetched favourites
      } catch (error) {
        console.error('Error fetching favourite list:', error);
      }
    };
    console.log(favourites)

    if (userId && token) {
      fetchFavourites(); // Only fetch if userId and token are available
    }
  }, [userId, token]);

  const handleRemoveFavourite = async (recipeId) => {
    try {
      await FavouriteService.removeFavourite(recipeId); // Remove favourite
      setFavourites((prev) => prev.filter((fav) => fav.id !== recipeId)); // Update state immediately
    } catch (error) {
      console.error('Error removing favourite:', error);
    }
  };

  const handleToggleFavourite = async (recipeId, isLiked) => {
    try {
      if (isLiked) {
        // Add to favourites
        await FavouriteService.addFavourite(recipeId);
      } else {
        // Remove from favourites
        await FavouriteService.removeFavourite(recipeId);
      }
      // Update the favourites list
      setFavourites((prev) =>
        prev.map((fav) =>
          fav.id === recipeId ? { ...fav, isFavourite: isLiked } : fav
        )
      );
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  // if (loading) {
  //   return <div>Loading your favourite recipes...</div>;
  // }

  if (error) {
    return <div>Error fetching favourite recipes: {error.message}</div>;
  }

  if (favourites.length === 0) {
    return <div>No favourite recipes found.</div>; // Show a message when no favourites are found
  }

  return (
    <div>
      <h3>Your Favourite Recipes</h3>
      <div className="uk-grid-small uk-child-width-1-3@s uk-grid-match" data-uk-grid>
        {favourites.map((recipe) => (
          <RecipeFavouriteCard
            key={recipe.id}
            id={recipe.recipeId}
            name={recipe.recipeName}
            image={recipe.recipeImage}
            serves={recipe.serves}
            time={recipe.time}
            isFavourite={recipe.isFavourite}
            onRemove={handleRemoveFavourite}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}

// export default RecipeFavouriteList;
