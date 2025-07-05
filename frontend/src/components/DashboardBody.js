// // import React from 'react';
// // import './DashboardBody.css';

// // import React from 'react';

// // const BodyDashboard = () => {
// //   return (
// //     <div className="absolute top-[21%] right-0 w-[92%] h-[79%] bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8 shadow-md">
// //       <p className="text-4xl font-semibold text-center text-slate-800 mb-8 max-w-2xl leading-tight tracking-tight">
// //         A Comprehensive Platform for Streamlined Buy Sell Transactions
// //       </p>
// //       <button className="px-10 py-4 bg-indigo-600 text-white text-xl font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
// //         Explore Platform
// //       </button>
// //     </div>
// //   );
// // };

// // export default BodyDashboard;

// // import React from 'react';
// // import { ChevronRight } from 'lucide-react';

// // const BodyDashboard = () => {
// //   return (
// //     <div className="p-8">
// //       <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
// //         <h1 className="text-3xl font-bold text-slate-800 mb-6">
// //           Welcome to Your Buy Sell Platform
// //         </h1>
// //         <div className="grid grid-cols-3 gap-6">
// //           <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
// //             <h3 className="text-lg font-semibold mb-2">Quick Search</h3>
// //             <p className="text-slate-600 mb-4">Find items quickly and easily</p>
// //             <button className="flex items-center text-indigo-600 hover:text-indigo-700">
// //               Start Search <ChevronRight size={18} className="ml-2" />
// //             </button>
// //           </div>
// //           <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
// //             <h3 className="text-lg font-semibold mb-2">Active Orders</h3>
// //             <p className="text-slate-600 mb-4">Track and manage your orders</p>
// //             <button className="flex items-center text-indigo-600 hover:text-indigo-700">
// //               View Orders <ChevronRight size={18} className="ml-2" />
// //             </button>
// //           </div>
// //           <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
// //             <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
// //             <p className="text-slate-600 mb-4">Stay updated with your transactions</p>
// //             <button className="flex items-center text-indigo-600 hover:text-indigo-700">
// //               View Activity <ChevronRight size={18} className="ml-2" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BodyDashboard;

// import React from 'react';
// import { ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const BodyDashboard = () => {
//   const navigate = useNavigate();

//   const handleQuickSearch = () => {
//     navigate('/search');
//   };

//   const handleActiveOrders = () => {
//     navigate('/orders');
//   };

//   const handleRecentActivity = () => {
//     navigate('/activity');
//   };

//   return (
//     <div className="p-8">
//       <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-slate-800 mb-6">
//           Welcome to Your Buy Sell Platform
//         </h1>
//         <div className="grid grid-cols-3 gap-6">
//           <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
//             <h3 className="text-lg font-semibold mb-2">Quick Search</h3>
//             <p className="text-slate-600 mb-4">Find items quickly and easily</p>
//             <button 
//               onClick={handleQuickSearch} 
//               className="flex items-center text-indigo-600 hover:text-indigo-700"
//             >
//               Start Search <ChevronRight size={18} className="ml-2" />
//             </button>
//           </div>
//           <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
//             <h3 className="text-lg font-semibold mb-2">Active Orders</h3>
//             <p className="text-slate-600 mb-4">Track and manage your orders</p>
//             <button 
//               onClick={handleActiveOrders}
//               className="flex items-center text-indigo-600 hover:text-indigo-700"
//             >
//               View Orders <ChevronRight size={18} className="ml-2" />
//             </button>
//           </div>
//           <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
//             <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
//             <p className="text-slate-600 mb-4">Stay updated with your transactions</p>
//             <button 
//               onClick={handleRecentActivity}
//               className="flex items-center text-indigo-600 hover:text-indigo-700"
//             >
//               View Activity <ChevronRight size={18} className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BodyDashboard;
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BodyDashboard = () => {
  const navigate = useNavigate();

  const handleQuickSearch = () => {
    navigate('/search');
  };

  const handleActiveOrders = () => {
    navigate('/orders/seller');
  };

  const handleRecentActivity = () => {
    navigate('/orders/buyer');
  };

  return (
    <div className="p-12">
      <div className="bg-white shadow-md rounded-lg p-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Welcome to Your Buy Sell Platform
        </h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-slate-50 p-5 rounded-lg hover:bg-slate-100 transition-colors">
            <h3 className="text-lg font-semibold mb-3">Quick Search</h3>
            <p className="text-slate-600 mb-4">Find items quickly and easily</p>
            <button 
              onClick={handleQuickSearch} 
              className="flex items-center text-indigo-600 hover:text-indigo-700"
            >
              Start Search <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
          <div className="bg-slate-50 p-5 rounded-lg hover:bg-slate-100 transition-colors">
            <h3 className="text-lg font-semibold mb-3">Active Orders</h3>
            <p className="text-slate-600 mb-4">Track and manage your orders</p>
            <button 
              onClick={handleActiveOrders}
              className="flex items-center text-indigo-600 hover:text-indigo-700"
            >
              View Orders <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
          <div className="bg-slate-50 p-5 rounded-lg hover:bg-slate-100 transition-colors">
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            <p className="text-slate-600 mb-4">Stay updated with your transactions</p>
            <button 
              onClick={handleRecentActivity}
              className="flex items-center text-indigo-600 hover:text-indigo-700"
            >
              View Activity <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyDashboard;