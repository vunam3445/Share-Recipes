
import {Routes , Route ,Link} from 'react-router-dom';
import './App.css';

import Admin from './pages/admin';

import AdminCategory from './pages/adminCategory';
import AdminRecipe  from './pages/adminRecipe';
import RecipeDetail from './components/RecipeDetail';


function App() {
  return (
   
<div className='app'>
<div>
    


    </div>
   <Routes>
   <Route path="/admin" element={<Admin />} />
    <Route path="admin/category" element={<AdminCategory/>} /> 
    <Route path="admin/recipe" element={<AdminRecipe/>} />
    <Route path="recipe/detail" element={<RecipeDetail/>} />
   </Routes>
   </div>
  );
}

export default App;
