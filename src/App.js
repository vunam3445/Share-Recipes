
import { Routes, Route, Link } from 'react-router-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Home from './pages/home';
import Admin from './pages/admin';
import AdminCategory from './pages/adminCategory';
import AdminRecipe from './pages/adminRecipe';
import AdminOrderPage from './pages/adminOrder';
import Order from './components/Order';
import FavouritesRecipe from './pages/favouritesRecipe';
import Search from './pages/searchpage';
import Gmail from './pages/adminGmail';
import RecipeDetail from './pages/detailRecipe';
import Register from './pages/Signup';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';

import UserOrderTable from './components/Order';
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
   <Route path="/" element={<Home/>} />
    <Route path="/admin" element={<Admin/>} />
    <Route path="/admin/gmail" element={<Gmail/>} />
    <Route path="admin/category" element={<AdminCategory/>} /> 
    <Route path="/admin/recipe" element={<AdminRecipe/>} />
    <Route path='/admin/order' element={<AdminOrderPage/>} />
    <Route path="admin/recipe" element={<AdminRecipe/>} />
    <Route path="/signup" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/changepassword" element={<ChangePassword/>} />
    <Route path="/favourites" element={<FavouritesRecipe/>} />
    <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/admin/gmail" element={<Gmail/>} />
    <Route path="/order" element={<UserOrderTable />} />
    <Route path="/search" element={<Search />} />
   </Routes>
   </div>
  );
}

export default App;
