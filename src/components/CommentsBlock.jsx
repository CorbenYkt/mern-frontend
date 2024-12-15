import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, deleteComment } from "../redux/slices/comments";
import axios from "../axios";
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Comments:</h2>
      <div className="mt-4 space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <div key={index}>
              <PostSkeleton />
            </div>
          ))
        ) : comments.length > 0 ? (
          comments.map((comment) => (
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
