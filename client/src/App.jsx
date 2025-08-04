import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your components
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import MyPostsPage from "./components/MyPosts";

import Dashboard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";
import Layout from "./components/Layout";
import ForgotPassword from "./pages/ForgetPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes - redirect to dashboard if already authenticated */}
            <Route element={<Layout />}>
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />

              {/* Protected routes - require authentication */}
                <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              /> 
              <Route path="/home" element={<Home />} />
               <Route
                path="/posts"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              /> 
              <Route
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
                <Route
                path="/my-post"
                element={
                  <ProtectedRoute>
                    <MyPostsPage />
                  </ProtectedRoute>
                }
              />

              {/* Default route */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
          </Routes>

          {/* Global Toast Container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
