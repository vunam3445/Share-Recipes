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
        setLoading(true); // Bắt đầu trạng thái loading
        const data = await FavouriteService.getUserFavourites(userId, token);
        setFavourites(data);
      } catch (err) {
        console.error('Error fetching favourite list:', err);
        setError(err); // Lưu lỗi vào trạng thái
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    if (userId && token) {
      fetchFavourites();
    }
  }, [userId, token]);

  const handleRemoveFavourite = async (recipeId) => {
    try {
      await FavouriteService.deleteFavourite(userId, recipeId, token);
      setFavourites((prev) => prev.filter((fav) => fav.id !== recipeId));
    } catch (error) {
      console.error('Error removing favourite:', error);
    }
  };

  const handleToggleFavourite = async (recipeId, isLiked) => {
    try {
      if (isLiked) {
        await FavouriteService.addFavourite(userId, recipeId, token);
      } else {
        await FavouriteService.deleteFavourite(userId, recipeId, token);
      }
      setFavourites((prev) =>
        prev.map((fav) =>
          fav.id === recipeId ? { ...fav, isFavourite: isLiked } : fav
        )
      );
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  if (loading) {
    return <div>Loading your favourite recipes...</div>;
  }

  if (error) {
    return <div>Error fetching favourite recipes: {error.message}</div>;
  }

  if (favourites.length === 0) {
    return <div>No favourite recipes found.</div>;
  }

  return (
    <div>
      <h3>Your Favourite Recipes</h3>
      <div className="uk-grid-small uk-child-width-1-3@s uk-grid-match" data-uk-grid>
        {favourites.map((recipe) => (
          <RecipeFavouriteCard
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            isFavourite={recipe.isFavourite}
            onRemove={handleRemoveFavourite}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}

export default RecipeFavouriteList;
