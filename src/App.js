import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'uikit/dist/css/uikit.min.css';  // Đảm bảo bạn đã thêm vào để UIkit styles được áp dụng




import Home from './pages/homepage';
import Search from './pages/searchpage';
import Admin from './pages/admin';  
import AdminCategory from './pages/adminCategory';
import AdminRecipe from './pages/adminRecipe';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/admin/recipe" element={<AdminRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
