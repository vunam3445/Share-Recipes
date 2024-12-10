
import { Routes, Route, Link } from 'react-router-dom';
import Admin from './pages/admin';
import AdminCategory from './pages/adminCategory';
import AdminOrderPage from './pages/adminOrder';
import AdminRecipe from './pages/adminRecipe';
import Search from './pages/searchpage';
import RecipeDetail from './pages/detailRecipe';
import RecipeList from './pages/home';
import RecipeFavouriteList from './pages/favouritesRecipe';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './App.css';
import './styles/main.css';
import './styles/home.css';
UIkit.use(Icons) 

function App() {
  return (
   
<div className='app'>
<div>
   


    </div>
   <Routes>
    <Route path="/admin" element={<Admin />} />
    <Route path="admin/category" element={<AdminCategory/>} /> 
    <Route path="/admin/recipe" element={<AdminRecipe/>} />
    <Route path='/admin/order' element={<AdminOrderPage/>} />
    <Route path="admin/recipe" element={<AdminRecipe/>} />
    <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
    <Route path='/recipeList' element={<RecipeList/>}/>
    <Route path='/' element={<RecipeFavouriteList/>}/>
   </Routes>
   </div>
  );
}

export default App;
