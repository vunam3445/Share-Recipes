import axios from "axios";

const BASE_URL = "http://localhost:8083/foodwed/gmail/send"; // Địa chỉ API backend

// Hàm gửi email hàng loạt
export const sendBulkEmails = async (subject, message) => {
  try {
    // Dữ liệu yêu cầu gửi email
    const requestData = {
      subject: subject,
      message: message
    };

    // Gửi yêu cầu POST đến API backend
    const response = await axios.post(BASE_URL, requestData, {
      headers: {
        "Content-Type": "application/json",  // Đảm bảo kiểu nội dung là JSON
      }
    });

    // Kiểm tra phản hồi từ backend
    if (response.status === 200) {
      alert("Emails sent successfully!");
    } else {
      alert("Failed to send emails.");
    }
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    alert("An error occurred while sending emails.");
  }
};
