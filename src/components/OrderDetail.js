import React, { useState } from 'react';
import orderService from '../services/OrderService';
import { useNavigate } from 'react-router-dom';

const OrderDetailModal = ({ order, onClose, fetchOrders, pageNumber }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate

  if (!order) return null;

  const handleMuaLai = async () => {
    try {
      if (!order || !order.id) {
        throw new Error('Thông tin đơn hàng không hợp lệ!');
      }
      // Điều hướng đến trang công thức dựa trên ID
      navigate(`/recipe/${order.recipeid}`);
    } catch (error) {
      alert(error.message || 'Có lỗi xảy ra khi thực hiện mua lại!');
    }
  };

  const handleCancelClick = async () => {
    try {
      if (!order || !order.id) {
        throw new Error('Đơn hàng không hợp lệ!');
      }
      if (order.isactive) {
        throw new Error('Đơn hàng đã giao không thể hủy!');
      }

      setLoading(true);

      // Gọi hàm deleteOrder từ OrderService để xóa đơn hàng
      await orderService.deleteOrder(order.id);

      alert('Đơn hàng đã được hủy thành công!');

      // Gọi lại hàm fetchOrders từ UserOrderTable để cập nhật lại danh sách đơn hàng
      fetchOrders(pageNumber);

      // Đóng modal (overlay)
      onClose();
    } catch (error) {
      alert(error.message || 'Có lỗi khi xóa đơn hàng!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay" onClick={(e) => e.target.classList.contains('overlay') && onClose()}>
      <div className="modal">
        <h2>Chi tiết đơn hàng</h2>
        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Ngày đặt:</strong> {order.orderTime}</p>
        <p><strong>Tên người đặt:</strong> {order.name}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Số điện thoại:</strong> {order.phone}</p>
        <p><strong>Món ăn:</strong> {order.recipename}</p>
        <p><strong>Nguyên liệu:</strong> {order.ingredien}</p>
        <p><strong>Giá:</strong> {order.price}</p>
        <p><strong>Số lượng:</strong> {order.quantity}</p>
        <p><strong>Tổng giá:</strong> {order.totalPrice.toLocaleString()} VND</p>
        <p><strong>Trạng thái:</strong> {order.isactive ? 'Đã giao' : 'Chờ giao hàng'}</p>

        <div className="modal-actions">
          <button onClick={handleCancelClick} disabled={loading}>Hủy</button>
          <button onClick={handleMuaLai}>Mua lại</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
