import React, { useState } from 'react';
import orderService from '../services/OrderService'; // Dịch vụ xóa đơn hàng
import '../styles/orderdetail.css';  // Đảm bảo bạn import file CSS đã chỉnh sửa
import { toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toast

const OrderDetailModal = ({ order, onClose }) => {
  const [loading, setLoading] = useState(false); // Trạng thái loading khi xóa đơn

  if (!order) return null;

  // Hàm xử lý khi xác nhận hủy đơn
  const handleCancelOrder = async () => {
    setLoading(true);
    try {
      await orderService.deleteOrder(order.id); // Gọi API xóa đơn hàng
      toast.success("Đơn hàng đã được hủy."); // Hiển thị thông báo thành công
      onClose(); // Đóng modal sau khi xóa thành công
    } catch (error) {
      console.error("Có lỗi khi xóa đơn hàng", error);
      toast.error("Đã xảy ra lỗi khi xóa đơn hàng."); // Hiển thị thông báo lỗi
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
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
        <p><strong>Trạng thái:</strong> {order.isactive ? 'Chờ giao hàng' : 'Đã giao'}</p>
        
        {/* Nút hủy đơn */}
        <div className="modal-actions">
          <button onClick={handleCancelOrder} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Hủy đơn'}
          </button>
          <button>Mua lại</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
