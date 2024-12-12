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
      // Gọi API xóa công thức từ yêu thích
      await FavouriteService.removeFavourite(id); // Gọi API từ service để xóa món ăn khỏi danh sách yêu thích
      
      // Sau khi xóa thành công, cập nhật danh sách trong component cha
      onRemove(id); // Gọi hàm onRemove từ component cha để cập nhật lại state (xóa khỏi danh sách yêu thích trong state của parent component)
    } catch (error) {
      console.error('Error removing favourite:', error);
      // Bạn có thể thêm thông báo lỗi cho người dùng ở đây nếu cần
    }
  };


  return (
    <Link to={`/recipe/${id}`} className="uk-card" style={{ textDecoration: "none" }}>
      <div className="uk-card">
        <div className="uk-card-media-top uk-inline uk-light">
          <img
            className="uk-border-rounded-medium fixed-img" // Apply custom CSS class
            src={require(`../assests/images/${image}`)} // Ensure the image path is correct
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
      </div>
    </Link>
  );
}

export default RecipeFavouriteCard;
