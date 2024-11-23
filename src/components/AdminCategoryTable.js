import React from "react";

function AdminCategoryTable({
  categories,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) {
  // Tạo các nút để chuyển trang
  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(0); // Gọi hàm onPageChange với trang trước đó
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(totalPages - 1); // Gọi hàm onPageChange với trang tiếp theo
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page); // Gọi hàm onPageChange với trang được chọn
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Category</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryid}>
              <td>{category.categoryid}</td>
              <td>{category.name}</td>
              <td>
                <button
                  onClick={() => onEdit(category.categoryid, category.name)}
                >
                  Sửa
                </button>
                <button onClick={() => onDelete(category.categoryid)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          {"<<"}
        </button>

        {/* Hiển thị các số trang */}
        {Array.from({ length: totalPages }).map((_, index) => {
          // Tính toán phạm vi hiển thị trang
          if (index >= currentPage - 2 && index <= currentPage + 2) {
            return (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={index === currentPage ? "active" : ""}
              >
                {index + 1}
              </button>
            );
          }
          return null;
        })}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default AdminCategoryTable;
