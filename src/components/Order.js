  import React, { useEffect, useState } from 'react';
  import orderService from '../services/OrderService';
  import Navbar from '../components/Navbar';
  import Footer from '../components/HomeFooter';
  import '../styles/orderlist.css';
  import { getUserFromToken } from "../components/readtoken";
  import ModalLogin from '../components/modallogin';
  import OrderDetailModal from '../components/OrderDetail';

  const UserOrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filter, setFilter] = useState('all'); // Default filter state is "all"

    const fetchOrders = async (page = 0, size = 6) => {
      const decoder = getUserFromToken();
      if (!decoder) {
        setError("Vui lòng đăng nhập để xem đơn hàng.");
        setShowLoginModal(true); // Show modal if user is not logged in
        return;
      }
      const userId = decoder.userid;
      setLoading(true);
      setError(null);
      try {
        let result;
        if (filter === 'all') {
          result = await orderService.getOrderByUser(userId, page, size);
        } else if (filter === 'active') {
          result = await orderService.getActiveOrder(userId, page, size);
        } else if (filter === 'inactive') {
          result = await orderService.getInActiveOrder(userId, page, size);
        }
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
    }, [pageNumber, filter]);

    const handleRadioChange = (e) => {
      setFilter(e.target.value);
      setPageNumber(0); // Reset to first page when filter changes
    };

    const handlePreviousPage = () => {
      if (pageNumber > 0) setPageNumber(pageNumber - 1);
    };

    const handleNextPage = () => {
      if (pageNumber < totalPages - 1) setPageNumber(pageNumber + 1);
    };

    const handleOrderClick = async (orderId) => {
      const user = getUserFromToken();
      if (!user) {
        setShowLoginModal(true); // Show login modal if user is not logged in
        return;
      }

      try {
        const response = await orderService.getOrderDetail(orderId); // Fetch order details
        setSelectedOrder(response.result); // Update selected order
      } catch (error) {
        console.error('Có lỗi khi lấy chi tiết đơn hàng', error);
      }
    };

    return (
      <div>
        <Navbar />
        <div className="order-page uk-container">
          <h2>Danh sách đơn hàng</h2>

          {/* Radio Button Filter */}
          <div className="radio-input">
            <input
              type="radio"
              id="value-all"
              name="value-radio"
              value="all"
              checked={filter === 'all'}
              onChange={handleRadioChange}
            />
            <label htmlFor="value-all">TẤT CẢ</label>

            <input
              type="radio"
              id="value-active"
              name="value-radio"
              value="active"
              checked={filter === 'active'}
              onChange={handleRadioChange}
            />
            <label htmlFor="value-active">ĐÃ GIAO</label>

            <input
              type="radio"
              id="value-inactive"
              name="value-radio"
              value="inactive"
              checked={filter === 'inactive'}
              onChange={handleRadioChange}
            />
            <label htmlFor="value-inactive">CHỜ GIAO HÀNG</label>

            <div className="selection"></div>
          </div>

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
                      <td className={order.active === true ? 'status-active' : 'status-inactive'}>
                        {order.active === true ? 'Đã giao' : 'Chờ giao hàng'}
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

        {/* Show Login Modal if user is not logged in */}
        <ModalLogin show={showLoginModal} onClose={() => setShowLoginModal(false)} />

        {/* Show Order Detail Modal */}
        <OrderDetailModal
  order={selectedOrder}
  onClose={() => setSelectedOrder(null)}
  fetchOrders={fetchOrders}  // Passing fetchOrders function
  pageNumber={pageNumber}    // Passing the current page number
/>


        <Footer />
      </div>
    );
  };

export default UserOrderTable;
