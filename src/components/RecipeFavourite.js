import React, { useEffect, useState } from 'react';
import FavouriteService from '../services/FavouriteService';
import RecipeFavouriteCard from './RecipeFavouriteCard';
import "../styles/main.css";

function RecipeFavourite({ userId }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await FavouriteService.getFavourites(userId);
        setFavourites(data);
      } catch (error) {
        console.error('Error fetching favourite list:', error);
      }
    };

    if (userId) {
      fetchFavourites();
    }
  }, [userId]);

  const handleRemoveFavourite = async (favouriteId) => {
    try {
      await FavouriteService.removeFavourite(favouriteId);
      setFavourites((prev) => prev.filter((fav) => fav.id !== favouriteId));
    } catch (error) {
      console.error('Error removing favourite:', error);
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
            onRemove={handleRemoveFavourite} // Truyền hàm xử lý xóa vào Card
          />
        ))}
      </div>
    </div>
  );
}

export default RecipeFavourite;
