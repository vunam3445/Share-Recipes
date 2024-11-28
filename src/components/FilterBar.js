import React, { useEffect, useState } from 'react';
import "../styles/filterbar.css";

const FilterBar = ({ categories, selectedCategory, onCategoryChange }) => {
  const [selectedCategoryState, setSelectedCategoryState] = useState(selectedCategory);

  // Lắng nghe sự thay đổi từ bên ngoài và cập nhật selectedCategoryState
  useEffect(() => {
    setSelectedCategoryState(selectedCategory);
  }, [selectedCategory]);

  const handleRadioChange = (categoryId) => {
    setSelectedCategoryState(categoryId);  // Cập nhật state của category
    onCategoryChange(categoryId);  // Gọi callback để thay đổi category ở component cha
  };

  return (
    <div className="filter-bar">
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} className="category-item">
            <label>
              <input
                type="radio"
                name="category"
                checked={selectedCategoryState === category.id}  // Kiểm tra xem category có được chọn không
                onChange={() => handleRadioChange(category.id)}  // Khi thay đổi category
              />
              {category.name}
            </label>
          </div>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};

export default FilterBar;
