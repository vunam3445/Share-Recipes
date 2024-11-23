import { Link } from "react-router-dom";
import AdminRecipeCss from "../styles/adminRecipeCss.css";
function AdminRecipe() {
  return (
    <div class="container">
      
      <h1>Quản lý Recipe</h1>
      <Link to="/">Trở về trang chủ</Link>

      <div class="form-group">
        <label for="recipeName">Tên Recipe:</label>
        <input type="text" id="recipeName" placeholder="Nhập tên recipe" />

        <label for="description">Mô tả:</label>
        <textarea
          id="description"
          placeholder="Nhập mô tả về món ăn"
        ></textarea>

        <label for="ingredients">Nguyên liệu:</label>
        <textarea
          id="ingredients"
          placeholder="Nhập nguyên liệu, ngăn cách bởi dấu phẩy"
        ></textarea>

        <label for="steps">Các bước nấu:</label>
        <textarea
          id="steps"
          placeholder="Nhập các bước nấu ăn, ngăn cách bởi dấu phẩy"
        ></textarea>

        <label for="image">Chọn ảnh món ăn:</label>
        <input type="file" id="image" accept="image/*" />

        <label for="time">Thời gian nấu (phút):</label>
        <input type="number" id="time" placeholder="Nhập thời gian nấu ăn" />

        <label for="serves">Số lượng người phục vụ:</label>
        <input type="number" id="serves" placeholder="Nhập số người phục vụ" />

        <label>Chọn Category:</label>
        <div id="categoryCheckboxes"></div>

        <div id="selectedCategories">
          Category đã chọn: <span id="selectedCategoryNames"></span>
        </div>

        <button onclick="addRecipe()">Thêm Recipe</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Recipe</th>
            <th>Mô tả</th>
            <th>Nguyên liệu</th>
            <th>Các bước</th>
            <th>Ảnh</th>
            <th>Thời gian</th>
            <th>Phục vụ</th>
            <th>Categories</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody id="recipeTableBody"></tbody>
      </table>
    </div>
  );
}
export default AdminRecipe;
