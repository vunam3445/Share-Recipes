import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Kiểm tra token trong localStorage khi component được mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Hàm xử lý sự kiện khi người dùng nhấn Enter
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      // Nếu không có từ khóa tìm kiếm, điều hướng đến trang tìm kiếm không có từ khóa
      if (searchQuery.trim()) {
        navigate(`/search?name=${searchQuery}`); // Điều hướng đến trang tìm kiếm với từ khóa
      } else {
        navigate(`/search`); // Điều hướng đến trang tìm kiếm nếu không có từ khóa
      }
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    setToken(null); // Cập nhật trạng thái token
    navigate('/'); // Điều hướng về trang chính
  };

  return (
    <nav className="uk-navbar-container uk-letter-spacing-small">
      <div className="uk-container">
        <div className="uk-position-z-index" data-uk-navbar>
          <div className="uk-navbar-left">
            <a className="uk-navbar-item uk-logo" href="/">Daily Cook</a>
            <ul className="uk-navbar-nav uk-visible@m uk-margin-large-left">
              <li className="uk-active"><a href="/">Home</a></li>
              <li><a href="/recipe">Recipe</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href='/order'>Order</a></li>
            </ul>
          </div>

          <div className="uk-navbar-right">
            <div>
              <a className="uk-navbar-toggle" data-uk-search-icon href="#"></a>
              <div className="uk-drop uk-background-default" data-uk-drop="mode: click; pos: left-center; offset: 0">
                <form className="uk-search uk-search-navbar uk-width-1-1">
                  <input
                    className="uk-search-input uk-text-demi-bold"
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                  />
                </form>
              </div>
            </div>

            {/* Hiển thị nút tùy thuộc vào trạng thái token */}
            <ul className="uk-navbar-nav uk-visible@m">
              {token ? (
                <>
                  <li><a href="/changepassword">Change Password</a></li>
                  <div className="uk-navbar-item">
                    <button className="uk-button uk-button-primary" onClick={handleLogout}>Logout</button>
                  </div>
                </>
              ) : (
                <>
                  <li><a href="/login">Login</a></li>
                  <div className="uk-navbar-item">
                    <a className="uk-button uk-button-primary" href="/signup">Sign Up</a>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
