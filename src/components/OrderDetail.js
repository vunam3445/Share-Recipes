import React from 'react';
import '../styles/orderdetail.css';  // Đảm bảo bạn import file CSS đã chỉnh sửa

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Chi tiết đơn hàng</h2>
        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Tên người đặt:</strong> {order.name}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Số điện thoại:</strong> {order.phone}</p>
        <p><strong>Món ăn:</strong> {order.recipename}</p>
        <p><strong>Nguyên liệu:</strong> {order.ingredien}</p>
        <p><strong>Giá:</strong> {order.price}</p>
        <p><strong>Số lượng:</strong> {order.quantity}</p>
        <p><strong>Tổng giá:</strong> {order.totalPrice.toLocaleString()} VND</p>
        <p><strong>Trạng thái:</strong> {order.isactive ? 'Chờ giao hàng' : 'Đã giao' }</p>
        <div className="modal-actions">
          <button>Hủy</button>
          <button>Mua lại</button>
        </div>
      </div>
      
    </div>
  );
};

export default OrderDetailModal;
