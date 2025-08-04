import React, { useState, useEffect, useContext } from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext"; // Adjust the import path

const PostCard = ({ post, onBookmarkToggle, onReadMoreClick }) => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        if (!isAuthenticated || authLoading) return;

        const response = await axios.get(
          `https://social-blogging-app-hz1t.onrender.com/api/posts/${post._id}/check-like`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likeCount);
      } catch (err) {
        console.error("Error checking like status:", err);
        if (err.response?.data?.error) {
          toast.error(err.response.data.error);
        }
      }
    };

    checkLikeStatus();

    if (post.coverImage) {
      if (post.coverImage.startsWith("http")) {
        setImageUrl(post.coverImage);
      } else {
        setImageUrl(`https://social-blogging-app-hz1t.onrender.com${post.coverImage}`);
      }
    } else {
      setImageUrl("https://placehold.co/600x400/94a3b8/ffffff?text=Blog+Image");
    }
  }, [post, isAuthenticated, authLoading]);

  const handleLikeClick = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info("Please login to like posts");
      return;
    }

    setIsLikeLoading(true);

    try {
      const response = await axios.post(
        `https://social-blogging-app-hz1t.onrender.com/api/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsLiked(response.data.action === "liked");
      setLikeCount(response.data.data.likes.length);
      toast.success(`Post ${response.data.action}`);
    } catch (err) {
      console.error("Failed to update like:", err);

      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Failed to update like");
      }
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info("Please login to bookmark posts");
      return;
    }

    const newBookmarkedState = !isBookmarked;

    if (onBookmarkToggle) {
      try {
        onBookmarkToggle(post._id, newBookmarkedState);
        setIsBookmarked(newBookmarkedState);
        toast.success(newBookmarkedState ? "Bookmarked" : "Removed bookmark");
      } catch (err) {
        toast.error("Failed to update bookmark");
      }
    }
  };

  const handleReadMoreClick = () => {
    if (!isAuthenticated) {
      toast.info("Please login to read full post");
      return;
    }
    onReadMoreClick(post);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/)?.length || 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Show loading state while auth is being checked
  if (authLoading) {
    return <div className="p-6">Loading post...</div>;
  }

  return (
    <div className="overflow-hidden transition-transform transform bg-white shadow-xl dark:bg-gray-800 rounded-2xl hover:scale-105">
      <div className="relative">
        <img
          src={imageUrl}
          alt={post.title}
          className="object-cover w-full h-48"
          onError={(e) => {
            console.error("Failed to load image:", e.target.src);
            e.target.src =
              "https://placehold.co/600x400/94a3b8/ffffff?text=Blog+Image";
          }}
        />
        <span
          className={`absolute top-4 left-4 rounded-full px-4 py-1 text-sm font-semibold text-white 
          ${post.categories?.[0] === "Technology" && "bg-blue-600"}
          ${post.categories?.[0] === "Design" && "bg-purple-600"}
          ${post.categories?.[0] === "Business" && "bg-teal-600"}
          ${post.categories?.[0] === "Marketing" && "bg-orange-600"}
          ${post.categories?.[0] === "Lifestyle" && "bg-green-600"}
          ${post.categories?.[0] === "Finance" || ("Health" && "bg-indigo-600")}
        `}
        >
          {post.categories?.[0] || "Uncategorized"}
        </span>
        {isAuthenticated && (
          <button
            onClick={handleBookmarkClick}
            className={`absolute top-4 right-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2 rounded-full text-white transition-colors
            ${isBookmarked ? "text-blue-400" : "hover:text-blue-400"}
            `}
          >
            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
              {post.author?.username?.charAt(0) || "A"}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {post.author?.username || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(post.createdAt || new Date())}
              </p>
            </div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {calculateReadTime(post.content)}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400 line-clamp-3">
          {post.summary || post.content?.substring(0, 150) + "..."}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <div
              className={`flex items-center space-x-1 ${
                isLikeLoading
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={!isLikeLoading ? handleLikeClick : undefined}
            >
              <Heart
                size={18}
                fill={isLiked ? "red" : "none"}
                color={isLiked ? "red" : "currentColor"}
              />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={18} />
              <span>{post.comments?.length || 0}</span>
            </div>
          </div>
          <button
            onClick={handleReadMoreClick}
            className="px-6 py-2 font-semibold text-white transition-colors bg-black rounded-full dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
