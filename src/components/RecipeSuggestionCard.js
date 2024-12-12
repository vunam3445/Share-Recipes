// src/components/RecipeCard.js
import React from "react";
import "../styles/main.css";

function RecipeSuggestionCard({ id, name, image, serves, time }) {
  return (
    <div className="uk-card">
      <div className="uk-card-media-top uk-inline uk-light">
        <img
          className="uk-border-rounded-medium"
          src={require(`../assests/images/${image}`)} // Thay "path/to/images" bằng đường dẫn chính xác đến thư mục ảnh của bạn
          alt={name}
        />
        <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
        <div className="uk-position-xsmall uk-position-top-right">
          <a href="#" className="uk-icon-button uk-like uk-position-z-index uk-position-relative" data-uk-icon="heart"></a>
        </div>
      </div>
      <div>
        <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">{name}</h3>
        <div className="info-container">
            <div className="info-item">
              <span className="uk-icon" uk-icon="user"></span>
              <span className="info-text">{serves} servings</span>
            </div>
            <div className="info-item">
              <span className="uk-icon" uk-icon="clock"></span>
              <span className="info-text">{time} mins</span>
            </div>
          </div>
      </div>
    </div>
  );
}
//fdgsdfgsfs
export default RecipeSuggestionCard;
