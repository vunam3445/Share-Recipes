import React, { useEffect, useState } from 'react';
import FavouriteService from '../services/FavouriteService';
import RecipeFavouriteCard from './RecipeFavouriteCard';
import "../styles/main.css";

function RecipeFavouriteList({ userId, token }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await FavouriteService.getFavourites(userId, token);
        setFavourites(data);
      } catch (error) {
        console.error('Error fetching favourite list:', error);
      }
    };

    if (userId && token) {
      fetchFavourites();
    }
  }, [userId, token]);

  const handleRemoveFavourite = async (recipeId) => {
    try {
      await FavouriteService.removeFavourite(userId, recipeId, token);
      setFavourites((prev) => prev.filter((fav) => fav.id !== recipeId));  // Cập nhật lại danh sách yêu thích
    } catch (error) {
      console.error('Error removing favourite:', error);
    }
  };

  const handleToggleFavourite = async (recipeId, isLiked) => {
    try {
      if (isLiked) {
        // Thêm vào danh sách yêu thích
        await FavouriteService.addFavourite(userId, recipeId, token);
      } else {
        // Xóa khỏi danh sách yêu thích
        await FavouriteService.removeFavourite(userId, recipeId, token);
      }
      setFavourites((prev) => prev.map((fav) => 
        fav.id === recipeId ? { ...fav, isFavourite: isLiked } : fav
      ));
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

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
            isFavourite={recipe.isFavourite}  // Truyền trạng thái yêu thích
            onRemove={handleRemoveFavourite}
            onToggleFavourite={handleToggleFavourite}  // Truyền hàm xử lý thay đổi trạng thái yêu thích
          />
        ))}
      </div>
    </div>
  );
}

export default RecipeFavouriteList;
