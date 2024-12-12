import React, { useEffect, useState } from 'react';
import orderService from '../services/OrderService';
import Navbar from '../components/Navbar';
import Footer from '../components/HomeFooter';
import '../styles/orderlist.css';
import { getUserFromToken } from "../components/readtoken";
import ModalLogin from '../components/modallogin'; // Import ModalLogin
import { useNavigate } from "react-router-dom";
import OrderDetailModal from '../components/OrderDetail'; // Import OrderDetailModal

const UserOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // State cho modal
  const [selectedOrder, setSelectedOrder] = useState(null); // State để lưu đơn hàng đã chọn

  const fetchOrders = async (page = 0, size = 6) => {
    const decoder = getUserFromToken();
    if (!decoder) {
      setError("Vui lòng đăng nhập để xem đơn hàng.");
      setShowLoginModal(true); // Hiển thị modal khi chưa đăng nhập
      return;
    }
    const userId = decoder.userid;
    setLoading(true);
    setError(null);
    try {
      const result = await orderService.getOrderByUser(userId, page, size);
      setOrders(result.content);
      setPageNumber(result.pageNumber);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error(err);
      setError('Có lỗi khi lấy danh sách đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(pageNumber);
  }, [pageNumber]);

  const handlePreviousPage = () => {
    if (pageNumber > 0) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages - 1) setPageNumber(pageNumber + 1);
  };

  const handleOrderClick = async (orderId) => {
    const user = getUserFromToken();
    if (!user) {
      setShowLoginModal(true); // Hiển thị modal khi chưa đăng nhập
      return;
    }

    // Gọi API để lấy chi tiết đơn hàng
    try {
      const response = await orderService.getOrderDetail(orderId); // API lấy chi tiết đơn hàng
      setSelectedOrder(response.result); // Cập nhật order được chọn
    } catch (error) {
      console.error('Có lỗi khi lấy chi tiết đơn hàng', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="order-page uk-container">
        <h2>Danh sách đơn hàng</h2>
        {loading ? (
          <p className="loading">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Tên người đặt</th>
                  <th>Combo Món ăn</th>
<th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
                    <td>{order.uname}</td>
                    <td>{order.recipename}</td>
                    <td>{order.totalPrice.toLocaleString()} VND</td>
                    <td className={order.isactive ? 'status-active' : 'status-inactive'}>
                      {order.isactive ? 'Đã giao' : 'Chờ giao hàng'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={pageNumber === 0}>
                Trang trước
              </button>
              <button onClick={handleNextPage} disabled={pageNumber >= totalPages - 1}>
                Trang sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hiển thị Modal khi chưa đăng nhập */}
      <ModalLogin show={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Hiển thị Modal chi tiết đơn hàng */}
      <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />

      <Footer />
    </div>
  );
};

export default UserOrderTable;