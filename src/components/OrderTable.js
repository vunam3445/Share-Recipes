import React, { useEffect, useState } from "react";
import OrderService from "../services/OrderService";

const OrderTable = ({ filterStatus }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(0); // Lưu trang hiện tại
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(""); // Trạng thái lỗi

  // State để quản lý dữ liệu của đơn hàng (tạo mới hoặc chỉnh sửa)
  const [orderData, setOrderData] = useState({
    id: "",
    uid: "",
    recipeid: "",
    recipename: "",
    name: "",
    address: "",
    phone: "",
    ingredien: "",
    price: "",
    quantity: "",
    totalPrice: "",
    isactive: "0", // Mặc định trạng thái là chưa xử lý
  });

  const [isEditing, setIsEditing] = useState(false); // Kiểm tra trạng thái chỉnh sửa

  // Lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.getOrders(filterStatus, page, size);
        setOrders(data.result.content);
        setTotalPages(data.result.totalPages); // Lấy tổng số trang
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng", error);
      }
    };

    fetchOrders();
  }, [filterStatus, page, size]);

  // Hàm thay đổi dữ liệu từ form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  // Hàm tạo hoặc cập nhật đơn hàng
  const handleCreateOrder = async () => {
    if (!validateOrderData()) return; // Dừng nếu không hợp lệ
    try {
      const payload = {
        ...orderData,
        isactive: orderData.isactive === "1", // Chuyển thành boolean cho server
      };

      if (isEditing) {
        // Nếu đang chỉnh sửa
        await OrderService.updateOrder(orderData.id, payload);
      } else {
        // Nếu tạo mới
        await OrderService.createOrder(payload);
      }

      // Làm mới danh sách đơn hàng
      const data = await OrderService.getOrders(filterStatus, page, size);
      setOrders(data.result.content);

      // Reset form
      setIsEditing(false);
      setOrderData({
        id: "",
        uid: "",
        recipeid: "",
    recipename: "",
        name: "",
        address: "",
        phone: "",
        ingredien: "",
        price: "",
        quantity: "",
        totalPrice: "",
        isactive: "0", // Mặc định là chưa xử lý
      });
    } catch (error) {
      console.error("Lỗi khi tạo hoặc cập nhật đơn hàng", error);
    }
  };

  // Hàm sửa đơn hàng
  const handleEditOrder = (order) => {
    setIsEditing(true);
    setOrderData({
      ...order,
      isactive: order.isactive ? "1" : "0", // Chuyển giá trị boolean sang chuỗi
    });
  };

  // Hàm xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        await OrderService.deleteOrder(orderId);
        setOrders(orders.filter((order) => order.id !== orderId));
      } catch (error) {
        console.error("Lỗi khi xóa đơn hàng", error);
      }
    }
  };
  const validateOrderData = () => {
    const {
      uid,
      recipeid,
      recipename,
      name,
      address,
      phone,
      ingredien,
      price,
      quantity,
    } = orderData;

    if (!uid || !recipeid || !recipename || !name || !address || !phone || !ingredien || !price || !quantity) {
      alert("vui lòng nhập đầy đủ thông tin!")
      return false;
    }

    if (isNaN(price) || isNaN(quantity)) {
      setError("Giá và số lượng phải là số hợp lệ.");
      return false;
    }

    setError(""); // Xóa lỗi nếu không có vấn đề
    return true;
  };
  return (
    <div>
      <h1>Quản lý Đơn hàng</h1>

      {/* Form để nhập thông tin đơn hàng */}
      <div>
        <h2>{isEditing ? "Sửa đơn hàng" : "Tạo đơn hàng mới"}</h2>
        <form>
          <input
            type="text"
            name="uid"
            placeholder="UID"
            value={orderData.uid}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="recipeid"
            placeholder="Recipe ID"
            value={orderData.recipeid}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="recipename"
            placeholder="Recipe Name"
            value={orderData.recipename}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Tên"
            value={orderData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={orderData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={orderData.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ingredien"
            placeholder="Nguyên liệu"
            value={orderData.ingredien}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={orderData.price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Số lượng"
            value={orderData.quantity}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="totalPrice"
            placeholder="Tổng giá"
            value={orderData.totalPrice=orderData.price*orderData.quantity}
            onChange={handleInputChange}
          />

          <label>
            <input
              type="radio"
              name="isactive"
              value="0"
              checked={orderData.isactive === "0"}
              onChange={handleInputChange}
            />
            Chưa xử lý
          </label>
          <label>
            <input
              type="radio"
              name="isactive"
              value="1"
              checked={orderData.isactive === "1"}
              onChange={handleInputChange}
            />
            Đã xử lý
          </label>
    
          <button type="button" onClick={handleCreateOrder}>
            {isEditing ? "Cập nhật" : "Tạo đơn hàng"}
          </button>
        </form>
      </div>

      {/* Bảng hiển thị danh sách đơn hàng */}
      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>UID</th>
                <th>RecipeID</th>
                <th>Tên món ăn</th>
                <th>Tên khách hàng</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Nguyên liệu</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th>Thời gian đặt hàng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.uid}</td>
                    <td>{order.recipeid}</td>
                    <td>{order.recipename}</td>
                    <td>{order.name}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>{order.ingredien}</td>
                    <td>{order.price}</td>
                    <td>{order.quantity}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderTime}</td>
                    <td>
                      {order.isactive == 0
                        ? "Đơn hàng chưa được xử lý"
                        : "Đơn hàng đã xử lý"}
                    </td>
                    <td>
                      <button onClick={() => handleEditOrder(order)}>
                        Sửa
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">Không có đơn hàng nào.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="pagination">
            {/* Nút quay lại trang đầu */}
            <button onClick={() => setPage(0)} disabled={page === 0}>
              {"<<"}
            </button>

            {/* Hiển thị các trang */}
            {Array.from({ length: totalPages }).map((_, index) => {
              // Điều chỉnh phạm vi trang hiển thị xung quanh trang hiện tại
              const minPage = Math.max(0, page - 2); // Sử dụng `page` để tính toán phạm vi
              const maxPage = Math.min(totalPages - 1, page + 2); // Sử dụng `page` để tính toán phạm vi

              // Chỉ hiển thị các nút trong phạm vi tính toán
              if (index >= minPage && index <= maxPage) {
                return (
                  <button
                    key={index}
                    onClick={() => setPage(index)}
                    className={index === page ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                );
              }
              return null;
            })}

            {/* Nút tiến tới trang cuối */}
            <button
              onClick={() => setPage(totalPages - 1)}
              disabled={page === totalPages - 1}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
