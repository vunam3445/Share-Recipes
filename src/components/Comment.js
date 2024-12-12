import React, { useEffect, useState } from "react";
import { getCommentsByRecipe, addComment } from "../services/CommentService";
import { getUserFromToken } from "../components/readtoken";
import "../styles/comment.css";

const Comments = ({ recipeId }) => {
  const [allComments, setAllComments] = useState([]); // Danh sách tất cả comments
  const [displayedComments, setDisplayedComments] = useState([]); // Danh sách các comment đang hiển thị
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState(""); // Nội dung reply
  const [replyingTo, setReplyingTo] = useState(null); // ID của comment/reply đang trả lời
  const [loading, setLoading] = useState(true);
  const [commentsToDisplay, setCommentsToDisplay] = useState(5); // Số lượng comment cần hiển thị

  const decoder = getUserFromToken();
  const userId = decoder ? decoder.userid : null; // Kiểm tra nếu decoder tồn tại và lấy userId

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Chuyển đổi thành định dạng dễ đọc như: "12/7/2024, 9:15:00 AM"
  };

  // Hàm tải lại danh sách comment
  const fetchComments = async () => {
    try {
      const fetchedComments = await getCommentsByRecipe(recipeId);
      const sortedComments = (fetchedComments || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Sắp xếp từ mới đến cũ

      setAllComments(sortedComments);
      setDisplayedComments(sortedComments.slice(0, commentsToDisplay)); // Chỉ hiển thị 5 comment đầu tiên
    } catch (error) {
      console.error("Error fetching comments:", error);
      setAllComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(); // Tải lại comment khi component mount
  }, [recipeId, commentsToDisplay]);

  // Thêm comment mới và tải lại danh sách comment
  const handleAddComment = async () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để comment!");
      return;
    }

    if (!newComment.trim()) return;

    try {
      const commentData = {
        userid: userId,
        recipeId: recipeId,
        content: newComment,
        parentCmtId: null, // Comment chính
      };

      // Thêm bình luận mới vào database
      await addComment(commentData);

      // Tải lại danh sách comment sau khi thêm comment mới
      fetchComments();

      setNewComment(""); // Reset textarea sau khi thêm comment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Thêm reply vào comment
  const handleReply = async () => {
    if (!replyContent.trim() || !replyingTo) return;

    try {
      const replyData = {
        userid: userId,
        recipeId: recipeId,
        content: replyContent,
        parentCmtId: replyingTo, // Trả lời comment/reply cụ thể
      };

      // Thêm reply vào database
      await addComment(replyData);

      // Tải lại danh sách comment sau khi reply được thêm vào
      fetchComments();

      setReplyContent(""); // Reset nội dung reply
      setReplyingTo(null); // Đóng form trả lời
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const toggleReplyForm = (cmtid) => {
    setReplyingTo(replyingTo === cmtid ? null : cmtid); // Mở/đóng form trả lời
    setReplyContent(""); // Xóa nội dung reply hiện tại
  };

  const renderComments = (comments) =>
    comments.map((comment) => (
      <li className="comment-item" key={comment.cmtid}>
        <div className="divHeadComment">
          <small>{comment.fullname} {formatDate(comment.date)}</small>
          <p
            className="textReply"
            onClick={() => toggleReplyForm(comment.cmtid)}
          >
            Reply
          </p>
        </div>
        <p className="content">{comment.content}</p>
        {/* Hiển thị form reply nếu đang trả lời comment này */}
        {replyingTo === comment.cmtid && (
          <div className="reply-form">
            <textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            <button onClick={handleReply}>Submit Reply</button>
          </div>
        )}
        {/* Hiển thị replies nếu có */}
        {comment.replies?.length > 0 && (
          <ul className="replies">{renderComments(comment.replies)}</ul>
        )}
      </li>
    ));

  const handleLoadMore = () => {
    const nextComments = commentsToDisplay + 5;
    setCommentsToDisplay(nextComments);
    setDisplayedComments(allComments.slice(0, nextComments)); // Cập nhật comment cần hiển thị
  };

  if (loading) return <p>Đang tải bình luận...</p>;

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      <div className="new-comment-container">
        <textarea
          placeholder="Thêm bình luận"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={handleAddComment} disabled={!newComment.trim()}>
          Đăng
        </button>
      </div>
      {displayedComments.length > 0 ? (
        <ul className="comments-list">{renderComments(displayedComments)}</ul>
      ) : (
        <p>Chưa có bình luận nào. Hãy là người đầu tiên đóng góp!</p>
      )}

      {/* Hiển thị nút "Tải thêm" nếu còn comment để tải */}
      {displayedComments.length < allComments.length && (
        <button onClick={handleLoadMore} className="load-more-button">
          Tải thêm
        </button>
      )}
    </div>
  );
};

export default Comments;
