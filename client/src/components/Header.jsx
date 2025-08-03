// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import ThemeToggle from "./ThemeToggle";
// import logo from "../../src/assets/blog_logo.svg";
// import { FiMenu, FiX } from "react-icons/fi";

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="sticky top-0 flex items-center justify-between h-16 px-4 py-4 transition-colors duration-300 bg-white shadow-lg z-10000 dark:bg-slate-800 sm:px-6">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <img src={logo} alt="Blog Logo" className="w-[150px] h-11" />
//       </div>

//       {/* Desktop Navigation */}
//       <div className="items-center hidden gap-4 md:flex">
//         <ThemeToggle />
//         <Link
//           to="/signup"
//           className="px-4 py-2 text-sm text-white transition-colors bg-purple-800 rounded-md dark:bg-purple-600 dark:hover:bg-purple-700"
//         >
//           Sign Up
//         </Link>
//         <Link
//           to="/sign-in"
//           className="px-4 py-2 text-sm text-purple-800 transition-colors border border-purple-800 rounded-md dark:border-purple-600 dark:text-purple-300 hover:bg-purple-800 hover:text-white"
//         >
//           Log In
//         </Link>
//       </div>

//       {/* Mobile Hamburger Button */}
//       <button
//         className="p-2 text-gray-700 md:hidden dark:text-gray-300"
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         aria-label="Toggle menu"
//       >
//         {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="absolute left-0 right-0 flex flex-col items-center gap-4 px-6 py-4 transition-all duration-300 bg-white shadow-lg md:hidden top-16 dark:bg-gray-800">
//           <div className="flex justify-center w-full">
//             <ThemeToggle />
//           </div>
//           <Link
//             to="/signup"
//             className="w-full px-4 py-2 text-sm text-center text-white transition-colors bg-purple-800 rounded-md dark:bg-purple-600 hover:bg-purple-900 dark:hover:bg-purple-700"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Sign Up
//           </Link>
//           <Link
//             to="/sign-in"
//             className="w-full px-4 py-2 text-sm text-center text-purple-800 transition-colors border border-purple-800 rounded-md dark:border-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-700"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Log In
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../../src/assets/blog_logo.svg";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext"; // 👈 import auth hook

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // 👈 use context

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 py-4 transition-colors duration-300 bg-white shadow-lg dark:bg-slate-800 sm:px-6">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Blog Logo" className="w-[150px] h-11" />
      </div>

      {/* Desktop Navigation */}
      <div className="items-center hidden gap-4 md:flex">
        <ThemeToggle />
        {user ? (
          <>
            <span className="text-sm text-gray-700 dark:text-white">
              Welcome, {user.username || "User"}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-red-600 transition-colors border border-red-600 rounded-md hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm text-white transition-colors bg-purple-800 rounded-md dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="border border-purple-800 dark:border-purple-600 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-md text-sm hover:bg-purple-800 hover:text-white transition-colors"
            >
              Log In
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="p-2 text-gray-700 md:hidden dark:text-gray-300"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 flex flex-col items-center gap-4 px-6 py-4 transition-all duration-300 bg-white shadow-lg md:hidden top-16 dark:bg-gray-800">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-gray-700 dark:text-white">
                Welcome, {user.username || "User"}
              </span>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-center text-red-600 transition-colors border border-red-600 rounded-md hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-4 py-2 text-sm text-center text-white transition-colors bg-purple-800 rounded-md dark:bg-purple-600 hover:bg-purple-900 dark:hover:bg-purple-700"
              >
                Sign Up
              </Link>
              <Link
                to="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-4 py-2 text-sm text-center text-purple-800 transition-colors border border-purple-800 rounded-md dark:border-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-700"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
