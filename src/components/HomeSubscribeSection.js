// HomeSubscribeSection.js

import React, { useState } from "react";
import { addEmail } from "../services/EmailService"; // Đảm bảo đúng đường dẫn

function HomeSubscribeSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngừng hành động mặc định của form (reload trang)
    
    if (!email) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    try {
      // Gửi email và nhận phản hồi từ API
      const response = await addEmail(email);
      if (response.status === "success") {
        setIsSubscribed(true); // Đánh dấu đã đăng ký thành công
        setEmail(""); // Reset email input
        setErrorMessage(""); // Xóa thông báo lỗi (nếu có)
      }
    } catch (error) {
      setErrorMessage("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <div className="uk-container">
      <div className="uk-background-primary uk-border-rounded-large uk-light">
        <div className="uk-width-3-4@m uk-margin-auto uk-padding-large">
          <div className="uk-text-center">
            <h2 className="uk-h2 uk-margin-remove uk-text-medium uk-text-bold">
              Be the first to know about the latest deals, receive new trending
              recipes &amp; more!
            </h2>
          </div>
          <div className="uk-margin-medium-top">
            <div data-uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
              <form onSubmit={handleSubmit}>
                <div className="uk-grid-small" data-uk-grid>
                  <div className="uk-width-1-1 uk-width-expand@s">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="uk-input uk-form-large uk-width-1-1 uk-border-pill"
                      required
                    />
                  </div>
                  <div className="uk-width-1-1 uk-width-auto@s">
                    <button
                      type="submit"
                      className="uk-button uk-button-large uk-button-warning"
                      disabled={!email}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>

              {isSubscribed && (
                <div className="uk-alert-success uk-margin-top">
                  <p>Email added successfully!</p>
                </div>
              )}

              {errorMessage && (
                <div className="uk-alert-danger uk-margin-top">
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSubscribeSection;
