import React, { useState } from "react";
import { Link } from "react-router-dom";
import OrderTable from "../components/OrderTable";

const AdminOrderPage = () => {
  const [activeTab, setActiveTab] = useState("0");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log(tab); // Debugging, check the activeTab
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", padding: "20px", borderRight: "1px solid #ccc" }}>
        <h3>Quản lý đơn hàng</h3>
        <Link to={"/admin"}>Trở về trang chủ</Link>
        <ul>
          <li>
            <button onClick={() => handleTabChange("0")}>Đơn hàng chưa xử lý</button>
          </li>
          <li>
            <button onClick={() => handleTabChange("1")}>Đơn hàng đã xử lý</button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <OrderTable filterStatus={activeTab} />
      </div>
    </div>
  );
};

export default AdminOrderPage;
