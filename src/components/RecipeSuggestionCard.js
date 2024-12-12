// src/components/RecipeCard.js
import React from "react";
import "../styles/main.css";

function RecipeSuggestionCard({ id, name, image }) {
  return (
    <div
      class=""
      data-uk-grid
    >
      <div>
        <div className="uk-card">
          <div className="uk-card-media-top uk-inline uk-light">
            <img
              className="uk-border-rounded-medium"
              src={require(`../assests/images/${image}`)} // Thay "path/to/images" bằng đường dẫn chính xác đến thư mục ảnh của bạn
              alt={name}
            />
            <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
            <div className="uk-position-xsmall uk-position-top-right">
              <a
                href="#"
                className="uk-icon-button uk-like uk-position-z-index uk-position-relative"
                data-uk-icon="heart"
              ></a>
            </div>
          </div>
          <div>
            <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">
              {name}
            </h3>
            <div className="uk-text-xsmall uk-text-muted" data-uk-grid>
              <div className="uk-width-auto uk-flex uk-flex-middle">
                <span
                  className="uk-rating-filled"
                  data-uk-icon="icon: star; ratio: 0.7"
                ></span>
                <span className="uk-margin-xsmall-left">5.0</span>
                <span>(73)</span>
              </div>
              <div className="uk-width-expand uk-text-right">
                by John Keller
              </div>
            </div>
          </div>
          <a
            href={`recipe/recipeDetail/${id}`}
            className="uk-position-cover"
          ></a>
        </div>
      </div>
    </div>
  );
}
//fdgsdfgsfs
export default RecipeSuggestionCard;
