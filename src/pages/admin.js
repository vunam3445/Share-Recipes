import { Link } from "react-router-dom";

function Admin() {
  return (
    <div>
      <h1>Welcome to Recipe Management</h1>
      <div class="menu">
        
        <Link to="/admincategory">Manage Categories</Link>
        <Link to="/adminrecipe">Manage Recipes</Link>
      </div>
    </div>
  );
}
export default Admin;
