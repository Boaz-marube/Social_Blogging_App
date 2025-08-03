// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FiSave, FiEye, FiArrowLeft, FiSettings } from "react-icons/fi";

// const CreatePageNav = () => {
//   const location = useLocation();
  
//   // Only show this nav on create page
//   if (location.pathname !== "/create-post") {
//     return null;
//   }

//   return (
//     <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3">
//       <div className="flex items-center justify-between max-w-7xl mx-auto">
//         {/* Left side - Back button */}
//         <div className="flex items-center gap-4">
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
//           >
//             <FiArrowLeft size={18} />
//             <span className="hidden sm:inline">Back to Home</span>
//           </Link>
//         </div>

//         {/* Center - Create page title */}
//         <div className="flex-1 text-center">
//           <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Create New Post
//           </h1>
//         </div>

//         {/* Right side - Action buttons */}
//         <div className="flex items-center gap-2 sm:gap-3">
//           {/* Preview button */}
//           <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
//             <FiEye size={16} />
//             <span className="hidden sm:inline">Preview</span>
//           </button>

//           {/* Settings button */}
//           <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
//             <FiSettings size={16} />
//             <span className="hidden sm:inline">Settings</span>
//           </button>

//           {/* Save draft button */}
//           <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
//             <FiSave size={16} />
//             <span className="hidden sm:inline">Save Draft</span>
//           </button>

//           {/* Publish button */}
//           <button className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-800 dark:bg-purple-600 text-white rounded-md hover:bg-purple-900 dark:hover:bg-purple-700 transition-colors">
//             <span>Publish</span>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default CreatePageNav;

