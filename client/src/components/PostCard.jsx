
// import React, { useState, useEffect, useContext } from "react";
// import { Bookmark, Heart, MessageCircle } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../../context/AuthContext"; // Adjust the import path

// const PostCard = ({ post, onBookmarkToggle, onReadMoreClick }) => {
//   const { isAuthenticated, user, loading: authLoading } = useAuth();
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
//   const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
//   const [imageUrl, setImageUrl] = useState(null); // Changed from "" to null
//   const [imageError, setImageError] = useState(false);
//   const [isLikeLoading, setIsLikeLoading] = useState(false);

//   useEffect(() => {
//     const checkLikeStatus = async () => {
//       try {
//         if (!isAuthenticated || authLoading) return;

//         const response = await axios.get(
//           `https://social-blogging-app-hz1t.onrender.com/api/posts/${post._id}/check-like`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setIsLiked(response.data.isLiked);
//         setLikeCount(response.data.likeCount);
//       } catch (err) {
//         console.error("Error checking like status:", err);
//         if (err.response?.data?.error) {
//           toast.error(err.response.data.error);
//         }
//       }
//     };

//     checkLikeStatus();

//     // Fix image URL handling
//     if (post.coverImage && post.coverImage.trim() !== "") {
//       if (post.coverImage.startsWith("http")) {
//         setImageUrl(post.coverImage);
//       } else {
//         // Ensure proper path construction
//         const cleanPath = post.coverImage.startsWith('/') ? post.coverImage : `/${post.coverImage}`;
//         setImageUrl(`https://social-blogging-app-hz1t.onrender.com${cleanPath}`);
//       }
//     } else {
//       setImageUrl(null); // Set to null instead of fallback URL initially
//     }
//   }, [post, isAuthenticated, authLoading]);

//   const handleLikeClick = async (e) => {
//     e.stopPropagation();

//     if (!isAuthenticated) {
//       toast.info("Please login to like posts");
//       return;
//     }

//     setIsLikeLoading(true);

//     try {
//       const response = await axios.post(
//         `https://social-blogging-app-hz1t.onrender.com/api/posts/${post._id}/like`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setIsLiked(response.data.action === "liked");
//       setLikeCount(response.data.data.likes.length);
//       toast.success(`Post ${response.data.action}`);
//     } catch (err) {
//       console.error("Failed to update like:", err);

//       if (err.response?.data?.error) {
//         toast.error(err.response.data.error);
//       } else {
//         toast.error("Failed to update like");
//       }
//     } finally {
//       setIsLikeLoading(false);
//     }
//   };

//   const handleBookmarkClick = (e) => {
//     e.stopPropagation();

//     if (!isAuthenticated) {
//       toast.info("Please login to bookmark posts");
//       return;
//     }

//     const newBookmarkedState = !isBookmarked;

//     if (onBookmarkToggle) {
//       try {
//         onBookmarkToggle(post._id, newBookmarkedState);
//         setIsBookmarked(newBookmarkedState);
//         toast.success(newBookmarkedState ? "Bookmarked" : "Removed bookmark");
//       } catch (err) {
//         toast.error("Failed to update bookmark");
//       }
//     }
//   };

//   const handleReadMoreClick = () => {
//     if (!isAuthenticated) {
//       toast.info("Please login to read full post");
//       return;
//     }
//     onReadMoreClick(post);
//   };

//   const handleImageError = (e) => {
//     console.error("Failed to load image:", e.target.src);
//     setImageError(true);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

//     if (diffInHours < 1) {
//       const diffInMinutes = Math.floor((now - date) / (1000 * 60));
//       return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
//     } else if (diffInHours < 24) {
//       return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
//     } else {
//       const diffInDays = Math.floor(diffInHours / 24);
//       return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
//     }
//   };

//   const calculateReadTime = (content) => {
//     const wordsPerMinute = 200;
//     const wordCount = content?.split(/\s+/)?.length || 0;
//     const minutes = Math.ceil(wordCount / wordsPerMinute);
//     return `${minutes} min read`;
//   };

//   // Show loading state while auth is being checked
//   if (authLoading) {
//     return <div className="p-6">Loading post...</div>;
//   }

//   return (
//     <div className="overflow-hidden transition-transform transform bg-white shadow-xl dark:bg-gray-800 rounded-2xl hover:scale-105">
//       <div className="relative">
//         {/* Fixed image rendering - only render img if we have a valid URL and no error */}
//         {imageUrl && !imageError ? (
//           <img
//             src={imageUrl}
//             alt={post.title || "Blog post image"}
//             className="object-cover w-full h-48"
//             onError={handleImageError}
//           />
//         ) : (
//           /* Fallback placeholder div */
//           <div className="flex items-center justify-center w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700">
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-2 bg-gray-400 rounded-full dark:bg-gray-500 flex items-center justify-center">
//                 <svg className="w-8 h-8 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">No Image</p>
//             </div>
//           </div>
//         )}
        
//         <span
//           className={`absolute top-4 left-4 rounded-full px-4 py-1 text-sm font-semibold text-white 
//           ${post.categories?.[0] === "Technology" && "bg-blue-600"}
//           ${post.categories?.[0] === "Design" && "bg-purple-600"}
//           ${post.categories?.[0] === "Business" && "bg-teal-600"}
//           ${post.categories?.[0] === "Marketing" && "bg-orange-600"}
//           ${post.categories?.[0] === "Lifestyle" && "bg-green-600"}
//           ${post.categories?.[0] === "Finance" || ("Health" && "bg-indigo-600")}
//         `}
//         >
//           {post.categories?.[0] || "Uncategorized"}
//         </span>
//         {isAuthenticated && (
//           <button
//             onClick={handleBookmarkClick}
//             className={`absolute top-4 right-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2 rounded-full text-white transition-colors
//             ${isBookmarked ? "text-blue-400" : "hover:text-blue-400"}
//             `}
//           >
//             <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
//           </button>
//         )}
//       </div>

//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
//               {post.author?.username?.charAt(0) || "A"}
//             </div>
//             <div>
//               <p className="font-semibold text-gray-900 dark:text-white">
//                 {post.author?.username || "Anonymous"}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {formatDate(post.createdAt || new Date())}
//               </p>
//             </div>
//           </div>
//           <span className="text-sm text-gray-500 dark:text-gray-400">
//             {calculateReadTime(post.content)}
//           </span>
//         </div>

//         <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
//           {post.title}
//         </h3>
//         <p className="mb-6 text-gray-600 dark:text-gray-400 line-clamp-3">
//           {post.summary || post.content?.substring(0, 150) + "..."}
//         </p>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
//             <div
//               className={`flex items-center space-x-1 ${
//                 isLikeLoading
//                   ? "cursor-not-allowed opacity-50"
//                   : "cursor-pointer"
//               }`}
//               onClick={!isLikeLoading ? handleLikeClick : undefined}
//             >
//               <Heart
//                 size={18}
//                 fill={isLiked ? "red" : "none"}
//                 color={isLiked ? "red" : "currentColor"}
//               />
//               <span>{likeCount}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <MessageCircle size={18} />
//               <span>{post.comments?.length || 0}</span>
//             </div>
//           </div>
//           <button
//             onClick={handleReadMoreClick}
//             className="px-6 py-2 font-semibold text-white transition-colors bg-black rounded-full dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
//           >
//             Read More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

import React, { useState, useEffect } from "react";
import { Bookmark, Heart, MessageCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const PostCard = ({ post, onBookmarkToggle, onReadMoreClick }) => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // Debug function to test image URL
  const testImageUrl = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      console.log(`Image test for ${url}:`, {
        status: response.status,
        ok: response.ok,
        headers: {
          'content-type': response.headers.get('content-type'),
          'content-length': response.headers.get('content-length')
        }
      });
      return response.ok;
    } catch (error) {
      console.error(`Image test failed for ${url}:`, error);
      return false;
    }
  };

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

    const handleImageUrl = async () => {
      console.log('🖼️ Processing image for post:', post.title);
      console.log('🖼️ Raw coverImage:', post.coverImage);

      if (!post.coverImage || post.coverImage.trim() === "") {
        console.log('🖼️ No cover image provided, using placeholder');
        setImageUrl(null);
        setImageLoading(false);
        return;
      }

      let finalUrl;
      
      if (post.coverImage.startsWith("http")) {
        finalUrl = post.coverImage;
        console.log('🖼️ Using absolute URL:', finalUrl);
      } else {
        // Handle different path formats
        const cleanPath = post.coverImage.startsWith('/') 
          ? post.coverImage 
          : `/${post.coverImage}`;
        
        // Try different URL constructions
        const possibleUrls = [
          `https://social-blogging-app-hz1t.onrender.com${cleanPath}`,
          `https://social-blogging-app-hz1t.onrender.com/uploads${cleanPath.replace('/uploads', '')}`,
          `https://social-blogging-app-hz1t.onrender.com/api${cleanPath}`,
          `https://social-blogging-app-hz1t.onrender.com/static${cleanPath}`
        ];

        console.log('🖼️ Testing possible URLs:', possibleUrls);

        // Test each URL
        for (const url of possibleUrls) {
          const isValid = await testImageUrl(url);
          if (isValid) {
            finalUrl = url;
            console.log('🖼️ ✅ Found working URL:', finalUrl);
            break;
          }
        }

        if (!finalUrl) {
          console.log('🖼️ ❌ No working URL found, using first option:', possibleUrls[0]);
          finalUrl = possibleUrls[0];
        }
      }

      setImageUrl(finalUrl);
      setImageLoading(false);
    };

    checkLikeStatus();
    handleImageUrl();
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

  const handleImageError = (e) => {
    console.error("🖼️ ❌ Failed to load image:", e.target.src);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log("🖼️ ✅ Image loaded successfully:", imageUrl);
    setImageLoading(false);
    setImageError(false);
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

  if (authLoading) {
    return <div className="p-6">Loading post...</div>;
  }

  return (
    <div className="overflow-hidden transition-transform transform bg-white shadow-xl dark:bg-gray-800 rounded-2xl hover:scale-105">
      <div className="relative">
        {/* Image Section with Enhanced Error Handling */}
        {imageLoading ? (
          /* Loading state */
          <div className="flex items-center justify-center w-full h-48 bg-gray-100 dark:bg-gray-700 animate-pulse">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading image...</p>
            </div>
          </div>
        ) : imageUrl && !imageError ? (
          /* Valid image */
          <img
            src={imageUrl}
            alt={post.title || "Blog post image"}
            className="object-cover w-full h-48"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          /* Fallback placeholder with debug info */
          <div className="flex flex-col items-center justify-center w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-400 rounded-full dark:bg-gray-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No Image Provided</p>
              {/* Debug info in development */}
              {/* {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded mt-2">
                  <AlertCircle className="inline w-3 h-3 mr-1" />
                  Debug: {post.coverImage || 'No image URL'}
                </div>
              )} */}
            </div>
          </div>
        )}
        
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