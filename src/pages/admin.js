import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getUserFromToken } from "../components/readtoken";

function Admin() {
  const navigate = useNavigate(); // Gọi useNavigate ở đây

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Không có token -> chuyển hướng về Home
        return;
      }
      const decoder = getUserFromToken(token); // Truyền token vào hàm nếu cần
      const role = decoder.scope;
      if (role !== "ADMIN") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying user role:", error);
      navigate("/"); // Lỗi khi giải mã token -> chuyển hướng về Home
    }
  }, [navigate]);
  

  return (
    <div>
      <h1>Welcome to Recipe Management</h1>
      <div className="menu">
        <Link to="/admin/category">Manage Categories</Link>
        <Link to="/admin/recipe">Manage Recipes</Link>
        <Link to="/admin/order">Manage Orders</Link>
        <Link to="/admin/gmail">Send Email</Link>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default Admin;
