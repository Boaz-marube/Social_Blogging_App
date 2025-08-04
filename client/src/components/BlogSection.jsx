// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BlogHeader from "./BlogHeader";
// import PostCard from "./PostCard";
// import PostDetail from "./PostDetail";
// import FilterBar from "./FilterBar";
// import Toast from "./Toast";

// // Base API URL
// const API_BASE_URL = "https://social-blogging-app-hz1t.onrender.com";

// export default function BlogSection() {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortOrder, setSortOrder] = useState("Recent");
//   const [showCategoryFilter, setShowCategoryFilter] = useState(false);
//   const [toast, setToast] = useState({ isVisible: false, message: "" });
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const categories = [
//     "All",
//     "Technology",
//     "Design",
//     "Business",
//     "Marketing",
//     "Lifestyle",
//     "Finance",
//   ];


//   const fetchPosts = async (page = 1, category = null) => {
//     try {
//       setIsLoading(true);
//       let url = `${API_BASE_URL}?page=${page}&limit=6`;
  
//       if (category && category !== "All") {
//         url += `&category=${category}`;
//       }
  
//       const response = await axios.get(url);
      
//       // The backend returns: { success: true, data: posts, pagination: {...} }
//       // So we access response.data.data for posts and response.data.pagination for pagination
//       setPosts(response.data.data || []);
//       setTotalPosts(response.data.pagination?.totalPosts || 0);
//       setCurrentPage(page);
//       setSelectedCategory(category || "All");
//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch posts:", err);
//       setError("Failed to load posts. Please try again later.");
//       setPosts([]);
//       setTotalPosts(0);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // const fetchPosts = async (page = 1, category = null) => {
//   //   try {
//   //     setIsLoading(true);
//   //     let url = `${API_BASE_URL}?page=${page}&limit=6`;

//   //     if (category && category !== "All") {
//   //       url += `&category=${category}`;
//   //     }

//   //     const response = await axios.get(url);
//   //     setPosts(response.data.data);
//   //     setTotalPosts(response.data.pagination.totalPosts);
//   //     setCurrentPage(page);
//   //     setSelectedCategory(category || "All");
//   //     setError(null);
//   //   } catch (err) {
//   //     console.error("Failed to fetch posts:", err);
//   //     setError("Failed to load posts. Please try again later.");
//   //     setPosts([]);
//   //     setTotalPosts(0);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleSortClick = (order) => {
//     setSortOrder(order);
//     if (order === "Popular") {
//       const sortedPosts = [...posts].sort(
//         (a, b) => (b.likes || 0) - (a.likes || 0)
//       );
//       setPosts(sortedPosts);
//     } else {
//       fetchPosts(1, selectedCategory);
//     }
//   };

//   const handleCategoryFilter = (category) => {
//     fetchPosts(1, category);
//     setShowCategoryFilter(false);
//   };

//   const handleBookmarkToggle = async (id, isBookmarked) => {
//     try {
//       setToast({
//         isVisible: true,
//         message: isBookmarked
//           ? "Added to favourites!"
//           : "Removed from favourites!",
//       });

//       setTimeout(() => {
//         setToast({ isVisible: false, message: "" });
//       }, 3000);
//     } catch (err) {
//       console.error("Failed to update bookmark:", err);
//     }
//   };

//   const handleReadMoreClick = async (post) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/${post._id}`);
//       setSelectedPost(response.data.data);
//     } catch (err) {
//       console.error("Failed to fetch post details:", err);
//       setSelectedPost(post);
//     }
//   };

//   const handleLoadMore = () => {
//     fetchPosts(currentPage + 1, selectedCategory);
//   };

//   if (selectedPost) {
//     return (
//       <PostDetail
//         post={selectedPost}
//         onBackClick={() => setSelectedPost(null)}
//       />
//     );
//   }

//   if (isLoading && currentPage === 1) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="p-4 text-red-500 bg-red-100 rounded-lg">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen font-sans text-gray-900 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 dark:text-white">
//       <style jsx="true">{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.5s ease-out forwards;
//         }
//       `}</style>
//       <div className="container p-4 mx-auto sm:p-8">
//         <BlogHeader />
//         <FilterBar
//           posts={posts}
//           sortOrder={sortOrder}
//           handleSortClick={handleSortClick}
//           showCategoryFilter={showCategoryFilter}
//           setShowCategoryFilter={setShowCategoryFilter}
//           categories={categories}
//           handleCategoryFilter={handleCategoryFilter}
//           totalPosts={totalPosts}
//         />

//         {posts.length === 0 ? (
//           <div className="py-12 text-center">
//             <p className="text-gray-500 dark:text-gray-400">
//               No posts found. Check back later!
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {posts.map((post) => (
//                 <PostCard
//                   key={post._id}
//                   post={post}
//                   onBookmarkToggle={handleBookmarkToggle}
//                   onReadMoreClick={handleReadMoreClick}
//                 />
//               ))}
//             </div>
//             {posts.length < totalPosts && (
//               <div className="mt-8 text-center">
//                 <button
//                   onClick={handleLoadMore}
//                   className="px-6 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Loading..." : "Load More"}
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       <Toast isVisible={toast.isVisible} message={toast.message} />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogHeader from "./BlogHeader";
import PostCard from "./PostCard";
import PostDetail from "./PostDetail";
import FilterBar from "./FilterBar";
import Toast from "./Toast";

// Base API URL
const API_BASE_URL = "https://social-blogging-app-hz1t.onrender.com";

// Placeholder posts for fallback
const PLACEHOLDER_POSTS = [
  {
    _id: "placeholder-1",
    title: "Getting Started with React Development",
    summary: "Learn the fundamentals of React and start building modern web applications with this comprehensive guide for beginners.",
    category: "Technology",
    author: "Alex Johnson",
    publishedDate: "2024-01-15",
    likes: 45,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    content: "React has revolutionized the way we build user interfaces. This comprehensive guide will walk you through the essential concepts you need to know to get started with React development...",
    isPlaceholder: true
  },
  {
    _id: "placeholder-2",
    title: "Modern UI/UX Design Principles",
    summary: "Explore the latest trends and best practices in user interface and user experience design for creating intuitive digital products.",
    category: "Design",
    author: "Sarah Chen",
    publishedDate: "2024-01-10",
    likes: 67,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    content: "Great design is invisible. It seamlessly guides users through their journey while providing an enjoyable and efficient experience. In this article, we'll explore the fundamental principles...",
    isPlaceholder: true
  },
  {
    _id: "placeholder-3",
    title: "Building Scalable Business Strategies",
    summary: "Discover how to create and implement business strategies that grow with your company and adapt to market changes.",
    category: "Business",
    author: "Michael Rodriguez",
    publishedDate: "2024-01-08",
    likes: 32,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    content: "Scalability isn't just about handling more customers or revenue—it's about building systems, processes, and cultures that can evolve. Let's dive into the key components...",
    isPlaceholder: true
  },
  {
    _id: "placeholder-4",
    title: "Digital Marketing in 2024",
    summary: "Stay ahead of the curve with the latest digital marketing strategies and tools that are shaping the industry this year.",
    category: "Marketing",
    author: "Emma Thompson",
    publishedDate: "2024-01-05",
    likes: 89,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    content: "The digital marketing landscape continues to evolve at breakneck speed. From AI-powered personalization to privacy-first strategies, here's what you need to know...",
    isPlaceholder: true
  },
  {
    _id: "placeholder-5",
    title: "Work-Life Balance in Remote Work",
    summary: "Learn practical strategies for maintaining a healthy work-life balance while working from home in today's digital world.",
    category: "Lifestyle",
    author: "David Park",
    publishedDate: "2024-01-03",
    likes: 54,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    content: "Remote work has become the new normal for millions of professionals worldwide. While it offers unprecedented flexibility, it also presents unique challenges...",
    isPlaceholder: true
  },
  {
    _id: "placeholder-6",
    title: "Personal Finance Management Tips",
    summary: "Master your money with these proven strategies for budgeting, saving, and investing to build long-term financial security.",
    category: "Finance",
    author: "Lisa Wang",
    publishedDate: "2024-01-01",
    likes: 76,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    content: "Financial literacy is one of the most important life skills, yet it's rarely taught in schools. Whether you're just starting your career or looking to optimize your finances...",
    isPlaceholder: true
  }
];

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
  const [usingPlaceholders, setUsingPlaceholders] = useState(false);

  const categories = [
    "All",
    "Technology",
    "Design",
    "Business",
    "Marketing",
    "Lifestyle",
    "Finance",
  ];


// Base API URL - try different endpoint variations
const API_BASE_URL = "https://social-blogging-app-hz1t.onrender.com";

const fetchPosts = async (page = 1, category = null) => {
  try {
    setIsLoading(true);
    
    // Try different possible endpoints
    const possibleEndpoints = [
      `/api/posts?page=${page}&limit=6`,
      `/posts?page=${page}&limit=6`,
      `/api/blogs?page=${page}&limit=6`,
      `/blogs?page=${page}&limit=6`
    ];
    
    let url = possibleEndpoints[0]; // Start with most common
    
    if (category && category !== "All") {
      url += `&category=${encodeURIComponent(category)}`;
    }
    
    const fullUrl = `${API_BASE_URL}${url}`;
    console.log("🚀 Attempting to fetch from:", fullUrl);
    
    const response = await axios.get(fullUrl, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log("✅ Response received:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      dataType: typeof response.data,
      keys: response.data ? Object.keys(response.data) : 'no keys'
    });
    
    // Handle different possible response structures
    let posts = [];
    let totalPosts = 0;
    
    if (response.data) {
      // Try different response structures
      if (response.data.data && Array.isArray(response.data.data)) {
        // Structure: { success: true, data: [...], pagination: {...} }
        posts = response.data.data;
        totalPosts = response.data.pagination?.totalPosts || posts.length;
      } else if (Array.isArray(response.data)) {
        // Direct array structure: [...]
        posts = response.data;
        totalPosts = posts.length;
      } else if (response.data.posts && Array.isArray(response.data.posts)) {
        // Structure: { posts: [...], total: 123 }
        posts = response.data.posts;
        totalPosts = response.data.total || posts.length;
      } else if (response.data.results && Array.isArray(response.data.results)) {
        // Structure: { results: [...], count: 123 }
        posts = response.data.results;
        totalPosts = response.data.count || posts.length;
      }
    }
    
    if (posts.length === 0) {
      console.log("⚠️ No posts found in response, trying fallback endpoints...");
      throw new Error("No posts found in response");
    }
    
    console.log("🎉 Successfully loaded", posts.length, "posts from server");
    setPosts(posts);
    setTotalPosts(totalPosts);
    setCurrentPage(page);
    setSelectedCategory(category || "All");
    setError(null);
    setUsingPlaceholders(false);
    
  } catch (err) {
    console.group("❌ Error fetching posts:");
    console.log("Error:", err.message);
    
    if (err.response) {
      console.log("Server response:", err.response.status, err.response.data);
    }
    console.groupEnd();
    
    // If first endpoint fails, try the others
    if (err.response?.status === 404) {
      console.log("🔄 Trying alternative endpoints...");
      // You could implement automatic fallback to other endpoints here
    }
    
    // Use placeholder posts as fallback
    const filteredPlaceholders = (category && category !== "All") 
      ? PLACEHOLDER_POSTS.filter(post => post.category === category)
      : PLACEHOLDER_POSTS;
    
    console.log("🔄 Using", filteredPlaceholders.length, "placeholder posts as fallback");
    
    setPosts(filteredPlaceholders);
    setTotalPosts(filteredPlaceholders.length);
    setCurrentPage(1);
    setSelectedCategory(category || "All");
    setError(`Unable to load posts from server. ${err.response?.status === 404 ? 'API endpoint not found.' : 'Server error.'}`);
    setUsingPlaceholders(true);
    
  } finally {
    setIsLoading(false);
  }
};

// Enhanced server testing
const testServerConnection = async () => {
  console.log("🔍 Testing server endpoints...");
  
  const endpointsToTest = [
    '',
    '/api/posts',
    '/posts', 
    '/api/blogs',
    '/blogs',
    '/api',
    '/health'
  ];
  
  for (const endpoint of endpointsToTest) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`Testing: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      console.log(`✅ ${endpoint || 'root'}:`, {
        status: response.status,
        contentType,
        data: typeof data === 'string' ? data.substring(0, 100) + '...' : data
      });
      
    } catch (error) {
      console.log(`❌ ${endpoint || 'root'}:`, error.message);
    }
  }
};


  // const fetchPosts = async (page = 1, category = null) => {
  //   try {
  //     setIsLoading(true);
  //     let url = `${API_BASE_URL}?page=${page}&limit=6`;
  
  //     if (category && category !== "All") {
  //       url += `&category=${category}`;
  //     }
  
  //     console.log("🚀 Attempting to fetch from:", url);
  //     console.log("📡 API_BASE_URL:", API_BASE_URL);
      
  //     // Add timeout and better error handling
  //     const response = await axios.get(url, {
  //       timeout: 10000, // 10 second timeout
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     });
      
  //     console.log("✅ Response received:", {
  //       status: response.status,
  //       statusText: response.statusText,
  //       data: response.data,
  //       dataType: typeof response.data,
  //       hasData: !!response.data?.data,
  //       dataLength: response.data?.data?.length || 0
  //     });
      
  //     // Check if we actually got posts or if the response is empty
  //     if (!response.data || !response.data.data || response.data.data.length === 0) {
  //       console.log("⚠️ Empty response, falling back to placeholders");
  //       throw new Error("No posts returned from API or empty response");
  //     }
      
  //     // Success path
  //     console.log("🎉 Successfully loaded", response.data.data.length, "posts from server");
  //     setPosts(response.data.data);
  //     setTotalPosts(response.data.pagination?.totalPosts || response.data.data.length);
  //     setCurrentPage(page);
  //     setSelectedCategory(category || "All");
  //     setError(null);
  //     setUsingPlaceholders(false);
      
  //   } catch (err) {
  //     console.group("❌ Error fetching posts:");
  //     console.log("Error type:", err.name);
  //     console.log("Error message:", err.message);
  //     console.log("Error code:", err.code);
      
  //     if (err.response) {
  //       // Server responded with error status
  //       console.log("Server responded with error:");
  //       console.log("Status:", err.response.status);
  //       console.log("Status text:", err.response.statusText);
  //       console.log("Response data:", err.response.data);
  //     } else if (err.request) {
  //       // Request was made but no response received
  //       console.log("No response received:");
  //       console.log("Request details:", err.request);
  //     } else {
  //       // Something else happened
  //       console.log("Request setup error:", err.message);
  //     }
  //     console.groupEnd();
      
  //     // Test if it's a CORS issue
  //     if (err.message.includes('CORS') || err.message.includes('Access-Control')) {
  //       console.log("🚫 CORS issue detected");
  //     }
      
  //     // Test if it's a network issue
  //     if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
  //       console.log("🌐 Network connectivity issue detected");
  //     }
      
  //     // Use placeholder posts as fallback
  //     const filteredPlaceholders = (category && category !== "All") 
  //       ? PLACEHOLDER_POSTS.filter(post => post.category === category)
  //       : PLACEHOLDER_POSTS;
      
  //     console.log("🔄 Using", filteredPlaceholders.length, "placeholder posts as fallback");
      
  //     setPosts(filteredPlaceholders);
  //     setTotalPosts(filteredPlaceholders.length);
  //     setCurrentPage(1);
  //     setSelectedCategory(category || "All");
  //     setError(`Unable to connect to server: ${err.message}`);
  //     setUsingPlaceholders(true);
      
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // // Also add this helper function to test the server directly
  // const testServerConnection = async () => {
  //   console.log("🔍 Testing server connection...");
    
  //   try {
  //     // Test basic connectivity
  //     const response = await fetch(API_BASE_URL, {
  //       method: 'GET',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
      
  //     console.log("🔗 Server connection test:", {
  //       ok: response.ok,
  //       status: response.status,
  //       statusText: response.statusText,
  //       url: response.url
  //     });
      
  //     const data = await response.json();
  //     console.log("📊 Server response data:", data);
      
  //   } catch (error) {
  //     console.log("❌ Server connection test failed:", error);
  //   }
  // };
  
  // // Call this in useEffect to test server on component mount
  // useEffect(() => {
  //   testServerConnection();
  //   fetchPosts();
  // }, []);



  // const fetchPosts = async (page = 1, category = null) => {
  //   try {
  //     setIsLoading(true);
  //     let url = `${API_BASE_URL}?page=${page}&limit=6`;
  
  //     if (category && category !== "All") {
  //       url += `&category=${category}`;
  //     }
  
  //     const response = await axios.get(url);
      
  //     // Check if we actually got posts or if the response is empty
  //     if (!response.data || !response.data.data || response.data.data.length === 0) {
  //       throw new Error("No posts returned from API or empty response");
  //     }
      
  //     // The backend returns: { success: true, data: posts, pagination: {...} }
  //     // So we access response.data.data for posts and response.data.pagination for pagination
  //     setPosts(response.data.data);
  //     setTotalPosts(response.data.pagination?.totalPosts || response.data.data.length);
  //     setCurrentPage(page);
  //     setSelectedCategory(category || "All");
  //     setError(null);
  //     setUsingPlaceholders(false);
      
  //   } catch (err) {
  //     console.error("Failed to fetch posts:", err);
      
  //     // Use placeholder posts as fallback
  //     const filteredPlaceholders = (category && category !== "All") 
  //       ? PLACEHOLDER_POSTS.filter(post => post.category === category)
  //       : PLACEHOLDER_POSTS;
      
  //     setPosts(filteredPlaceholders);
  //     setTotalPosts(filteredPlaceholders.length);
  //     setCurrentPage(1);
  //     setSelectedCategory(category || "All");
  //     setError("Using sample posts - unable to connect to server");
  //     setUsingPlaceholders(true);
      
  //     // Debug logging
  //     console.log("Using placeholder posts:", filteredPlaceholders.length, "posts");
  //     console.log("Category filter:", category);
      
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


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
    } else if (usingPlaceholders) {
      // If using placeholders, sort locally instead of fetching
      const sortedPosts = [...PLACEHOLDER_POSTS].sort((a, b) => 
        new Date(b.publishedDate) - new Date(a.publishedDate)
      );
      const filteredPosts = selectedCategory && selectedCategory !== "All"
        ? sortedPosts.filter(post => post.category === selectedCategory)
        : sortedPosts;
      setPosts(filteredPosts);
    } else {
      fetchPosts(1, selectedCategory);
    }
  };

  const handleCategoryFilter = (category) => {
    if (usingPlaceholders) {
      // Filter placeholders locally
      const filteredPlaceholders = category && category !== "All" 
        ? PLACEHOLDER_POSTS.filter(post => post.category === category)
        : PLACEHOLDER_POSTS;
      setPosts(filteredPlaceholders);
      setSelectedCategory(category);
      setTotalPosts(filteredPlaceholders.length);
    } else {
      fetchPosts(1, category);
    }
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
    if (post.isPlaceholder) {
      // For placeholder posts, just use the post data directly
      setSelectedPost(post);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/${post._id}`);
      setSelectedPost(response.data.data);
    } catch (err) {
      console.error("Failed to fetch post details:", err);
      setSelectedPost(post);
    }
  };

  const handleLoadMore = () => {
    if (!usingPlaceholders) {
      fetchPosts(currentPage + 1, selectedCategory);
    }
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
        
        {/* Show notification when using placeholder data */}
        {usingPlaceholders && (
          <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              📡 Unable to connect to server. Showing sample posts for demonstration.
            </p>
          </div>
        )}
        
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
            {!usingPlaceholders && posts.length < totalPosts && (
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