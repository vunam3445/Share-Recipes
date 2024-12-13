import React, { useEffect, useState } from 'react';
import RecipeService from '../services/RecipeService';
import { useParams } from "react-router-dom";
import Comments from "../components/Comment";
import FavouriteService from '../services/FavouriteService';
import { getUserFromToken } from "../components/readtoken";
import RecipeSuggestionList from './RecipeSuggestionList';


const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);  // Trạng thái lưu các bước đã hoàn thành
  const [completedIngredients, setCompletedIngredients] = useState([]);  // Trạng thái lưu các nguyên liệu đã chọn
  const [isSaved, setIsSaved] = useState(false); // Trạng thái "saved"
  const [isInCart, setIsInCart] = useState(false); // Trạng thái "giỏ hàng"
   /**
 * Hàm tiện ích để lấy token từ localStorage
 * @returns {string|null} Token hoặc null nếu không tồn tại
 */
const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Hàm tiện ích để lấy userId từ token
 * @returns {string|null} UserId hoặc null nếu không thể giải mã
 */
const getUserId = () => {
  const token = getToken();
  if (token) {
    const decoder = getUserFromToken(token); // Cần phải pass token vào getUserFromToken
    return decoder?.userid || null; // Trả về userId nếu tồn tại
  }
  return null;
};
  const [isFormVisible, setIsFormVisible] = useState(false); // Trạng thái hiển thị form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFormVisibility = () => setIsFormVisible(prev => !prev);
  const decoder = getUserFromToken();
  const userId = decoder.userid;

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
   const toggleSave = async () => {
    try {
      // Kiểm tra xem đã có userId và token chưa
      const token = getToken();
      const userId = getUserId();
      
      if (!userId || !token) {
        console.error('User ID and token are required.');
        return;
      }
  
      // Gọi hàm addFavourite từ FavouriteService để thêm vào danh sách yêu thích
      const result = await FavouriteService.addFavourite(recipeId);
  
      if (result) {
        // Nếu thêm thành công, đảo trạng thái "Saved"
        setIsSaved(prev => !prev);
      }
    } catch (error) {
      console.error('Lỗi khi thêm vào yêu thích:', error);
    }
  };
  

  // Hàm xử lý khi người dùng thêm vào giỏ hàng
  const toggleCart = () => {
    setIsInCart(prev => !prev); // Đảo trạng thái "In Cart"
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Tạo đối tượng orderData
    const orderData = {
      uid: userId,
      recipeid: recipeId,
      recipename: recipe.name,
      ...formData,
      price: recipe.price,
      ingredien: recipe.ingredien,
      totalPrice: recipe.price * formData.quantity,
      isactive: false
    };
  
    try {
      const token = localStorage.getItem('token');
  
      // Kiểm tra xem token có tồn tại không
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
  
      // Gửi yêu cầu POST với token trong headers
      const response = await fetch('http://localhost:8083/foodwed/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
  
      if (response.ok) {
        // Đặt trạng thái để đóng form và hiển thị thông báo thành công
        setIsFormVisible(false);
        alert('Order placed successfully!');
      } else {
        // Xử lý lỗi
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
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
            <img className="uk-border-rounded-large" src={require(`../assests/images/${recipe.image}`)} alt={recipe.name} />
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
                  <span>{recipe.price} USD</span>
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
                    onClick={toggleFormVisibility}
                  >
                    <span data-uk-icon="icon: shopping-cart; ratio: 1.5"></span> 
                    Add to Cart
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

{/* Form Overlay */}
{isFormVisible && (
  <div className="overlay" onClick={toggleFormVisibility}>
    <div className="form-container" onClick={e => e.stopPropagation()}>
      <h3>Enter your information</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" placeholder="Your phone number" value={formData.phone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea name="address" placeholder="Your address" value={formData.address} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input type="number" name="quantity" placeholder="Enter quantity" min="1" value={formData.quantity} onChange={handleInputChange} />
        </div>
        {/* Additional info */}
        <div className="form-group">
          <label>Total Price:</label>
          <span>{`$${(formData.quantity * recipe.price).toFixed(2)}`}</span>
        </div>

        {/* Check if all required fields are filled */}
        {!formData.name || !formData.phone || !formData.address || !formData.quantity ? (
          <div className="error-message">Please fill in all required fields before submitting.</div>
        ) : null}

        <button type="submit" className="uk-button uk-button-primary" disabled={!formData.name || !formData.phone || !formData.address || !formData.quantity}>
          Submit
        </button>
      </form>
    </div>
  </div>
)}


      {/* Comments Section */}
      <div className="uk-section uk-section-muted">
        <div className="uk-container uk-container-small">
          <Comments recipeId={recipeId} />
        </div>
      </div>

      {/* Recipe Suggestions */}
      <div className="uk-section uk-section-default">
        <div className="uk-container uk-container-small">
          <RecipeSuggestionList categories={categories} currentRecipeId={recipeId} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
