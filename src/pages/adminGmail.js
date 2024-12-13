import React, { useState } from "react";
import { sendBulkEmails } from "../services/GmailService"; // Import hàm gửi email từ GmailService.js
import { Link } from "react-router-dom";

const SendEmailForm = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!subject || !message) {
      alert("Please fill in both subject and message.");
      return;
    }

    // Gửi email với subject và message đã nhập
    await sendBulkEmails(subject, message);
  };

    

  return (
    <div>
      <h1>Quản lý Email</h1>
      <Link to={"/admin"}>Trở về trang chủ</Link>
      <h2>Gửi đến tất cả email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Tiêu đề:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Nội dung:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default SendEmailForm;
