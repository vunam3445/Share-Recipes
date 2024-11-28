
import {Routes , Route ,Link} from 'react-router-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './styles/main.css';
import Admin from './pages/admin';
import AdminCategory from './pages/adminCategory';
import AdminRecipe  from './pages/adminRecipe';
import RecipeDetail from './pages/detailRecipe';
UIkit.use(Icons)

function App() {
  return (
   
<div className='app'>
<div>
    


    </div>
   <Routes>
   <Route path="/admin" element={<Admin />} />
    <Route path="admin/category" element={<AdminCategory/>} /> 
    <Route path="admin/recipe" element={<AdminRecipe/>} />
    <Route path="/" element={<RecipeDetail/>} />
   </Routes>
   </div>
  );
}

export default App;
