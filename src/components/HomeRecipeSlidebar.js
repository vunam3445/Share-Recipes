import React, { useState } from "react";

const RecipeSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = [
    { title: "Dish Type", items: ["Appetizers & Snacks", "Bread Recipes", "Cake Recipes", "Candy and Fudge", "Casserole Recipes", "Christmas Cookies", "Cocktail Recipes", "Main Dishes", "Pasta Recipes", "Pie Recipes", "Sandwiches"] },
    { title: "Meal Type", items: ["Breakfast and Brunch", "Desserts", "Dinners", "Lunch"] },
    { title: "Diet and Health", items: ["Diabetic", "Gluten Free", "High Fiber Recipes", "Low Calorie"] },
    { title: "World Cuisine", items: ["Chinese", "Indian", "Italian", "Mexican"] },
    { title: "Seasonal", items: ["Baby Shower", "Birthday", "Christmas", "Halloween"] },
  ];

  const styles = {
    sidebar: { width: "25%", paddingLeft: "100px" },
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
    details: { fontSize: "18px", width: "100%" },
    summary: { 
      cursor: "pointer", 
      fontWeight: "bold", 
      padding: "10px 0", 
      textAlign: "left", 
      width: "100%" 
    },
    subItems: { paddingLeft: "20px", marginTop: "10px", listStyle: "none" },
    subItem: { marginBottom: "8px" },
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
            <details 
              style={styles.details} 
              open={activeIndex === index}
              onClick={() => handleToggle(index)}
            >
              <summary style={styles.summary}>{category.title}</summary>
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
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSidebar;
