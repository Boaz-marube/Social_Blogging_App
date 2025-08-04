import React, { useState } from "react";
import { PlusCircle, Save, Upload, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../src/utils/api";

const CreatePostForm = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const categoriesList = [
    "Technology",
    "Entertainment", 
    "Science",
    "Lifestyle",
    "Travel",
    "Food",
  ];

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    categories: "",
    tags: "",
    coverImage: null,
  });

  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      setFormData((prev) => ({ ...prev, coverImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return false;
    }
    if (!formData.categories) {
      toast.error("Please select a category");
      return false;
    }
    return true;
  };

  // Using your API service
  const submitPost = async (isDraft = false) => {
    if (!isAuthenticated) {
      toast.error("Please login to create a post");
      navigate('/signin');
      return;
    }

    if (!validateForm() && !isDraft) {
      return;
    }

    const loadingSetter = isDraft ? setIsSavingDraft : setIsPublishing;
    loadingSetter(true);

    try {
      // Create FormData for file upload
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('summary', formData.summary);
      postData.append('content', formData.content);
      postData.append('categories', formData.categories);
      postData.append('tags', formData.tags);
      
      if (formData.coverImage) {
        postData.append('coverImage', formData.coverImage);
      }

      // Use your API service

      const response = await apiCall.post('https://social-blogging-app-hz1t.onrender.com/api/posts', postData, {

    //   const response = await axios.post('https://social-blogging-app-hz1t.onrender.com/api/posts', postData, {

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.success) {
        toast.success(isDraft ? 'Draft saved successfully!' : 'Post published successfully!');
        
        // Reset form
        setFormData({
          title: "",
          summary: "",
          content: "",
          categories: "",
          tags: "",
          coverImage: null,
        });
        setCoverImagePreview(null);
        
        // Navigate to the new post
        if (!isDraft) {
          navigate(`/blog/${response.data._id}`);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      toast.error(error.message || (isDraft ? 'Failed to save draft' : 'Failed to publish post'));
    } finally {
      loadingSetter(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost(false);
  };

  const handleSaveDraft = () => {
    submitPost(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-8 bg-white shadow-2xl rounded-3xl dark:bg-gray-800 dark:text-white">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your post title..."
              required
              className="block w-full px-4 py-3 mt-1 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Summary */}
          <div>
            <label htmlFor="summary" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Summary
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Enter a brief summary of your post..."
              className="block w-full px-4 py-3 mt-1 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label htmlFor="coverImage" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Cover Image
            </label>
            <div className="flex items-center justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-xl dark:border-gray-600">
              <div className="space-y-1 text-center">
                {coverImagePreview ? (
                  <div className="relative">
                    <img
                      src={coverImagePreview}
                      alt="Cover Preview"
                      className="mx-auto rounded-md max-h-48"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, coverImage: null }));
                        setCoverImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-24-4h8m-4-4h.01M32 32h.01" />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="cover-image-upload"
                    className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer dark:bg-gray-700 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="cover-image-upload"
                      name="coverImage"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              placeholder="Write your blog post content here..."
              required
              className="block w-full px-4 py-3 mt-1 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Categories */}
          <div>
            <label htmlFor="categories" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Categories *
            </label>
            <select
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              className="block w-full px-4 py-3 mt-1 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="" disabled>Select a category</option>
              {categoriesList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas..."
              className="block w-full px-4 py-3 mt-1 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="mt-1 text-sm text-gray-500">
              Separate multiple tags with commas (e.g., "javascript, react, web development")
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              disabled={isPublishing || isSavingDraft}
              className="inline-flex items-center justify-center flex-1 w-full px-6 py-3 text-base font-medium text-white transition-colors duration-200 bg-blue-600 border border-transparent rounded-full shadow-sm sm:w-auto hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? (
                <>
                  <Upload className="w-5 h-5 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Publish Post
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isPublishing || isSavingDraft}
              className="inline-flex items-center justify-center flex-1 w-full px-6 py-3 text-base font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-full shadow-sm sm:w-auto hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSavingDraft ? (
                <>
                  <Upload className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save as Draft
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
