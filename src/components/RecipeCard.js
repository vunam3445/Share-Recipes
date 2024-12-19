import React, { useState, useEffect } from "react";
import "../styles/main.css";
import { Link } from "react-router-dom";
import "../styles/RecipeCard.css";
import FavouriteService from "../services/FavouriteService";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { getUserFromToken } from "../components/readtoken";


const RecipeCard = ({ id, name, image, serves, time }) => {
  const [isLiked, setIsLiked] = useState(false); // Trạng thái yêu thích cục bộ
  const [loading, setLoading] = useState(true);

  // Hàm lấy token từ localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Lấy userId từ token
  const getUserId = () => {
    const token = getToken();
    if (token) {
      const decoder = getUserFromToken(token);
      return decoder?.userid || null;
    }
    return null;
  };

  // Gọi API kiểm tra trạng thái yêu thích khi component mount
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const token = getToken();
        const userId = getUserId();

        if (!token || !userId) {
          setIsLiked(false);
          return;
        }

        const result = await FavouriteService.isExit(id); // Gọi API kiểm tra trạng thái
        setIsLiked(result); // Cập nhật trạng thái yêu thích
      } catch (error) {
        console.error("Error checking favourite status:", error);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    checkIfSaved();
  }, [id]);

  // Hàm xử lý click yêu thích
    const handleLikeClick = async (e) => {
      e.preventDefault();

      const token = getToken();
      const userId = getUserId();

      if (!userId || !token) {
          toast.error('Vui lòng đăng nhập để thêm vào yêu thích.');
          return;
      }

      const newLikeState = !isLiked;
      setIsLiked(newLikeState);

      try {
          if (newLikeState) {
              await FavouriteService.addFavourite(id); // Thêm vào danh sách yêu thích
              toast.success("Đã thêm vào danh sách yêu thích!");
          } else {
              await FavouriteService.removeFavourite(id); // Xóa khỏi danh sách yêu thích
              toast.success("Đã xóa khỏi danh sách yêu thích!");
          }
      } catch (error) {
          console.error("Error toggling favourite:", error);
          setIsLiked(!newLikeState); // Reset trạng thái nếu lỗi
          toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="uk-card">
      <div className="uk-card-media-top uk-inline uk-light">
        <img
          className="uk-border-rounded-medium fixed-img"
          src={require(`../assests/images/${image}`)} // Đường dẫn hình ảnh
          alt={name}
        />
        <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
        <div className="uk-position-xsmall uk-position-top-right">
          <button
            onClick={handleLikeClick}
            className={`uk-icon-button ${
              isLiked ? "uk-button-danger" : "uk-button-default"
            }`}
            data-uk-icon="heart"
            aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
          ></button>
        </div>
      </div>
      <Link to={`/recipe/${id}`} className="uk-card-body">
        <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">
          {name}
        </h3>
        <div className="info-container">
          <div className="info-item">
            <span className="uk-icon" uk-icon="user"></span>
            <span className="info-text">{serves} serves</span>
          </div>
          <div className="info-item">
            <span className="uk-icon" uk-icon="clock"></span>
            <span className="info-text">{time} mins</span>
          </div>
        </div>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default RecipeCard;
