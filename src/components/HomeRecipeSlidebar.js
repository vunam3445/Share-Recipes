import React, { useState } from "react";

const RecipeSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = [
    { title: "bữa sáng", items: ["bánh mì", "bánh giò", "bánh cuốn", "phở", "cháo lòng"] },
    { title: "bữa trưa", items: ["cơm tấm", "bún bò", "bánh xèo", "gỏi cuốn", "bún thịt nướng"] },
    { title: "bữa tối", items: ["lẩu gà", "lẩu thái", "cơm chiên", "mì xào", "bò kho"] },
    { title: "ăn nhẹ", items: ["bánh tráng trộn", "bánh flan", "kem dừa", "chè thập cẩm", "xoài lắc"] },
    { title: "món chay", items: ["đậu hũ chiên", "rau xào thập cẩm", "cơm chiên chay", "gỏi ngó sen", "bún riêu chay"] },
    { title: "đồ uống", items: ["trà sữa", "sinh tố", "nước mía", "trà chanh", "cà phê sữa đá"] }
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
                    <a href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={styles.link}>
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
