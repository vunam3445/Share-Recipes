import React from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng
import '../styles/modallogin.css'; // Import CSS
const ModalLogin = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null; // Nếu modal không hiển thị, không render gì

  const goToLogin = () => {
    onClose(); // Đóng modal
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  const goToRegister = () => {
    onClose(); // Đóng modal
    navigate("/signup"); // Điều hướng đến trang đăng ký
  };

  // Đóng modal khi bấm ngoài modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h3>Vui lòng đăng nhập tài khoản để xem ưu đãi và thanh toán dễ dàng hơn!</h3>
        <div className="modal-actions">
          <button onClick={goToLogin}>Đăng nhập</button>
          <button onClick={goToRegister}>Đăng ký</button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
