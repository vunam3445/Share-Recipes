import React, { useEffect, useState } from 'react';
import orderService from '../services/OrderService'; // Đảm bảo đường dẫn đúng

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = '2f1a9712-3097-4748-ac8b-62f7703c6977';

  const fetchOrders = async (page = 0, size = 3) => {
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

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      {/* Hiển thị loading hoặc lỗi */}
      {loading ? <p>Đang tải dữ liệu...</p> : error ? <p>{error}</p> : null}
      {/* Hiển thị danh sách */}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Tên người đặt: {order.uname}</p>
            <p>Món ăn: {order.recipename}</p>
            <p>Tổng tiền: {order.totalPrice}</p>
            <p>Trạng thái: {order.active ? 'Hoạt động' : 'Không hoạt động'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrderList;
