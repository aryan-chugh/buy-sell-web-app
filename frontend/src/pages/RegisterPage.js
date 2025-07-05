// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import "./Register.css";
// import axios from "axios";

// /* 
//     submission error must be displayed as a custom notification (fields must not be cleared)
// */
// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const [submitError, setSubmitError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);


//   const [page, setPage] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     password: "",
//     cpass: "",
//     phone: "",
//     dateOfBirth: "",
//     describe: "",
//   });

//   const [errors, setErrors] = useState({}); // Store field-specific errors

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Validation logic
//   const validate = () => {
//     const newErrors = {};
//     if (page === 0) {
//       if (!formData.fname) newErrors.fname = "First name is required.";
//       if (!formData.lname) newErrors.lname = "Last name is required.";
//       if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
//         newErrors.email = "Valid email is required.";

//     } else if (page === 1) {
//       if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
//       if (
//         !formData.phone || 
//         !/^(\+?\d{1,3}[\s-]?)?\d{10}$/.test(formData.phone)
//       ) {
//         newErrors.phone = "Phone number must be 10 digits long, with or without STD code.";
//       }
//       // if (!formData.describe) newErrors.describe = "Please describe yourself.";
//     } else if (page === 2) {
//       if (!formData.password || formData.password.length < 8)
//         newErrors.password = "Password must be at least 8 characters long.";
//       if (formData.password !== formData.cpass)
//         newErrors.cpass = "Passwords do not match.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateField = (name, value) => {
//     let error = "";
  
//     switch (name) {
//       case "fname":
//         if (!value) error = "First name is required.";
//         break;
//       case "lname":
//         if (!value) error = "Last name is required.";
//         break;
//       case "email":
//         if (!value || !/\S+@\S+\.\S+/.test(value))
//           error = "Valid email is required.";
//         break;
//       case "dob":
//         if (!value) error = "Date of Birth is required.";
//         break;
//       case "contact":
//         if (!value || !/^\+?\d{10,15}$/.test(value))
//           error = "Valid phone number is required.";
//         break;
//       case "passwd":
//         if (!value || value.length < 8)
//           error = "Password must be at least 8 characters long.";
//         break;
//       case "cpass":
//         if (!value)
//           error = "Confirmation password cannot be empty.";
//         break;
//       default:
//         break;
//     }
  
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//     return !error; // Return true if no error
//   };
  

//   const handleNext = () => {
//     if (validate()) setPage((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     setPage((prev) => prev - 1);
//   };

//   const handleSubmit = async () => {
//     // e.preventDefault();
//     if (validate()) {
//       // attach a loader here!
//       setIsLoading(true);
//       setSubmitError('');
      
//       axios
//       .post(`http://localhost:4000/register/api/add`, { 
//         first_name: formData.fname, 
//         last_name: formData.lname,
//         email: formData.email, 
//         dob: formData.dateOfBirth, 
//         describe: formData.describe, 
//         contact: formData.phone, 
//         password: formData.password }
//       )
//       .then((response) => {
//         if (response.status === 200) {
//           // const { token, user } = response.data;
//           alert("successfully registered!");
//           navigate("/login");
//         } else {
//           const data = response.data;
//           if(data.code === '2004') {
//               setSubmitError("User already exists!");
//           } else if(data.code === '2005') {
//               setSubmitError("Some server side error! Try again later!");
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error registering:", error);
//         setSubmitError('Please try again.');
//       });
//   }
// }

//   const handleBlur = (e, name) => {
//     const value = e.target.value;
//     // console.log(name, value);
//     validateField(name, value);
//   };
  

//   const formPages = [
//     <>
//       <div className="form-col">
//         <p>First Name</p>
//         <div className="form-floating mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="First name..."
//             value={formData.fname}
//             onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
//             onBlur={(e) => {handleBlur(e, 'fname')}}
//           />
//           <label>Enter here...</label>
//           {errors.fname && <span className="error">{errors.fname}</span>}
//         </div>

//         <p>Last Name</p>
//         <div className="form-floating mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Last name..."
//             value={formData.lname}
//             onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
//             onBlur={(e) => {handleBlur(e, 'lname')}}
//           />
//           <label>Enter here...</label>
//           {errors.lname && <span className="error">{errors.lname}</span>}
//         </div>

//         <p>Email Address</p>
//         <div className="form-floating mb-3">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="name@example.com"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             onBlur={(e) => {handleBlur(e, 'email')}}
//           />
//           <label>abc@example.com</label>
//           {errors.email && <span className="error">{errors.email}</span>}
//         </div>
//       </div>
//     </>,
//     <>
//       <div className="form-col">
//         <p>Date of Birth</p>
//         <div className="form-floating mb-3">
//           <input
//             type="date"
//             className="form-control"
//             placeholder="dd-mm-yyyy"
//             value={formData.dateOfBirth}
//             onChange={(e) =>
//               setFormData({ ...formData, dateOfBirth: e.target.value })
//             }
//             onBlur={(e) => {handleBlur(e, 'dob')}}
//           />
//           <label>DOB</label>
//           {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
//         </div>

//         <p>Contact Number</p>
//         <div className="form-floating mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="+YY XXXXXXXXXX"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             onBlur={(e) => {handleBlur(e, 'contact')}}
//           />
//           <label>+YY XXXXXXXXXX</label>
//           {errors.phone && <span className="error">{errors.phone}</span>}
//         </div>

//         <p>A word about yourself!</p>
//         <div className="form-floating mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="I am ...."
//             value={formData.describe}
//             onChange={(e) => setFormData({ ...formData, describe: e.target.value })}
//           />
//           <label>I am a/an ...</label>
//           {errors.describe && <span className="error">{errors.describe}</span>}
//         </div>
//       </div>
//     </>,
//     <>
//       <div className="form-col">
//         <p>Password</p>
//         <div className="form-floating mb-3 password-field">
//           <input
//             type={showPassword ? "text" : "password"}
//             className="form-control"
//             placeholder="Secret key"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//             onBlur={(e) => {handleBlur(e, 'passwd')}}
//           />
//           <label>Secret key</label>
//           <button
//             type="button"
//             className="password-toggle"
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? "👁️" : "👁️‍🗨️"}
//           </button>
//           {errors.password && <span className="error">{errors.password}</span>}
//         </div>

//         <p>Confirm Password</p>
//         <div className="form-floating mb-3 password-field">
//           <input
//             type={showPassword ? "text" : "password"}
//             className="form-control"
//             placeholder="Confirm password"
//             value={formData.cpass}
//             onChange={(e) =>
//               setFormData({ ...formData, cpass: e.target.value })
//             }
//             onBlur={(e) => {handleBlur(e, 'cpass')}}
//           />
//           <label>Confirm your password</label>
//           <button
//             type="button"
//             className="password-toggle"
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? "👁️" : "👁️‍🗨️"}
//           </button>
//           {errors.cpass && <span className="error">{errors.cpass}</span>}
//         </div>
//       </div>
//     </>,
//   ];

//   return (
//     <div className="container">
//       <div className="left-card">
//         <h1 className="brand">mellow.app</h1>

//         <div className="timeline">
//           {formPages.map((_, index) => (
//             <div
//               key={index}
//               className={`timeline-step ${page === index ? "active" : ""}`}
//             >
//               <span>{index + 1}</span>
//             </div>
//           ))}
//         </div>

//         <form className="form">
//           {formPages[page]}

//           <div className="form-navigation">
//             {page > 0 && (
//               <button type="button" className="nav-button" onClick={handlePrev}>
//                 &lt;
//               </button>
//             )}

//             {page < formPages.length - 1 ? (
//               <button type="button" className="nav-button" onClick={handleNext}>
//                 &gt;
//               </button>
//             ) : null}
//           </div>

//           {page === formPages.length - 1 ? (
//             <button type="button" className="submit-button" onClick={handleSubmit}>
//               Register Now!
//             </button>
//           ) : null}
//         </form>

//         <div className="login-encloser">
//           <a href="/login" className="login-link">
//             Already registered? Login instead!
//           </a>
//         </div>
//       </div>

//       <div className="right-card">
//         <img
//           src="https://via.placeholder.com/300"
//           alt="Right side content"
//           className="right-image"
//         />
//         <p className="right-text">You are in the right place</p>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;
import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpass: "",
    phone: "",
    dateOfBirth: "",
    describe: "",
  });

  const [errors, setErrors] = useState({});

  const pageValidations = useMemo(() => ({
    0: ['fname', 'lname', 'email'],
    1: ['dateOfBirth', 'phone'],
    2: ['password', 'cpass']
  }), []);

  const validateCurrentPage = useCallback(() => {
    const currentPageFields = pageValidations[page];
    const newErrors = {};

    currentPageFields.forEach(field => {
      const value = formData[field];
      switch(field) {
        case 'fname':
        case 'lname':
          if (!value) newErrors[field] = `${field === 'fname' ? 'First' : 'Last'} name is required.`;
          break;
        case 'email':
          if (!value || !/\S+@\S+\.\S+/.test(value)) 
            newErrors[field] = "Valid email is required.";
          break;
        case 'dateOfBirth':
          if (!value) newErrors[field] = "Date of Birth is required.";
          break;
        case 'phone':
          if (!value || !/^(\+?\d{1,3}[\s-]?)?\d{10}$/.test(value)) 
            newErrors[field] = "Valid 10-digit phone number is required.";
          break;
        case 'password':
          if (!value || value.length < 8) 
            newErrors[field] = "Password must be at least 8 characters.";
          break;
        case 'cpass':
          if (value !== formData.password) 
            newErrors[field] = "Passwords do not match.";
          break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [page, formData, pageValidations]);

  const validateField = useCallback((name, value) => {
    const validations = {
      fname: value ? "" : "First name is required.",
      lname: value ? "" : "Last name is required.",
      email: /\S+@\S+\.\S+/.test(value) ? "" : "Valid email is required.",
      dateOfBirth: value ? "" : "Date of Birth is required.",
      phone: /^(\+?\d{1,3}[\s-]?)?\d{10}$/.test(value) 
        ? "" 
        : "Phone number must be 10 digits long.",
      password: value && value.length >= 8 
        ? "" 
        : "Password must be at least 8 characters long.",
      cpass: formData.password === value 
        ? "" 
        : "Passwords do not match."
    };

    setErrors(prev => ({
      ...prev, 
      [name]: validations[name] || ""
    }));

    return !validations[name];
  }, [formData.password]);

  const handleNext = () => {
    if (validateCurrentPage()) {
      setPage(prev => Math.min(prev + 1, 2));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async () => {
    const requiredFields = ['fname', 'lname', 'email', 'dateOfBirth', 'phone', 'password', 'cpass'];
    const isValid = requiredFields.every(field => validateField(field, formData[field]));

    if (isValid) {
      setIsLoading(true);
      setSubmitError('');

      try {
        const response = await axios.post('http://localhost:4000/register/api/add', {
          first_name: formData.fname,
          last_name: formData.lname,
          email: formData.email,
          dob: formData.dateOfBirth,
          describe: formData.describe,
          contact: formData.phone,
          password: formData.password
        });

        if (response.status === 200) {
          alert("Successfully registered!");
          navigate("/login");
        } else {
          const errorCodes = {
            '2004': "User already exists!",
            '2005': "Server error. Please try again later."
          };
          setSubmitError(errorCodes[response.data.code] || 'Registration failed');
        }
      } catch (error) {
        console.error("Registration error:", error);
        setSubmitError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const FormSteps = [
    // Personal Details Step
    {
      fields: [
        { 
          label: "First Name", 
          name: "fname", 
          type: "text", 
          placeholder: "Enter first name" 
        },
        { 
          label: "Last Name", 
          name: "lname", 
          type: "text", 
          placeholder: "Enter last name" 
        },
        { 
          label: "Email Address", 
          name: "email", 
          type: "email", 
          placeholder: "abc@example.com" 
        }
      ]
    },
    // Additional Details Step
    {
      fields: [
        { 
          label: "Date of Birth", 
          name: "dateOfBirth", 
          type: "date" 
        },
        { 
          label: "Contact Number", 
          name: "phone", 
          type: "text", 
          placeholder: "+YY XXXXXXXXXX" 
        },
        { 
          label: "About Yourself", 
          name: "describe", 
          type: "text", 
          placeholder: "I am a/an ..." 
        }
      ]
    },
    // Password Step
    {
      fields: [
        { 
          label: "Password", 
          name: "password", 
          type: showPassword ? "text" : "password" 
        },
        { 
          label: "Confirm Password", 
          name: "cpass", 
          type: showPassword ? "text" : "password" 
        }
      ]
    }
  ];

  return (
    <div className="register-container">
      <div className="left-panel">
        <h1 className="brand">Buy Sell App</h1>
        
        <div className="progress-indicator">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index} 
              className={`progress-step ${page === index ? 'active' : ''}`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <form className="registration-form">
          <div className="form-content">
            {FormSteps[page].fields.map(field => (
              <div key={field.name} className="form-group">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={errors[field.name] ? 'input-error' : ''}
                />
                {errors[field.name] && (
                  <span className="error-text">{errors[field.name]}</span>
                )}
              </div>
            ))}
          </div>

          {/* <div className="form-navigation">
            {page > 0 && (
              <button 
                type="button" 
                className="nav-btn prev-btn" 
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </button>
            )}

            {page < FormSteps.length - 1 ? (
              <button 
                type="button" 
                className="nav-btn next-btn" 
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </button>
            ) : (
              <button 
                type="button" 
                className="submit-btn" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            )}
          </div> */}

<div className="form-navigation-extended">
            {page > 0 && (
              <button 
                type="button" 
                className="nav-btn prev-btn" 
                onClick={() => setPage(p => p - 1)}
              >
                ← Previous
              </button>
            )}

            {page < 2 ? (
              <button 
                type="button" 
                className="nav-btn next-btn" 
                onClick={handleNext}
              >
                Next →
              </button>
            ) : (
              <button 
                type="button" 
                className="submit-btn" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Now'}
              </button>
            )}
          </div>
        </form>

        {submitError && (
          <div className="error-banner">{submitError}</div>
        )}

        <div className="login-link-container">
          <a href="/login">Already registered? Login</a>
        </div>
      </div>

      <div className="right-panel">
        <img 
          src="https://th.bing.com/th/id/R.fae92c358ab213fcbd06ef47ca7cd32d?rik=msZu5k5qMz%2bvNw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1842481.jpg&ehk=kDSdol8xy1fU7YxBn%2fhgqiI2I5YD8akKHmycO9d%2bL9w%3d&risl=&pid=ImgRaw&r=0" 
          alt="Registration visual" 
          className="signup-image" 
        />
        <p>Start your journey with BuySell@IIIT</p>
      </div>
    </div>
  );
};

export default RegisterPage;