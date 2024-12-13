import React, { useState } from 'react';
import { resetPassword } from '../services/authservice'; // Hàm gửi yêu cầu API
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validateEmail(email)) {
      setError('Email không hợp lệ.');
      return;
    }

    try {
      const response = await resetPassword({ email }); // Gửi email đến backend
      if (response === "Email không tồn tại trong hệ thống.") {
        setError(response);
      } else if (response === "Mật khẩu mới đã được gửi đến email của bạn.") {
        setMessage(response);
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu.');
    }
  };

  // Hàm để kiểm tra định dạng email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="uk-container uk-container-small uk-margin-top">
      <h2 className="uk-text-center">Quên mật khẩu</h2>
      <form onSubmit={handleResetPassword}>
        {message && <div className="uk-alert-success" data-uk-alert>{message}</div>}
        {error && <div className="uk-alert-danger" data-uk-alert>{error}</div>}

        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="email">Địa chỉ email</label>
          <input
            id="email"
            className="uk-input uk-form-large"
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="uk-text-center">
          <button className="uk-button uk-button-primary uk-button-large" type="submit">
            Gửi yêu cầu
          </button>
        </div>
        <div className="uk-margin-top uk-text-center">
          <Link to="/login">Quay lại trang đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
