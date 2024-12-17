import React from "react";
import "../styles/main.css";  // Đảm bảo bạn import file CSS đã chỉnh sửa
import { Link } from "react-router-dom";

const RecipeCard = ({ name, image, recipeId, serves, time }) => {
  return (
    <Link to={`/recipe/${recipeId}`} className="uk-card" style={{ textDecoration: "none" }}>
      <div className="uk-card">
        <div className="uk-card-media-top uk-inline uk-light">
          <img
            className="uk-border-rounded-medium fixed-img" // Áp dụng lớp CSS
            src={require(`../assests/images/${image}`)} // Đảm bảo đường dẫn đúng
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
    </Link>
  );
};

export default RecipeCard;
