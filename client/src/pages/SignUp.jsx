// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { useAuth } from "../../context/AuthContext"; // Adjust path as needed
// import { useNavigate, Navigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import React from "react";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const { register, loading, isAuthenticated } = useAuth();
  
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Redirect if already authenticated
//   if (isAuthenticated) {
//     return <Navigate to="/sign-in" replace />;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Client-side validation
//       if (
//         !formData.name ||
//         !formData.email ||
//         !formData.password ||
//         !formData.confirmPassword
//       ) {
//         toast.error("Please fill in all required fields");
//         return;
//       }

//       if (formData.password !== formData.confirmPassword) {
//         toast.error("Passwords do not match");
//         return;
//       }

//       if (formData.password.length < 6) {
//         toast.error("Password must be at least 6 characters");
//         return;
//       }

//       // Call register function from AuthContext
//       const result = await register({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });

//       if (result.success) {
//         toast.success("Account created! Please log in to continue.");
        
//         // Redirect after successful registration
//         setTimeout(() => {
//           navigate('/sign-in');
//         }, 1500);
//       } else {
//         toast.error(result.error);
//       }

//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('Registration failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-slate-900 flex flex-col justify-center py-3 sm:px-6 lg:px-8 transition-colors duration-300 ">
//       <ToastContainer />
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
//           Sign Up
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
//           Join our blogging community and start sharing your stories.
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
//         <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-colors duration-300">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Name *
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleChange}
//                   disabled={loading || isSubmitting}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Email *
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={loading || isSubmitting}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Password *
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   disabled={loading || isSubmitting}
//                   className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
//                 />
//                 <button
//                   type="button"
//                   disabled={loading || isSubmitting}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       Hide
//                     </span>
//                   ) : (
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       Show
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Confirm Password *
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   disabled={loading || isSubmitting}
//                   className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
//                 />
//                 <button
//                   type="button"
//                   disabled={loading || isSubmitting}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       Hide
//                     </span>
//                   ) : (
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       Show
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading || isSubmitting}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating Account...
//                   </>
//                 ) : (
//                   'Sign Up'
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300 dark:border-gray-600" />
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <a
//                 href="/sign-in"
//                 className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
//               >
//                 Log in
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed
import { useNavigate, Navigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, loading, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    // Username should be at least 3 characters and only contain letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const validateForm = () => {
    // Dismiss any existing toasts
    toast.dismiss();

    // Check if all fields are filled
    if (!formData.name.trim()) {
      toast.error("Username is required");
      document.getElementById("name")?.focus();
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      document.getElementById("email")?.focus();
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      document.getElementById("password")?.focus();
      return false;
    }

    if (!formData.confirmPassword.trim()) {
      toast.error("Please confirm your password");
      document.getElementById("confirmPassword")?.focus();
      return false;
    }

    // Validate username format
    if (!validateUsername(formData.name)) {
      toast.error("Username must be 3-20 characters long and contain only letters, numbers, and underscores");
      document.getElementById("name")?.focus();
      return false;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      document.getElementById("email")?.focus();
      return false;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      document.getElementById("password")?.focus();
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      document.getElementById("confirmPassword")?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call register function from AuthContext
      const result = await register({
        name: formData.name.trim(), // This will be mapped to 'username' in the API
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (result.success) {
        toast.success("Account created successfully! Please log in to continue.");
        
        // Redirect to sign in page after successful registration
        setTimeout(() => {
          navigate('/sign-in'); // Updated to match your SignIn route
        }, 2000);
      } else {
        // Handle specific error messages
        if (result.error.includes("User already exists")) {
          toast.error("An account with this email or username already exists.");
          setTimeout(() => {
            navigate('/sign-in');
          }, 2000);
        } else {
          toast.error(result.error || "Registration failed. Please try again.");
        }
      }

    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-slate-900 flex flex-col justify-center py-3 sm:px-6 lg:px-8 transition-colors duration-300">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign Up
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Join our blogging community and start sharing your stories.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-colors duration-300">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username *
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="username"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  placeholder="Choose a unique username"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                3-20 characters, letters, numbers, and underscores only
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email *
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  placeholder="Enter your email address"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password *
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  placeholder="Create a strong password"
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
                <button
                  type="button"
                  disabled={loading || isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Hide
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Show
                    </span>
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                At least 6 characters long
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password *
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  placeholder="Confirm your password"
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
                <button
                  type="button"
                  disabled={loading || isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Hide
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Show
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;