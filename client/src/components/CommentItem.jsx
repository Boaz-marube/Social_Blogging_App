import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import React from "react";
const CommentItem = ({ comment }) => {
  const [likes, setLikes] = useState(comment.likes || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes || 0);
  const [userReaction, setUserReaction] = useState(null);

  const handleLike = async () => {
    try {
      if (userReaction === "like") {
        setLikes(likes - 1);
        setUserReaction(null);
      } else {
        if (userReaction === "dislike") {
          setDislikes(dislikes - 1);
        }
        setLikes(likes + 1);
        setUserReaction("like");
      }
    } catch (err) {
      console.error("Failed to update comment reaction:", err);
    }
  };

  const handleDislike = async () => {
    try {
      if (userReaction === "dislike") {
        setDislikes(dislikes - 1);
        setUserReaction(null);
      } else {
        if (userReaction === "like") {
          setLikes(likes - 1);
        }
        setDislikes(dislikes + 1);
        setUserReaction("dislike");
      }
    } catch (err) {
      console.error("Failed to update comment reaction:", err);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
      <div className="flex items-start mb-2 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-600 dark:text-gray-300">
          {comment.author?.username?.charAt(0) || "U"}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {comment.author?.username || "User"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 ml-11">{comment.text}</p>

      <div className="flex items-center mt-2 space-x-2 text-gray-500 ml-11 dark:text-gray-400">
        <button
          onClick={handleLike}
          className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
            userReaction === "like"
              ? "text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <ThumbsUp size={16} />
        </button>
        <span className="text-xs">{likes}</span>
        <button
          onClick={handleDislike}
          className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
            userReaction === "dislike"
              ? "text-red-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <ThumbsDown size={16} />
        </button>
        <span className="text-xs">{dislikes}</span>
      </div>
    </div>
  );
};

export default CommentItem;
