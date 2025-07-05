// import React from 'react';
// import { 
//   Search, 
//   Package, 
//   Truck, 
//   User, 
//   LogOut 
// } from 'lucide-react';

// const Sidebar = () => {
//   const tabs = [
//     { icon: <Search strokeWidth={1.5} />, label: 'Search', link: '/search' },
//     { icon: <Package strokeWidth={1.5} />, label: 'Orders', link: '/orders' },
//     { icon: <Truck strokeWidth={1.5} />, label: 'Deliveries', link: '/deliveries' },
//     { icon: <User strokeWidth={1.5} />, label: 'Profile', link: '/profile' }
//   ];

//   return (
//     <div className="fixed top-0 left-0 h-full w-16 bg-slate-900 flex flex-col justify-between py-4 shadow-lg z-50">
//       <div className="flex flex-col space-y-4 w-full items-center">
//         {tabs.map((tab, index) => (
//           <a 
//             key={index} 
//             href={tab.link} 
//             className="group relative flex justify-center items-center py-3 hover:bg-slate-700 transition-colors duration-200"
//             title={tab.label}
//           >
//             <div className="text-slate-300 px-3 group-hover:text-white transition-colors duration-200">
//               {tab.icon}
//             </div>
//           </a>
//         ))}
//       </div>
//       <div className="flex justify-center w-full">
//         <a 
//           href="/logout" 
//           className="text-slate-300 px-3 hover:text-white transition-colors duration-200"
//           title="Logout"
//         >
//           <LogOut strokeWidth={1.5} />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  User, 
  LogOut,
  PlusSquare,
  ShoppingCart
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage authentication
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };

  const tabs = [
    { icon: <Search strokeWidth={1.5} />, label: 'Search', link: '/search' },
    { icon: <PlusSquare strokeWidth={1.5} />, label: 'List Item', link: '/sell' },
    { icon: <Package strokeWidth={1.5} />, label: 'Seller Orders', link: '/orders/seller' },
    { icon: <Truck strokeWidth={1.5} />, label: 'Buyer Orders', link: '/orders/buyer' },
    { icon: <ShoppingCart strokeWidth={1.5} />, label: 'Cart', link: '/cart' },
    { icon: <User strokeWidth={1.5} />, label: 'Profile', link: '/profile-page' },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-slate-900 flex flex-col justify-between py-4 shadow-lg z-50">
      <div className="flex flex-col space-y-4 w-full items-center">
        {tabs.map((tab, index) => (
          <Link 
            key={index} 
            to={tab.link} 
            className="group relative flex justify-center items-center py-3 hover:bg-slate-700 transition-colors duration-200"
            title={tab.label}
          >
            <div className="text-slate-300 px-3 group-hover:text-white transition-colors duration-200">
              {tab.icon}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center w-full">
        <button 
          onClick={handleLogout}
          disabled = {!localStorage.getItem('token')}
          className="text-slate-300 px-3 hover:text-white transition-colors duration-200"
          title="Logout"
        >
          <LogOut strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;