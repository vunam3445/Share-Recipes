import React from 'react';
import "../styles/main.css";

function RecipeFavouriteCard({ id, name, image, onRemove }) {
  return (
    <div className="uk-card">
      <div className="uk-card-media-top uk-inline uk-light">
        <img
          className="uk-border-rounded-medium"
          src={`http://localhost:8083/foodwed/images/${image}`} // Đường dẫn ảnh từ API
          alt={name}
        />
        <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
        <div className="uk-position-xsmall uk-position-top-right">
          <button
            className="uk-icon-button uk-like uk-position-z-index uk-position-relative"
            data-uk-icon="heart"
            onClick={() => onRemove(id)} // Xử lý khi xóa khỏi danh sách yêu thích
          ></button>
        </div>
      </div>
      <div>
        <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">{name}</h3>
        <div className="uk-text-xsmall uk-text-muted" data-uk-grid>
          <div className="uk-width-auto uk-flex uk-flex-middle">
            <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.7"></span>
            <span className="uk-margin-xsmall-left">4.8</span>
            <span>(32)</span>
          </div>
          <div className="uk-width-expand uk-text-right">by User</div>
        </div>
      </div>
    </div>
  );
}

export default RecipeFavouriteCard;
