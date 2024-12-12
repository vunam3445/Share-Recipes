import React, { useState } from "react";
import { sendBulkEmails } from "../services/GmailService"; // Import hàm gửi email từ GmailService.js

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
      <h2>Send Bulk Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Emails</button>
      </form>
    </div>
  );
};

export default SendEmailForm;
