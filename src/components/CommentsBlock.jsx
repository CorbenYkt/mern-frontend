import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment, deleteComment } from "../redux/slices/comments";
import { UserInfo } from "./userInfo";
import { format } from "date-fns";
import { PostSkeleton } from "../components/post/Skeleton";

export const CommentsBlock = ({ postId }) => {
  const dispatch = useDispatch();
  const { items: comments = [], isLoading } = useSelector((state) => state.comments);
  const [commentText, setCommentText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken._id);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleDeleteComment = (commentId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment({ commentId, postId, token }));
    }
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return alert("Comment cannot be empty");
    const token = localStorage.getItem("token");
    dispatch(addComment({ postId, commentText, userId, token }));
    setCommentText("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Comments:</h2>

      {isLoggedIn ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-500">Please log in to leave a comment</div>
      )}

      <div className="mt-4 space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <div key={index}>
              <PostSkeleton />
            </div>
          ))
        ) : comments.length > 0 ? (
          [...comments]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <div
                key={comment._id}
                className="flex items-start flex-col py-2 border-b last:border-none space-y-2"
              >
                <UserInfo
                  avatar={comment.userId.avatar}
                  fullName={comment.userId.fullName}
                  additionalText={
                    comment.createdAt
                      ? format(new Date(comment.createdAt), "hh:mm a, dd MMM yyyy")
                      : ""
                  }
                />
                <div className="text-sm text-gray-700 w-full">{comment.text}</div>
                {isLoggedIn && comment.userId._id === userId && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                )}

              </div>
            ))
        ) : (
          <div className="text-sm text-gray-500">No comments yet</div>
        )}
      </div>
    </div>
  );
};
