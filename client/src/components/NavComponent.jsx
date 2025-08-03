import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiGrid, FiFileText } from "react-icons/fi";

const GlobalNav = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: FiHome
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiGrid
    },
    {
      name: "Blog Posts",
      path: "/blog",
      icon: FiFileText
    }
  ];

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = isActivePath(item.path);
        
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "text-purple-800 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Icon size={16} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default GlobalNav;