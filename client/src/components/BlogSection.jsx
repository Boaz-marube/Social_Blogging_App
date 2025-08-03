import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogHeader from "./BlogHeader";
import PostCard from "./PostCard";
import PostDetail from "./PostDetail";
import FilterBar from "./FilterBar";
import Toast from "./Toast";

// Base API URL
const API_BASE_URL = "http://localhost:8080/api/posts";

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("Recent");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "" });
  const [selectedPost, setSelectedPost] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Design",
    "Business",
    "Marketing",
    "Lifestyle",
    "Finance",
  ];

  const fetchPosts = async (page = 1, category = null) => {
    try {
      setIsLoading(true);
      let url = `${API_BASE_URL}?page=${page}&limit=6`;

      if (category && category !== "All") {
        url += `&category=${category}`;
      }

      const response = await axios.get(url);
      setPosts(response.data.data);
      setTotalPosts(response.data.pagination.totalPosts);
      setCurrentPage(page);
      setSelectedCategory(category || "All");
      setError(null);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Failed to load posts. Please try again later.");
      setPosts([]);
      setTotalPosts(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSortClick = (order) => {
    setSortOrder(order);
    if (order === "Popular") {
      const sortedPosts = [...posts].sort(
        (a, b) => (b.likes || 0) - (a.likes || 0)
      );
      setPosts(sortedPosts);
    } else {
      fetchPosts(1, selectedCategory);
    }
  };

  const handleCategoryFilter = (category) => {
    fetchPosts(1, category);
    setShowCategoryFilter(false);
  };

  const handleBookmarkToggle = async (id, isBookmarked) => {
    try {
      setToast({
        isVisible: true,
        message: isBookmarked
          ? "Added to favourites!"
          : "Removed from favourites!",
      });

      setTimeout(() => {
        setToast({ isVisible: false, message: "" });
      }, 3000);
    } catch (err) {
      console.error("Failed to update bookmark:", err);
    }
  };

  const handleReadMoreClick = async (post) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${post._id}`);
      setSelectedPost(response.data.data);
    } catch (err) {
      console.error("Failed to fetch post details:", err);
      setSelectedPost(post);
    }
  };

  const handleLoadMore = () => {
    fetchPosts(currentPage + 1, selectedCategory);
  };

  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBackClick={() => setSelectedPost(null)}
      />
    );
  }

  if (isLoading && currentPage === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-500 bg-red-100 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-900 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <style jsx="true">{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
      <div className="container p-4 mx-auto sm:p-8">
        <BlogHeader />
        <FilterBar
          posts={posts}
          sortOrder={sortOrder}
          handleSortClick={handleSortClick}
          showCategoryFilter={showCategoryFilter}
          setShowCategoryFilter={setShowCategoryFilter}
          categories={categories}
          handleCategoryFilter={handleCategoryFilter}
          totalPosts={totalPosts}
        />

        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No posts found. Check back later!
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onBookmarkToggle={handleBookmarkToggle}
                  onReadMoreClick={handleReadMoreClick}
                />
              ))}
            </div>
            {posts.length < totalPosts && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Toast isVisible={toast.isVisible} message={toast.message} />
    </div>
  );
}
