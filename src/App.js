
import {Routes , Route ,Link} from 'react-router-dom';
// import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Admin from './pages/admin';
import Home from './pages/home'
import AdminCategory from './pages/adminCategory';
import AdminOrderPage from './pages/adminOrder';
<<<<<<< HEAD
import Order from './components/Order';
=======
import AdminRecipe from './pages/adminRecipe';
>>>>>>> 22a346b24601090994702a3d191f78af29ca2d03
import Search from './pages/searchpage';
import RecipeDetail from './pages/detailRecipe';
import './App.css';
import './styles/main.css';
import './styles/home.css';
<<<<<<< HEAD

UIkit.use(Icons) 
=======
import Register from './pages/Signup';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
UIkit.use(Icons)
>>>>>>> 22a346b24601090994702a3d191f78af29ca2d03

function App() {
  return (
   
<div className='app'>
<div>
<<<<<<< HEAD
   
    </div>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<Search />} />
    <Route path="/order" element={<Order />} />
    <Route path="/admin" element={<Admin />} />
=======
    


    </div>
   <Routes>
   <Route path="/" element={<Home/>} />
    <Route path="/admin" element={<Admin/>} />
>>>>>>> 22a346b24601090994702a3d191f78af29ca2d03
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
