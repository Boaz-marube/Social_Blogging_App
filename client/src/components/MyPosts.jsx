import React, { useState, useEffect } from "react";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Tag,
  FileText,
  AlertCircle,
  Check,
  X
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../utils/api";

const MyPostsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, published, draft
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, title
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);

  const categoriesList = [
    "Technology",
    "Entertainment", 
    "Science",
    "Lifestyle",
    "Travel",
    "Food",
  ];

  // Fetch user's posts
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    fetchMyPosts();
  }, [isAuthenticated, navigate]);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await apiCall.get('/posts/my-posts'); // Adjust endpoint as needed
      
      if (response.success) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    try {
      setDeletingPost(postId);
      const response = await apiCall.delete(`/posts/${postId}`);
      
      if (response.success) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        toast.success('Post deleted successfully');
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setDeletingPost(null);
    }
  };

  // Toggle post status (publish/unpublish)
  const togglePostStatus = async (postId, currentStatus) => {
    try {
      const response = await apiCall.put(`/posts/${postId}/status`, {
        published: !currentStatus
      });
      
      if (response.success) {
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === postId 
              ? { ...post, published: !currentStatus }
              : post
          )
        );
        toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      }
    } catch (error) {
      console.error('Error updating post status:', error);
      toast.error('Failed to update post status');
    }
  };

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || 
                           (filterStatus === "published" && post.published) ||
                           (filterStatus === "draft" && !post.published);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "title":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Posts
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manage your blog posts - edit, delete, or create new ones
              </p>
            </div>
            <button
              onClick={() => navigate('/create-post')}
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredAndSortedPosts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filters"
                : "Start by creating your first blog post"
              }
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button
                onClick={() => navigate('/create-post')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Post
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="h-48 bg-gray-200 dark:bg-gray-700">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {post.published ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Published
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Draft
                        </>
                      )}
                    </span>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => togglePostStatus(post._id, post.published)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        title={post.published ? "Unpublish" : "Publish"}
                      >
                        {post.published ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Summary/Content Preview */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {post.summary || truncateContent(post.content)}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.createdAt)}
                    </div>
                    {post.categories && (
                      <div className="flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {post.categories}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/blog/${post._id}`)}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      
                      <button
                        onClick={() => navigate(`/edit-post/${post._id}`)}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>

                    <button
                      onClick={() => setDeleteConfirm(post._id)}
                      disabled={deletingPost === post._id}
                      className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {deletingPost === post._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Delete Post
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePost(deleteConfirm)}
                  disabled={deletingPost === deleteConfirm}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {deletingPost === deleteConfirm ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostsPage;