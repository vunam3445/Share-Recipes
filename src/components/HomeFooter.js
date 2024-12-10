import React from "react";

function Footer() {
  const containerStyle = {
    display: "flex",        // Sử dụng Flexbox
    flexDirection: "row",   // Các <ul> sẽ xếp theo hàng ngang
    justifyContent: "space-between", // Giãn đều các phần tử
    gap: "20px",            // Khoảng cách giữa các <ul>
  };

  const listStyle = {
    display: "flex",        // Sử dụng Flexbox cho <ul>
    flexDirection: "column", // Xếp các <li> theo chiều dọc
    padding: 0,
    listStyleType: "none",   // Bỏ dấu chấm
  };

  const listItemStyle = {
    marginBottom: "10px",
       // Khoảng cách giữa các <li>
  };
   const linkStyle = {
    color: "black",         // Màu chữ đen
    textDecoration: "none", // Bỏ gạch dưới mặc định của <a>
  };

  return (
    <footer className="uk-section uk-section-default">
      <div className="uk-container uk-text-secondary uk-text-500">
        <div className="uk-child-width-1-2@s" data-uk-grid style={{ marginBottom: "30px" }}>
          <div style={{textAlign: "left"}}>
            <a href="#" className="uk-logo">
              Kocina
            </a>
          </div>
          <div className="uk-flex uk-flex-middle uk-flex-right@s">
            <div data-uk-grid className="uk-child-width-auto uk-grid-small">
              <div>
                <a
                  href="https://www.facebook.com/"
                  data-uk-icon="icon: facebook; ratio: 0.8"
                  className="uk-icon-button facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/"
                  data-uk-icon="icon: instagram; ratio: 0.8"
                  className="uk-icon-button instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </div>
              <div>
                <a
                  href="mailto:info@blacompany.com"
                  data-uk-icon="icon: twitter; ratio: 0.8"
                  className="uk-icon-button twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </div>
            </div>
          </div>
        </div>
         <div className="uk-container uk-text-secondary uk-text-500" style={{ marginBottom: "30px" }}>
          <div style={containerStyle}> {/* Áp dụng style cho phần chứa các <ul> */}
            <div>
              <ul style={listStyle}>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Presentations</a></li>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Professionals</a></li>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Stores</a></li>
              </ul>
            </div>
            <div>
              <ul style={listStyle}>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Webinars</a></li>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Workshops</a></li>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Local Meetups</a></li>
              </ul>
            </div>
            <div>
              <ul style={listStyle}>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Our Initiatives</a></li>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Giving Back</a></li>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Communities</a></li>
              </ul>
            </div>
            <div>
              <ul style={listStyle}>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Contact Form</a></li>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Work With Us</a></li>
                <li style={listItemStyle}><a href="#" style={linkStyle}>Visit Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="uk-margin-medium-top uk-text-small uk-text-muted" style={{textAlign: "left"}}>
          Made by{" "}
          <a
            className="uk-link-muted"
            href="https://unbound.studio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quý Đẹp Trai
          </a>{" "}
          Vô Địch Nhất Vũ Trụ.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
