import React, { useState } from "react";
import { createComment } from "./commentService";

const ReplyForm = ({ parentId }) => {
  const [content, setContent] = useState("");

  const handleReply = async (e) => {
    e.preventDefault();
    await createComment({ parentId, content });
    setContent(""); // Xoá nội dung sau khi gửi
  };

  return (
    <form onSubmit={handleReply} className="reply-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a reply..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReplyForm;
