import React from "react";
import Comments from "../components/Comment";

const CommentPage = () => {
  const recipeId = "1"; // Thay bằng ID công thức thực tế

  return (
    <div>
      <h1>Recipe Details</h1>
      {/* Các chi tiết khác của recipe */}
      <Comments recipeId={recipeId} />
    </div>
  );
};

export default CommentPage;
