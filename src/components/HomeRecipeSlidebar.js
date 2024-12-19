import React, { useState } from "react";

const RecipeSidebar = ({ onItemClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = [
    { title: "Bữa sáng", items: [ "Trứng","Bánh mì", "Bánh giò", "Bánh cuốn", "Phở"] },
    { title: "Bữa trưa", items: ["Bò","Cơm tấm", "Bún Bò", "Bánh xèo", "Gỏi cuốn", "Bún thịt nướng"] },
    { title: "Bữa tối", items: ["Lẩu gà", "Lẩu thái", "Cơm chiên", "Mì xào", "Bò kho"] },
    { title: "Ăn nhẹ", items: ["Bánh tráng trộn", "Bánh flan", "Kem dừa", "Chè thập cẩm", "Xoài lắc"] },
    { title: "Món chay", items: ["Đậu hũ chiên", "Rau xào thập cẩm", "Cơm chiên chay", "Gỏi ngó sen", "Bún riêu Chay"] },
    { title: "Đồ uống", items: ["Trà sữa", "Sinh tố", "Nước mía", "Trà chanh", "Cà phê sữa đá"] }
  ];

  const styles = {
    sidebar: { width: "213px", paddingLeft: "0px" },
    heading: { fontSize: "24px", marginBottom: "20px", textAlign: "left" },
    nav: { 
      listStyle: "none", 
      padding: 0, 
      margin: 0, 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "flex-start" 
    },
    navItem: { marginBottom: "15px", width: "100%" },
    summary: { 
      cursor: "pointer", 
      fontWeight: "bold", 
      padding: "10px 0", 
      textAlign: "left", 
      width: "100%" 
    },
    subItems: { 
      textAlign:"left",
      paddingLeft: "20px", 
      marginTop: "10px", 
      listStyle: "none", 
      display: "flex", 
      flexDirection: "column", 
      gap: "8px"  // Thêm khoảng cách giữa các mục con
    },
    subItem: { marginBottom: "8px" }, // Có thể bỏ dòng này nếu dùng gap
    link: { textDecoration: "none", color: "#333" },
  };


  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleItemClick = (item) => {
    if (onItemClick) onItemClick(item); // Gửi tên item được click lên trên
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Recipes</h2>
      <ul style={styles.nav}>
        {categories.map((category, index) => (
          <li key={index} style={styles.navItem}>
            <div 
              style={styles.summary} 
              onClick={() => handleToggle(index)}
            >
              {category.title}
            </div>
            {activeIndex === index && (
              <ul style={styles.subItems}>
                {category.items.map((item, idx) => (
                  <li key={idx} style={styles.subItem}>
                    <a href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={styles.link} 
                    onClick={() => handleItemClick(item)} // Gọi hàm khi item được click
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSidebar;
