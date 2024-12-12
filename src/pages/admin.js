import { Link } from "react-router-dom";

function Admin() {
  return (
    <div>
      <h1>Welcome to Recipe Management</h1>
      <div class="menu">
        
        <Link to="/admin/category">Manage Categories</Link>
        <Link to="/admin/recipe">Manage Recipes</Link>
        <Link to="/admin/order">Manage Orders</Link>
        <Link to="/admin/gmail">Send Email</Link>
      </div>
    </div>
  );
}
export default Admin;
