// import React, { useState, useEffect } from 'react';
// import { Bell, User, LogIn, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const TitleBar = () => {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [notifications] = useState(3);

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!(user && token));
//   }, []);


//   const handleProfileClick = () => {
//     navigate('/profile-page');
//   };

//   const handleAuthAction = () => {
//     if (isAuthenticated) {
//       // Logout logic
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//       setIsAuthenticated(false);
//       navigate('/login');
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     // <div className="fixed top-4 left-[8%] right-0 h-16 bg-white shadow-sm rounded-lg flex items-center justify-between px-6 z-40">
//     <div className="absolute top-4 left-[7%] right-0 h-16 bg-white shadow-sm rounded-lg flex items-center justify-between px-6 z-40">
//       <h2 className="text-2xl font-semibold text-slate-800">
//         Buy Sell Platform
//       </h2>
//       <div className="flex items-center space-x-4">
//         {isAuthenticated && (
//           <button 
//             onClick={handleProfileClick}
//             className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors"
//           >
//             <User strokeWidth={1.5} size={22} />
//           </button>
//         )}
//         <button 
//           onClick={handleAuthAction}
//           className={`p-2 rounded-full transition-colors ${
//             isAuthenticated 
//               ? 'bg-red-50 text-red-600 hover:bg-red-100' 
//               : 'bg-green-50 text-green-600 hover:bg-green-100'
//           }`}
//         >
//           {isAuthenticated ? <LogOut strokeWidth={1.5} size={22} /> : <LogIn strokeWidth={1.5} size={22} />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TitleBar;
import React, { useState, useEffect } from 'react';
import { Bell, User, LogIn, LogOut, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TitleBar = ({ title = "Buy Sell Platform" }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications] = useState(3);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!(user && token));
  }, []);

  const handleProfileClick = () => {
    navigate('/profile-page');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // Logout logic
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="absolute top-4 left-[6%] right-0 h-16 bg-white shadow-sm rounded-lg flex items-center justify-between px-6 z-40">
      <div className="flex items-center space-x-4">
        
        <button 
          onClick={handleHomeClick}
          className="bg-slate-100 p-2 mr-6 rounded-full hover:bg-slate-200 transition-colors"
          aria-label="Home"
        >
          <Home strokeWidth={1.5} size={22} />
        </button>
        <h2 className="text-3xl font-semibold text-slate-800">
          {title}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <button 
            onClick={handleProfileClick}
            className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Profile"
          >
            <User strokeWidth={1.5} size={22} />
          </button>
        )}
        <button 
          onClick={handleAuthAction}
          className={`p-2 rounded-full transition-colors ${
            isAuthenticated 
              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
              : 'bg-green-50 text-green-600 hover:bg-green-100'
          }`}
          aria-label={isAuthenticated ? "Logout" : "Login"}
        >
          {isAuthenticated ? <LogOut strokeWidth={1.5} size={22} /> : <LogIn strokeWidth={1.5} size={22} />}
        </button>
      </div>
    </div>
  );
};

export default TitleBar;