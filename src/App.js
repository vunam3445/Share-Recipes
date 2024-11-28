
import {Routes , Route ,Link} from 'react-router-dom';
// import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './App.css';
import './styles/main.css';

import Admin from './pages/admin';

import AdminCategory from './pages/adminCategory';
import AdminRecipe  from './pages/adminRecipe';

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
   <Route path="" element={<Login/>} />
    <Route path="admin/category" element={<AdminCategory/>} /> 
    <Route path="admin/recipe" element={<AdminRecipe/>} />
    <Route path="/signup" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/changepassword" element={<ChangePassword/>} />
   </Routes>
   </div>
  );
}

export default App;
