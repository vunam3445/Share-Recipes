
import {Routes , Route ,Link} from 'react-router-dom';
// import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Admin from './pages/admin';
import Home from './pages/home'
import AdminCategory from './pages/adminCategory';
import AdminOrderPage from './pages/adminOrder';
import AdminRecipe from './pages/adminRecipe';
import Search from './pages/searchpage';
import RecipeDetail from './pages/detailRecipe';
import './App.css';
import './styles/main.css';
import './styles/home.css';
import Register from './pages/Signup';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
UIkit.use(Icons)

function App() {
  return (
   
<div className='app'>
<div>
    


    </div>
   <Routes>
   <Route path="/" element={<Home/>} />
    <Route path="/admin" element={<Admin/>} />
    <Route path="admin/category" element={<AdminCategory/>} /> 
    <Route path="/admin/recipe" element={<AdminRecipe/>} />
    <Route path='/admin/order' element={<AdminOrderPage/>} />
    <Route path="admin/recipe" element={<AdminRecipe/>} />
    <Route path="/signup" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/changepassword" element={<ChangePassword/>} />
    <Route path="/detail" element={<RecipeDetail/>} />
  
   </Routes>
   </div>
  );
}

export default App;
