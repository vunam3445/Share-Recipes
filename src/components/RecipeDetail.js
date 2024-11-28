import React, { useEffect, useState } from 'react';
import RecipeService from '../services/RecipeService';

const RecipeDetail = () => {
  const recipeId = "ffc66d99-0cd6-42c4-a065-b2ed831b5fcd";  // Dùng recipeId cố định
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);  // Trạng thái lưu các bước đã hoàn thành
  const [completedIngredients, setCompletedIngredients] = useState([]);  // Trạng thái lưu các nguyên liệu đã chọn
  const [price, setPrice] = useState(100);  // Giá cố định, sẽ cập nhật sau
  const [isSaved, setIsSaved] = useState(false); // Trạng thái "saved"
  const [isInCart, setIsInCart] = useState(false); // Trạng thái "giỏ hàng"

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) {
        console.error("Recipe ID is required.");
        return;
      }

      try {
        const data = await RecipeService.detailRecipe(recipeId);
        const { recipe, categories } = data.result;

        // Tách nguyên liệu và các bước thành mảng
        recipe.ingredientsArray = recipe.ingredien.split(';').map(item => item.trim());
        recipe.stepsArray = recipe.step.split(';').map(item => item.trim());
        setRecipe(recipe);
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  // Hàm xử lý khi người dùng tích vào bước
  const toggleStepCompletion = (index) => {
    setCompletedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Hàm xử lý khi người dùng tích vào nguyên liệu
  const toggleIngredientCompletion = (index) => {
    setCompletedIngredients(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Hàm xử lý khi người dùng nhấn vào Save
  const toggleSave = () => {
    setIsSaved(prev => !prev); // Đảo trạng thái "Saved"
  };

  // Hàm xử lý khi người dùng thêm vào giỏ hàng
  const toggleCart = () => {
    setIsInCart(prev => !prev); // Đảo trạng thái "In Cart"
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Recipe Details */}
      <div className="uk-container">
        <div data-uk-grid>
          <div className="uk-width-1-2@s">
            <img className="uk-border-rounded-large" src={`http://localhost:8083/foodwed/images/${recipe.image}`} alt={recipe.name} />
          </div>
          <div className="uk-width-expand@s uk-flex uk-flex-middle">
            <div>
              <h1>{recipe.name}</h1>
              <p>{recipe.description || 'No description provided.'}</p>
              <div className="uk-margin-medium-top uk-child-width-expand uk-text-center uk-grid-divider" data-uk-grid>
                <div>
                  <span data-uk-icon="icon: clock; ratio: 1.4"></span>
                  <h5>Time</h5>
                  <span>{recipe.time} mins</span>
                </div>
                <div>
                  <span data-uk-icon="icon: users; ratio: 1.4"></span>
                  <h5>Serves</h5>
                  <span>{recipe.serves}</span>
                </div>
                <div>
                  <span data-uk-icon="icon: credit-card; ratio: 1.4"></span>
                  <h5>Price</h5>
                  <span>{price} USD</span>
                </div>
              </div>
              <hr />
              {/* Save and Cart Buttons */}
              <div className="uk-grid-small uk-child-width-auto" data-uk-grid>
                <div>
                  <button 
                    className="uk-button uk-button-primary"
                    onClick={toggleSave}
                  >
                    <span data-uk-icon={`icon: ${isSaved ? 'heart' : 'heart-o'}; ratio: 1.5`} style={{ color: isSaved ? 'red' : 'gray' }}></span> 
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
                <div>
                  <button 
                    className="uk-button uk-button-default"
                    onClick={toggleCart}
                  >
                    <span data-uk-icon="icon: shopping-cart; ratio: 1.5"></span> 
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps and Ingredients */}
      <div className="uk-section uk-section-default">
        <div className="uk-container uk-container-small">
          <div className="uk-grid uk-grid-small" data-uk-grid>
            {/* Steps - Bên trái */}
            <div className="uk-width-1-2@s uk-text-left">
              <h3>How to Make It</h3>
              {recipe.stepsArray.map((step, index) => (
                <div key={index} className="uk-grid-small uk-margin-medium-top" data-uk-grid>
                  <div className="uk-width-auto">
                    <a 
                      href="#"
                      className={`uk-step-icon ${completedSteps.includes(index) ? 'uk-icon-check-circle' : 'uk-icon-circle'}`}
                      data-uk-icon="icon: check; ratio: 0.8"
                      style={{ color: completedSteps.includes(index) ? 'green' : 'orange' }}
                      onClick={() => toggleStepCompletion(index)}
                    ></a>
                  </div>
                  <div className="uk-width-expand">
                    <h5 className="uk-step-title uk-text-500 uk-text-uppercase uk-text-primary">{index + 1}. Step</h5>
                    <div className="uk-step-content">{step}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ingredients - Bên phải */}
            <div className="uk-width-1-2@s uk-text-left">
              <h3>Ingredients</h3>
              <ul className="uk-list uk-list-large uk-list-divider uk-margin-medium-top">
                {recipe.ingredientsArray.map((ingredient, index) => (
                  <li key={index}>
                    <span
                      className={`uk-icon ${completedIngredients.includes(index) ? 'uk-icon-check-circle' : 'uk-icon-circle'}`}
                      style={{ color: completedIngredients.includes(index) ? 'green' : 'orange' }}
                      onClick={() => toggleIngredientCompletion(index)}
                    >
                      <i className="fa fa-check"></i>
                    </span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="uk-container uk-margin-top">
        <div className="uk-grid-small uk-child-width-auto" data-uk-grid>
          <div className="uk-width-1-1">
            <h3>Categories</h3>
            <div className="uk-margin-medium-top">
              {categories.map((category) => (
                <a
                  key={category.categoryid}
                  href="#"
                  className="uk-label uk-label-primary uk-margin-small-right"
                  style={{ marginBottom: '5px' }}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
