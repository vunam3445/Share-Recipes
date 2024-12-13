import React, { useState } from 'react';
import { loginUser } from '../services/authservice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { getUserFromToken } from '../components/readtoken';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userData = { email, password };

    try {
      const response = await loginUser(userData);
      if (response.status === 'success') {
        setSuccess('Đăng nhập thành công!');
        localStorage.setItem('token', response.result.token);

        const decoder = getUserFromToken();
        if (decoder) {
          const userScope = decoder.scope;

          if (userScope === 'ADMIN') {
            setTimeout(() => navigate('/admin'), 250);
          } else {
            setTimeout(() => navigate('/'), 250);
          }
        } else {
          setError('Token không hợp lệ!');
        }
      } else if (response.status === 'fail') {
        setError(response.message);
      }
    } catch (error) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại!');
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
        const token = response.credential;

        const backendResponse = await fetch('http://localhost:8083/foodwed/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (backendResponse.ok) {
            const result = await backendResponse.json();
            const user = result.result;

            localStorage.setItem('token', user.token);

            setSuccess('Đăng nhập Google thành công!');
            console.log('Thông tin người dùng:', user);
            console.log('Token:', user.token);

            setTimeout(() => navigate('/'), 250);
        } else {
            setError('Đăng nhập Google thất bại.');
        }
    } catch (err) {
        setError('Đã xảy ra lỗi khi đăng nhập bằng Google.');
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
            <h1 className="uk-h2 uk-letter-spacing-small">Login to Daily Cook</h1>
          </div>

          {error && <div className="uk-alert-danger uk-text-center uk-margin" data-uk-alert>{error}</div>}
          {success && <div className="uk-alert-success uk-text-center uk-margin" data-uk-alert>{success}</div>}

          <form className="uk-text-center" onSubmit={handleLogin}>
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
              <button className="uk-button uk-button-primary uk-button-large" type="submit">Login</button>
            </div>
          </form>

          <div className="loginWithGG">
            <GoogleOAuthProvider clientId="934560233636-oerj7ripv9ituu22ntoc4nn4gcunq180.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError('Đăng nhập Google thất bại')}
                render={(renderProps) => (
                  <button
                    className="google-button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Đăng nhập với Google
                  </button>
                )}
              />
            </GoogleOAuthProvider>
          </div>

          <div className="uk-width-1-1 uk-text-center uk-margin-top">
            <Link to="/forgot-password" className="uk-button uk-button-link">Quên mật khẩu?</Link>
          </div>
        </div>
      </div>
      <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light" data-uk-height-viewport>
        <div className="uk-background-cover uk-background-norepeat uk-background-blend-overlay uk-background-overlay 
          uk-border-rounded-large uk-width-1-1 uk-height-xlarge uk-flex uk-flex-middle uk-flex-center"
          style={{ backgroundImage: "url(https://sikido.vn/uploads/source/tintuc/chu-p-a-nh2-1.jpg" }}>
          <div className="uk-padding-large">
            <div className="uk-text-center">
              <h2 className="uk-letter-spacing-small">Hello There, Join Us</h2>
            </div>
            <div className="uk-margin-top uk-margin-medium-bottom uk-text-center">
              <p>Enter your personal details and join the cooking community</p>
            </div>
            <div className="uk-width-1-1 uk-text-center">
              <Link to="/signup" className="uk-button uk-button-primary uk-button-large">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
