import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Link,
  Linkedin,
  Twitter,
  Facebook,
  Send,
} from "lucide-react";
import CommentItem from "./CommentItem";

const PostDetail = ({ post, onBackClick }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() && !isSubmitting) {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `${API_BASE_URL}/${post._id}/comments`,
          {
            text: commentText,
          }
        );

        setComments([response.data, ...comments]);
        setCommentText("");
      } catch (err) {
        console.error("Failed to submit comment:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="p-6 mb-8 overflow-hidden bg-white shadow-xl dark:bg-gray-800 rounded-2xl md:p-12">
      <button
        onClick={onBackClick}
        className="flex items-center mb-8 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
      >
        <ArrowLeft size={24} className="mr-2" /> Back to articles
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl dark:text-white">
            {post.title}
          </h1>
          <div className="flex items-center mb-4 space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center w-10 h-10 mr-2 font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
              {post.author?.username?.charAt(0) || "A"}
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {post.author?.username || "Anonymous"}
            </p>
            <span>•</span>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            <span>•</span>
            <p>
              {Math.ceil(post.content?.split(/\s+/)?.length / 200)} min read
            </p>
          </div>

          <div className="flex items-center mb-6 space-x-4 text-gray-500 dark:text-gray-400">
            <Link
              size={20}
              className="cursor-pointer hover:text-black dark:hover:text-white"
            />
            <Linkedin
              size={20}
              className="cursor-pointer hover:text-black dark:hover:text-white"
            />
            <Twitter
              size={20}
              className="cursor-pointer hover:text-black dark:hover:text-white"
            />
            <Facebook
              size={20}
              className="cursor-pointer hover:text-black dark:hover:text-white"
            />
          </div>

          <img
            src={
              post.coverImage ||
              "https://placehold.co/600x400/94a3b8/ffffff?text=Blog+Image"
            }
            alt={post.title}
            className="object-cover w-full mb-8 rounded-xl"
          />
          <div className="prose text-gray-700 dark:prose-invert max-w-none dark:text-gray-300">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              Introduction
            </p>
            <p className="italic">{post.summary}</p>
            <p>{post.content}</p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>

          <form
            onSubmit={handleCommentSubmit}
            className="flex items-center mb-8 space-x-4"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
              U
            </div>
            <div className="relative w-full">
              <input
                type="text"
                className="w-full py-3 pl-4 pr-12 text-gray-900 transition-colors border border-gray-300 rounded-full dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="absolute p-2 text-white transition-colors -translate-y-1/2 bg-blue-500 rounded-full right-2 top-1/2 hover:bg-blue-600 disabled:opacity-50"
                disabled={isSubmitting || !commentText.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
