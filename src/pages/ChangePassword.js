import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from "../components/readtoken";
import { changePassword } from '../services/userservice'; // Đảm bảo có hàm API này trong service của bạn

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const decoder = getUserFromToken();
  const userId = decoder.userid;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Kiểm tra tính hợp lệ của mật khẩu mới
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và mật khẩu xác nhận không trùng khớp.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }

    const token = localStorage.getItem('token');  // Lấy token từ localStorage
    if (!token) {
      setError('Bạn chưa đăng nhập.');
      return;
    }

    try {
      // Gửi yêu cầu đổi mật khẩu
      const response = await changePassword({
        oldPassword,
        newPassword,
        token
      }, userId);
    
      console.log('Response:', response); // In ra phản hồi để kiểm tra dữ liệu
    
      // Kiểm tra trạng thái của phản hồi
      if (response.status === 'success') {
        setSuccess('Đổi mật khẩu thành công!');
        // Điều hướng về trang chủ sau 2 giây
        setTimeout(() => navigate('/'), 2000);
      } else if (response.status === 'fail') {
        setError(response.message); // Hiển thị thông báo lỗi từ API
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại!'); // Xử lý trường hợp không có trạng thái success hoặc fail
      }
    } catch (error) {
      // Bắt lỗi nếu có vấn đề trong quá trình gọi API
      console.error('Error:', error); // In ra lỗi chi tiết
      setError('Đã xảy ra lỗi. Vui lòng thử lại!');
    }
  };

  return (
    <div className="uk-section uk-flex uk-flex-center uk-flex-middle" style={{ minHeight: "100vh" }}>
      <div className="uk-card uk-card-default uk-card-body uk-width-1-3@m uk-box-shadow-medium uk-flex uk-flex-column uk-flex-center">
        <h2 className="uk-text-center uk-heading-line">
          <span>Đổi Mật Khẩu</span>
        </h2>
        {error && <div className="uk-alert-danger" uk-alert="true">{error}</div>}
        {success && <div className="uk-alert-success" uk-alert="true">{success}</div>}
  
        <form onSubmit={handleChangePassword} className="uk-form-stacked">
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="old-password">Mật khẩu cũ</label>
            <div className="uk-form-controls">
              <input
                id="old-password"
                className="uk-input"
                type="password"
                placeholder="Nhập mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
          </div>
  
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="new-password">Mật khẩu mới</label>
            <div className="uk-form-controls">
              <input
                id="new-password"
                className="uk-input"
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
  
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="confirm-password">Xác nhận mật khẩu mới</label>
            <div className="uk-form-controls">
              <input
                id="confirm-password"
                className="uk-input"
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
  
          <div className="uk-margin">
            <button type="submit" className="uk-button uk-button-primary uk-width-1-1">
              Đổi mật khẩu
            </button>
          </div>
  
          {/* Nút quay lại trang chủ */}
          <div className="uk-margin">
            <Link to="/" className="uk-button uk-button-default uk-width-1-1">
              Quay lại trang chủ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
