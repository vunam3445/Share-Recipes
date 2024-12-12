import React, { useEffect, useState } from 'react';
import orderService from '../services/OrderService';
import Navbar from '../components/Navbar';
import Footer from '../components/HomeFooter';
import '../styles/orderlist.css';

const UserOrderTable = ({userId}) => {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchOrders = async (page = 0, size = 6) => {
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

  return (
    <div>
      <Navbar />
      <div className="order-page uk-container"> {/* Đảm bảo phần tử này có class uk-container */}
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
                  <tr key={order.id}>
                    <td>{order.uname}</td>
                    <td>{order.recipename}</td>
                    <td>{order.totalPrice.toLocaleString()} VND</td>
                    <td className={order.active ? 'status-active' : 'status-inactive'}>
                      {order.active ? 'Đã giao' : 'Chờ giao hàng'}
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
      <Footer />
    </div>
  );
};

export default UserOrderTable;
