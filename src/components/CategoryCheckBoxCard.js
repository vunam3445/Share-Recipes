import React from "react";


const CategoryCheckBoxCard = ({ categoryName, isChecked, onToggle }) => {
  return (
    <div className="category-checkbox-card">
      <label className="category-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle} // Kích hoạt hàm khi checkbox được thay đổi
        />
        <span className="category-name">{categoryName}</span>
      </label>
    </div>
  );
};


export default CategoryCheckBoxCard;
