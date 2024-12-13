import React, { useState } from 'react';
import Input from '../components/Input';
import { registerUser } from '../services/authservice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    
    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }

    const userData = { fullname, email, password };

    try {
      const response = await registerUser(userData);

      if (response.status === 'success') {
        setSuccess(`Đăng ký thành công! Người Dùng: ${response.result.fullname}`);
        setTimeout(() => navigate('/login'), 250);
      } else if (response.status === 'fail') {
        setError(response.message);
      }
    } catch (error) {
      setError('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  };

  return (
    <div className="uk-grid-collapse" data-uk-grid>
      <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center" data-uk-height-viewport>
        <div className="uk-width-3-4@s">
          <div className="uk-text-center uk-margin-bottom">
            <Link className="uk-logo uk-text-primary uk-text-bold" to="/">Daily Cook</Link>
          </div>
          <div className="uk-text-center uk-margin-medium-bottom">
            <h1 className="uk-h2 uk-letter-spacing-small">Create an Account</h1>
          </div>

          {/* Thông báo lỗi và thành công */}
          <div className="uk-text-center uk-margin" style={{ textAlign: 'center' }}>
            {error && <p className="uk-alert-danger" style={{ color: 'red' }}>{error}</p>}
            {success && <p className="uk-alert-success" style={{ color: 'green' }}>{success}</p>}
          </div>

          <form onSubmit={handleRegister} className="uk-text-center">
            <div className="uk-width-1-1 uk-margin">
              <label className="uk-form-label" htmlFor="name">Full name</label>
              <Input
                id="name"
                className="uk-input uk-form-large uk-border-pill uk-text-center"
                type="text"
                placeholder="Quý Đẹp Trai"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="uk-width-1-1 uk-margin">
              <label className="uk-form-label" htmlFor="email">Email</label>
              <Input
                id="email"
                className="uk-input uk-form-large uk-border-pill uk-text-center"
                type="email"
                placeholder="tom@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="uk-width-1-1 uk-margin">
              <label className="uk-form-label" htmlFor="password">Password</label>
              <Input
                id="password"
                className="uk-input uk-form-large uk-border-pill uk-text-center"
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="uk-width-1-1 uk-text-center">
              <button type="submit" className="uk-button uk-button-primary uk-button-large">Sign Up</button>
            </div>
            <div className="uk-width-1-1 uk-margin uk-text-center">
              <p className="uk-text-small uk-margin-remove">By signing up you agree to our <Link className="uk-link-border" to="/terms">terms</Link> of service.</p>
            </div>
          </form>
        </div>
      </div>

      <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light" data-uk-height-viewport>
        <div
          className="uk-background-cover uk-background-norepeat uk-background-blend-overlay uk-background-overlay 
            uk-border-rounded-large uk-width-1-1 uk-height-xlarge uk-flex uk-flex-middle uk-flex-center"
          style={{ backgroundImage: "url(https://tecwoodoutdoorfloor.com/upload/images/Blog/nen-go14.jpg)" }}
        >
          <div className="uk-padding-large">
            <div className="uk-text-center">
              <h2 className="uk-letter-spacing-small">Welcome Back</h2>
            </div>
            <div className="uk-margin-top uk-margin-medium-bottom uk-text-center">
              <p>Already signed up? Enter your details and start cooking today!</p>
            </div>
            <div className="uk-width-1-1 uk-text-center">
              <Link to="/login" className="uk-button uk-button-primary uk-button-large">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
