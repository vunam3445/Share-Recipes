
import {Routes , Route ,Link} from 'react-router-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './App.css';
import './styles/main.css';
import './styles/home.css';
UIkit.use(Icons)

import Admin from './pages/admin';

import Home from './pages/home'

import AdminCategory from './pages/adminCategory';
import AdminRecipe  from './pages/adminRecipe';


function App() {
  return (
   
<div className='app'>
<div>
    


    </div>
   <Routes>
   <Route path="/" element={<Home />} />
   <Route path="admin" element={<Admin/>} /> 
    <Route path="admin/category" element={<AdminCategory/>} /> 
    <Route path="/admin/recipe" element={<AdminRecipe/>} />
   </Routes>
   </div>
  );
}

export default App;
