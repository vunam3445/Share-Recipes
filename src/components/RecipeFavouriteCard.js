import React, { useState } from 'react';
import "../styles/main.css";

function RecipeFavouriteCard({ id, name, image, isFavourite, serves, time, onRemove, onToggleFavourite }) {
  console.log(image);
  // Trạng thái "yêu thích" (true/false)
  const [isLiked, setIsLiked] = useState(isFavourite);

  // Xử lý sự kiện nhấn nút "Yêu thích"
  const handleLikeClick = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState); // Lật trạng thái yêu thích
    onToggleFavourite(id, newLikeState); // Gọi hàm xử lý từ component cha để cập nhật yêu thích
  };

  // Xử lý sự kiện nhấn nút "Xóa"
  const handleRemoveClick = () => {
    onRemove(id); // Gọi hàm xóa khi người dùng nhấn nút "Xóa"
  };

  return (
    <div className="uk-card">
      {/* Hình ảnh món ăn */}
      <div className="uk-card-media-top uk-inline uk-light">
        <img
          className="uk-border-rounded-medium fixed-img" // Áp dụng lớp CSS để làm tròn hình ảnh
          src={require(`../assets/images/${image}`)} // Đảm bảo đường dẫn hình ảnh đúng
          alt={name}
        />
        <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>

        {/* Nút "Xóa" (thùng rác) */}
        <div className="uk-position-xsmall uk-position-top-right">
          <button 
            onClick={handleRemoveClick} // Xử lý sự kiện xóa
            className="uk-icon-button uk-like uk-position-z-index uk-position-relative"
            data-uk-icon="trash"  // Biểu tượng thùng rác
            aria-label="Remove from favourites" // Mô tả cho nút xóa
          ></button>
        </div>

        {/* Nút "Yêu thích" (Trái tim) */}
        <div className="uk-position-xsmall uk-position-top-left">
          <button
            onClick={handleLikeClick} // Xử lý sự kiện yêu thích
            className={`uk-icon-button uk-position-relative ${isLiked ? 'uk-icon-heart' : 'uk-icon-heart-empty'}`} // Thay đổi icon theo trạng thái yêu thích
            aria-label={isLiked ? "Remove from favourites" : "Add to favourites"} // Mô tả cho nút yêu thích
          ></button>
        </div>
      </div>

      {/* Tiêu đề món ăn */}
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

      {/* Link tới trang chi tiết món ăn (Có thể thay đổi link này) */}
      <a href={`/recipe/${id}`} className="uk-position-cover"></a>
    </div>
  );
}

export default RecipeFavouriteCard;
