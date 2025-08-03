import { ChevronDown } from "lucide-react";
import React from "react";
const FilterBar = ({
  posts,
  sortOrder,
  handleSortClick,
  showCategoryFilter,
  setShowCategoryFilter,
  categories,
  handleCategoryFilter,
  totalPosts,
}) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 mb-8 bg-white shadow-sm sm:flex-row dark:bg-gray-800 rounded-xl">
      <div className="flex items-center mb-4 space-x-4 sm:mb-0">
        <div className="relative">
          <button
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            className="flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <span className="font-semibold">All</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                showCategoryFilter ? "rotate-180" : ""
              }`}
            />
          </button>
          {showCategoryFilter && (
            <div className="absolute left-0 z-10 w-48 py-2 mt-2 bg-white rounded-lg shadow-lg top-full dark:bg-gray-700">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className="w-full px-4 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="font-semibold text-gray-500 dark:text-gray-400">
          Sort by:
        </span>
        <button
          onClick={() => handleSortClick("Recent")}
          className={`px-4 py-2 font-semibold rounded-full transition-colors ${
            sortOrder === "Recent"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => handleSortClick("Popular")}
          className={`px-4 py-2 font-semibold rounded-full transition-colors ${
            sortOrder === "Popular"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          Popular
        </button>
      </div>
      <p className="mt-4 text-gray-500 dark:text-gray-400 sm:mt-0">
        Showing 1-{posts.length} of {totalPosts} articles
      </p>
    </div>
  );
};

export default FilterBar;
