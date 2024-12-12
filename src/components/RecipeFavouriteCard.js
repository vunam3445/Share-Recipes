import React, { useState } from 'react';
import "../styles/main.css";
import FavouriteService from '../services/FavouriteService';
import { Link } from "react-router-dom";

function RecipeFavouriteCard({ id, name, image, isFavourite, onRemove, onToggleFavourite }) {
  const [isLiked, setIsLiked] = useState(isFavourite);

  const handleLikeClick = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState); // Toggle the favourite state
    onToggleFavourite(id, newLikeState); // Update favourite state in the parent component
  };

  const handleRemoveClick = async (e) => {
    e.stopPropagation(); // Prevent Link navigation when removing
    try {
      // Confirm before removing
      const result = window.confirm("Are you sure?"); // Replace 'confirm' with 'window.confirm' to be more explicit
      if (result) {
        // Remove from API
        await FavouriteService.removeFavourite(id);
        // Remove from the parent's state (this should trigger a re-render)
        onRemove(id);
        window.location.reload(); // Reload the page to update the UI
      }
    } catch (error) {
      console.error('Error removing favourite:', error);
      // You can add user feedback or error messages here
    }
  };

  return (
    <div className="uk-card">
      <div className="uk-card-media-top uk-inline uk-light">
        <img
          className="uk-border-rounded-medium fixed-img"
          src={require(`../assests/images/${image}`)}
          alt={name}
        />
        <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>

        <div className="uk-position-xsmall uk-position-top-right">
          <button
            onClick={handleRemoveClick}
            className="uk-icon-button uk-like uk-position-z-index uk-position-relative"
            data-uk-icon="trash"
            aria-label="Remove from favourites"
          ></button>
        </div>

        <div className="uk-position-xsmall uk-position-top-left">
          <button
            onClick={handleLikeClick}
            className={`uk-icon-button uk-position-relative ${isLiked ? 'uk-icon-heart' : 'uk-icon-heart-empty'}`}
            aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
          ></button>
        </div>
      </div>
      <div>
        <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">{name}</h3>
      </div>
      <a href={`recipe/${id}`} className="uk-position-cover"></a>
    </div>
  );
}

export default RecipeFavouriteCard;
