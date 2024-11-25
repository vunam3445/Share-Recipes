import React, { useEffect, useState } from "react";
import CategoryCheckBoxCard from "./CategoryCheckBoxCard";
import CategoryService from "../services/CategoryService";

const ListCategoryCheckBox = ({ selectedCategories, onCategoryChange }) => {
  const [categories, setCategories] = useState([]); // Lưu trữ danh sách category

  // Hàm lấy dữ liệu từ API
  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getCategories(0, 999999);
      setCategories(data.content); // Lưu danh sách categories vào state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h3>Danh sách Category:</h3>
      <div className="scrollable">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCheckBoxCard
              key={category.categoryid}
              categoryName={category.name}
              isChecked={selectedCategories.includes(category.categoryid)}
              onToggle={() => onCategoryChange(category.categoryid)}
            />
          ))
        ) : (
          <p>Đang tải danh sách categories...</p>
        )}
      </div>
      <div>
        <h4>Categories đã chọn:</h4>
        <ul>
          {selectedCategories.map((id) => {
            const category = categories.find((cat) => cat.categoryid === id);
            return category ? <li key={id}>{category.name}</li> : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ListCategoryCheckBox;
