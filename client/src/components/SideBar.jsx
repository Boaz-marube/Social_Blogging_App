// // 

// import React, { useState, useEffect } from 'react';
// import {
//   Home,
//   FileText,
//   PlusSquare,
//   LayoutDashboard,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   X,
// } from 'lucide-react';

// // Main App component
// export default function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const toggleCollapse = () => setIsCollapsed(!isCollapsed);

//   // Close mobile sidebar on resize to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Sidebar navigation items
//   const navItems = [
//     { name: 'Home', icon: Home, link: '/' },
//     { name: 'All Posts', icon: FileText, link: '/' },
//     { name: 'Create Post', icon: PlusSquare, link: '/createpost' },
//     { name: 'My Posts', icon: LayoutDashboard, link: '#' },
//   ];

//   // User profile data
//   const user = {
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     avatar: 'https://placehold.co/40x40/FFFFFF/000000?text=JD', // Placeholder avatar
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 z-0">
//       {/* Mobile Header with Hamburger button */}
//       <header className="fixed top-[60px] left-0 w-full z-30 md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
//         >
//           {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//         <span className="text-xl font-bold text-gray-900 dark:text-white">BlogSphere</span>
//         <div className="w-10" /> {/* Spacer for alignment */}
//       </header>

//       {/* Mobile Sidebar Overlay */}
//       <div
//         className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
//           isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={toggleSidebar}
//       />

//       {/* Sidebar container */}
//       <aside
//         className={`fixed top-[130px] left-0 h-screen z-50 flex flex-col p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out shadow-lg
//           ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'} md:static md:translate-x-0
//           ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
//       >
//         {/* Sidebar Header with collapse button for desktop */}
//         <div className=" flex justify-between items-center mb-6">
//           <div
//             className={`flex items-center space-x-2 transition-opacity duration-300 ${
//               isCollapsed ? 'md:opacity-0 md:hidden' : ''
//             }`}
//           >
//             <span className="text-xl font-bold text-gray-900 dark:text-white">BlogSphere</span>
//           </div>

//           {/* Collapse button for desktop sidebar */}
//           <button
//             onClick={toggleCollapse}
//             className="hidden md:flex p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//           </button>
//         </div>

//         {/* User Profile - Full view */}
//         <div
//           className={`flex items-center space-x-4 mb-8 transition-opacity duration-300 ${
//             isCollapsed && 'md:opacity-0 md:hidden'
//           }`}
//         >
//           <div className="relative">
//             <img
//               src={user.avatar}
//               alt="User Avatar"
//               className="w-10 h-10 rounded-full"
//             />
//             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
//           </div>
//           <div className="flex-1">
//             <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
//             <p className="text-xs text-gray-500">{user.email}</p>
//           </div>
//         </div>

//         {/* User Profile - Collapsed view */}
//         <div
//           className={`hidden md:flex flex-col items-center mb-8 transition-opacity duration-300 ${
//             !isCollapsed && 'md:hidden'
//           }`}
//         >
//           <img
//             src={user.avatar}
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full"
//           />
//           <span className="mt-2 text-xs font-semibold text-gray-900 dark:text-white">JD</span>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1">
//           <ul>
//             {navItems.map((item, index) => (
//               <li key={index} className="mb-2">
//                 <a
//                   href={item.link}
//                   className={`flex items-center p-3 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
//                     ${item.name === 'Home' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
//                 >
//                   <item.icon size={20} className="mr-3" />
//                   <span className={`transition-opacity duration-300 ${isCollapsed && 'md:opacity-0 md:hidden'}`}>
//                     {item.name}
//                   </span>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Bottom Section */}
//         <div className="mt-auto">
//           {/*  Logout */}
//           <ul>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center p-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
//               >
//                 <LogOut size={20} className="mr-3" />
//                 <span className={`transition-opacity duration-300 ${isCollapsed && 'md:opacity-0 md:hidden'}`}>
//                   Log out
//                 </span>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 p-4 pt-20 transition-all duration-300 ease-in-out md:ml-4 md:pt-4">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Main Content Area</h1>
//         <p className="mt-4 text-gray-700 dark:text-gray-300">
//           This is where the main content of your application will go. The sidebar will
//           adjust its visibility and size based on the screen size.
//         </p>
//       </main>
//     </div>
//   );
// }



// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import {
  Home,
  FileText,
  PlusSquare,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, loading } = useAuth();
  
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      setIsLoggingOut(false);
    }
  };

  // Sidebar navigation items
  const navItems = [
    { name: 'Home', icon: Home, link: '/home' },
    { name: 'All Posts', icon: FileText, link: '/posts' },
    { name: 'Create Post', icon: PlusSquare, link: '/create-post' },
    { name: 'My Posts', icon: LayoutDashboard, link: '/my-posts' },
  ];

  // Get current page name for active state
  const getCurrentPageName = () => {
    const currentItem = navItems.find(item => item.link === location.pathname);
    return currentItem ? currentItem.name : 'Home';
  };

  // If still loading user data, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 z-0">
      {/* Mobile Header with Hamburger button */}
      <header className="fixed top-0 left-0 w-full z-30 md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="text-xl font-bold text-gray-900 dark:text-white">BlogSphere</span>
        <div className="w-10" /> {/* Spacer for alignment */}
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar container */}
      <aside
        className={`fixed top-[70px] bottom-[60px] left-0 z-50 flex flex-col p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out shadow-lg
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'} md:static md:translate-x-0
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        {/* Sidebar Header with collapse button for desktop */}
        <div className="flex justify-between items-center mb-6 mt-4">
          <div
            className={`flex items-center space-x-2 transition-opacity duration-300 ${
              isCollapsed ? 'md:opacity-0 md:hidden' : ''
            }`}
          >
            <span className="text-xl font-bold text-gray-900 dark:text-white">BlogSphere</span>
          </div>

          {/* Collapse button for desktop sidebar */}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* User Profile - Full view */}
        <div
          className={`flex items-center space-x-4 mb-8 transition-opacity duration-300 ${
            isCollapsed && 'md:opacity-0 md:hidden'
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {user?.username || 'User'}
            </p>
            <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        {/* User Profile - Collapsed view */}
        <div
          className={`hidden md:flex flex-col items-center mb-8 transition-opacity duration-300 ${
            !isCollapsed && 'md:hidden'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-900 dark:text-white">
            {user?.username ? user.username.substring(0, 2).toUpperCase() : 'US'}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-2">
                <Link
                  to={item.link}
                  onClick={() => setIsSidebarOpen(false)} // Close mobile sidebar on navigation
                  className={`flex items-center p-3 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
                    ${location.pathname === item.link ? 'bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' : ''}`}
                >
                  <item.icon size={20} className="mr-3" />
                  <span className={`transition-opacity duration-300 ${isCollapsed && 'md:opacity-0 md:hidden'}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto">
          <ul>
            <li>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center p-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut size={20} className="mr-3" />
                <span className={`transition-opacity duration-300 ${isCollapsed && 'md:opacity-0 md:hidden'}`}>
                  {isLoggingOut ? 'Logging out...' : 'Log out'}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 pt-20 transition-all duration-300 ease-in-out md:ml-4 md:pt-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.username || 'User'}!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Current page: {getCurrentPageName()}
            </p>
          </div>

          {/* Dashboard Content based on current route */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            {location.pathname === '/dashboard' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-indigo-900 dark:text-indigo-300">Total Posts</h3>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">12</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900 dark:text-green-300">Published</h3>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">8</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-yellow-900 dark:text-yellow-300">Drafts</h3>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4</p>
                  </div>
                </div>
              </div>
            )}

            {location.pathname === '/posts' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">All Posts</h2>
                <p className="text-gray-600 dark:text-gray-400">Here you can view all blog posts.</p>
              </div>
            )}

            {location.pathname === '/create-post' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create New Post</h2>
                <p className="text-gray-600 dark:text-gray-400">Start writing your new blog post here.</p>
              </div>
            )}

            {location.pathname === '/my-posts' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">My Posts</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage your personal blog posts.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
