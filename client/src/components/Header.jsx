import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
// import CreatePageNav from "./CreatepageNav";
import GlobalNav from "./NavComponent"; // Import the new global nav
import logo from "../../src/assets/blog_logo.svg";
import { FiMenu, FiX, FiHome, FiGrid, FiFileText } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { FiUser } from "react-icons/fi";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Mobile nav items
  const mobileNavItems = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "Dashboard", path: "/dashboard", icon: FiGrid },
    { name: "Blog Posts", path: "/blog", icon: FiFileText }
  ];

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-lg px-4 sm:px-6 py-4 flex items-center justify-between h-16 transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Blog Logo" className="w-[150px] h-11" />
        </div>

        {/* Global Navigation - Desktop Only */}
        <GlobalNav />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer">
            <FiUser size={20} className="text-gray-700 dark:text-white" />
            <span className="text-sm text-gray-700 dark:text-white hidden sm:inline">
              {user.username || "User"}
            </span>
          </div>

          {/* Dropdown with better hover handling */}
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-md rounded-md
            invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto
            transition-all duration-300 delay-100 z-50"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              // optional: allow smoother mouse movement
              onMouseEnter={(e) => e.currentTarget.parentElement.classList.add("hovered")}
              onMouseLeave={(e) =>
                setTimeout(() => {
                  e.currentTarget.parentElement.classList.remove("hovered");
                }, 200)
              }
            >
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full text-left block px-4 py-2 hover:bg-red-50 dark:hover:bg-red-700 text-red-600 dark:text-red-400"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

          ) : (
            <>
              <Link
                to="/signup"
                className="bg-purple-800 dark:bg-purple-600 text-white px-4 py-2 rounded-md text-sm dark:hover:bg-purple-700 transition-colors"
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
          className="md:hidden p-2 text-gray-700 dark:text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-4 px-6 flex flex-col items-center gap-4 transition-all duration-300">
            {/* Mobile Navigation Links */}
            <div className="w-full border-b border-gray-200 dark:border-gray-600 pb-4 mb-4">
              <div className="flex flex-col gap-2">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "text-purple-800 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <ThemeToggle />
            {user ? (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <FiUser size={20} className="text-gray-700 dark:text-white" />
                  <span className="text-sm text-gray-700 dark:text-white hidden sm:inline">
                    {user.username || "User"}
                  </span>
                </div>

                {/* Dropdown menu on hover */}
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-md rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-2 hover:bg-red-50 dark:hover:bg-red-700 text-red-600 dark:text-red-400"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (

              <>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-purple-800 dark:bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-900 dark:hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-purple-800 dark:border-purple-600 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-md text-sm hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        )}
      </header>
      
      {/* Create Page Navigation - Only shows on /create route */}
      {/* <CreatePageNav /> */}
    </>
  );
}