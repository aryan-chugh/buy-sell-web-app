// // import React, { useEffect, useState } from "react";
// // import ReCAPTCHA from "react-google-recaptcha";
// // import "./Login.css";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // // import CIcon from '@coreui/icons-react';
// // // import * as icon from '@coreui/icons';

// // const LoginPage = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     rememberMe: false,
// //   });
// //   const [error, setError] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [recaptchaToken, setRecaptchaToken] = useState("");
// //   const [captchaStatus, setCaptchaStatus] = useState(false);

// //   const handleInputChange = (e) => {
// //     const { id, value, type, checked } = e.target;
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [id]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const validateForm = () => {
// //     if (!formData.email || !formData.password) {
// //       setError("Please fill in all fields");
// //       return false;
// //     }

// //     if (!formData.email.includes("@")) {
// //       setError("Please enter a valid email address");
// //       return false;
// //     }

// //     if (!recaptchaToken || !captchaStatus) {
// //       setError("Please verify the reCAPTCHA");
// //       return false;
// //     }

// //     return true;
// //   };

// //   const submitForm = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     setIsLoading(true);
// //     setError("");

// //     try {
// //       const response = await axios.post("http://localhost:4000/login/api/auth", {
// //         email: formData.email,
// //         password: formData.password,
// //         recaptcha_token: recaptchaToken,
// //       });

// //       if (response.status === 200) {
// //         const { token, user } = response.data;

// //         if (formData.rememberMe) {
// //           localStorage.setItem("token", token);
// //           localStorage.setItem("user", JSON.stringify(user));
// //         } else {
// //           sessionStorage.setItem("token", token);
// //           sessionStorage.setItem("user", JSON.stringify(user));
// //         }

// //         navigate("/dashboard");
// //       } else {
// //         setError("Error: Could not login!");
// //       }
// //     } catch (error) {
// //       console.error("Error logging in:", error);
// //       setError("Login failed. Please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleRecaptchaChange = (token) => {
// //     setCaptchaStatus(true);
// //     setRecaptchaToken(token);
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-form">
// //         <button
// //           className="back-home-button home-btn"
// //           onClick={() => (window.location.href = "/")}
// //         >
// //         {/* <CIcon icon={icon.home} size="xxl"/> */}
// //         </button>
// //         <h1>Login to Colorlib</h1>
// //         <p>Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>

// //         <form>
// //           <label htmlFor="email">Email</label>
// //           <input
// //             type="email"
// //             id="email"
// //             placeholder="your-email@gmail.com"
// //             value={formData.email}
// //             onChange={handleInputChange}
// //           />

// //           <label htmlFor="password">Password</label>
// //           <input
// //             type="password"
// //             id="password"
// //             placeholder="Your Password"
// //             value={formData.password}
// //             onChange={handleInputChange}
// //           />

// //           <div className="form-options">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 id="rememberMe"
// //                 checked={formData.rememberMe}
// //                 onChange={handleInputChange}
// //               />
// //               <p>Remember me</p>
// //             </label>
// //             <a href="/forgot-password">Forgot Password</a>
// //           </div>

// //           <ReCAPTCHA
// //             sitekey="6Lcd4sIqAAAAAOIgg_w2I3zl256ADBubFW8uBeBh" // Replace with your actual site key
// //             onChange={handleRecaptchaChange}
// //           />

// //           {error && <p className="error">{error}</p>}

// //           <button
// //             type="submit"
// //             className="login-button"
// //             onClick={submitForm}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? "Logging In..." : "Log In"}
// //           </button>
// //         </form>

// //         <div className="signup-option">
// //           <p>
// //             Not yet registered? <a href="/signup">Sign Up Now</a>
// //           </p>
// //         </div>
// //       </div>
// //       <div className="login-image">
// //         <div className="image-overlay">
// //           <img
// //             src="https://via.placeholder.com/400x600"
// //             alt="Kitchen shelves with decorative items"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;
// import React, { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import axios from "axios";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [recaptchaToken, setRecaptchaToken] = useState("");
//   const [captchaStatus, setCaptchaStatus] = useState(false);

//   const handleInputChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.email || !formData.password) {
//       setError("Please fill in all fields");
//       return false;
//     }

//     if (!formData.email.includes("@")) {
//       setError("Please enter a valid email address");
//       return false;
//     }

//     if (!recaptchaToken || !captchaStatus) {
//       setError("Please verify the reCAPTCHA");
//       return false;
//     }

//     return true;
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:4000/login/api/auth", {
//         email: formData.email,
//         password: formData.password,
//         recaptcha_token: recaptchaToken,
//       });

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         if (formData.rememberMe) {
//           localStorage.setItem("token", token);
//           localStorage.setItem("user", JSON.stringify(user));
//         } else {
//           sessionStorage.setItem("token", token);
//           sessionStorage.setItem("user", JSON.stringify(user));
//         }

//         navigate("/dashboard");
//       } else {
//         setError("Error: Could not login!");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setError("Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRecaptchaChange = (token) => {
//     setCaptchaStatus(true);
//     setRecaptchaToken(token);
//   };

//   return (
//     <div className="flex min-h-screen">
//       <div className="w-1/2 p-8 flex flex-col relative">
//         <button
//           className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
//           onClick={() => (window.location.href = "/")}
//         >
//           <ArrowLeft className="w-6 h-6 text-gray-600" />
//         </button>
        
//         <div className="mt-16 max-w-md mx-auto w-full">
//           <h1 className="text-3xl font-bold mb-4">Login to Colorlib</h1>
//           <p className="text-gray-600 mb-8">
//             Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.
//           </p>

//           <form className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 placeholder="your-email@gmail.com"
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 placeholder="Your Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <label className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   id="rememberMe"
//                   className="rounded border-gray-300"
//                   checked={formData.rememberMe}
//                   onChange={handleInputChange}
//                 />
//                 <span className="text-sm text-gray-600">Remember me</span>
//               </label>
//               <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
//                 Forgot Password?
//               </a>
//             </div>

//             <div className="flex justify-center">
//               <ReCAPTCHA
//                 sitekey="6Lcd4sIqAAAAAOIgg_w2I3zl256ADBubFW8uBeBh"
//                 onChange={handleRecaptchaChange}
//               />
//             </div>

//             {error && (
//               <p className="text-red-600 text-sm text-center">{error}</p>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//               onClick={submitForm}
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging In..." : "Log In"}
//             </button>
//           </form>

//           <p className="mt-8 text-center text-sm text-gray-600">
//             Not yet registered?{" "}
//             <a href="/register" className="text-blue-600 hover:text-blue-800">
//               Sign Up Now
//             </a>
//           </p>
//         </div>
//       </div>
      
//       <div className="w-1/2 bg-gray-100">
//         <div className="h-full w-full relative">
//           <img
//             src="https://via.placeholder.com/400x600"
//             alt="Kitchen shelves with decorative items"
//             className="object-cover h-full w-full"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [captchaStatus, setCaptchaStatus] = useState(false);

  useEffect(() => {
    // Check URL parameters after CAS redirect
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userData = urlParams.get('user');
    
    if (token && userData) {
      try {
        // Store token and user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', decodeURIComponent(userData));
        
        // Clear URL parameters
        window.history.replaceState({}, document.title, '/login');
        
        // Redirect to dashboard
        navigate('/profile-page');
      } catch (error) {
        console.error('Error processing CAS login:', error);
        setError('Error processing login. Please try again.');
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!recaptchaToken || !captchaStatus) {
      setError("Please verify the reCAPTCHA");
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/login/api/auth", {
        email: formData.email,
        password: formData.password,
        recaptcha_token: recaptchaToken,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        if (formData.rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(user));
        }

        navigate("/profile-page");
      } else {
        setError("Error: Could not login!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecaptchaChange = (token) => {
    setCaptchaStatus(true);
    setRecaptchaToken(token);
  };

  const handleCASLogin = () => {
    // Redirect to IIIT CAS login page
    const casLoginUrl = "https://login.iiit.ac.in/cas/login";
    // Set callback URL to our backend endpoint
    const serviceUrl = encodeURIComponent("http://localhost:4000/login/api/auth/cas/callback");
    window.location.href = `${casLoginUrl}?service=${serviceUrl}`;
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 p-8 flex flex-col relative">
        <button
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => (window.location.href = "/")}
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="mt-16 max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-4">Login to BuySell</h1>
          <p className="text-gray-600 mb-8">
            Sign in using your IIIT credentials or continue with email.
          </p>

          {/* CAS Login Button */}
          <button
            onClick={handleCASLogin}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors mb-6"
          >
            Sign in with IIIT Account
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="your-email@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="rounded border-gray-300"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              {/* <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </a> */}
            </div>

            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey="6Lcd4sIqAAAAAOIgg_w2I3zl256ADBubFW8uBeBh"
                onChange={handleRecaptchaChange}
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              onClick={submitForm}
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Not yet registered?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-800">
              Sign Up Now
            </a>
          </p>
        </div>
      </div>
      
      <div className="w-1/2 bg-gray-100">
        <div className="h-full w-full relative">
          <img
            src="https://wallpaperaccess.com/full/8280604.jpg"
            alt="Buy Sell Website"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;