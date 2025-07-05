// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './Orders.css';

// // const OrdersDashboardSeller = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [selectedStatus, setSelectedStatus] = useState('pending'); // Default to 'In Progress'

// //   useEffect(() => {
// //     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// //     const user = localStorage.getItem('user') || sessionStorage.getItem('user')

// //     // console.log("hello");
// //     // console.log(user);
// //     // console.log(token);
// //     if (!token) {
// //         // navigate('/login');
// //         return;
// //     }
    
// //     axios.get('http://localhost:4000/orders/api/get_sold', { 
// //         headers: { Authorization: `${token}`, User_Data: JSON.stringify(user)},
// //     })
// //       .then(response => setOrders(response.data))
// //       .catch(error => console.error(error));
// //   }, []);

  
// //   const handleCloseTransaction = (orderId, otp) => {
// //     axios.post(`/orders/${orderId}/close`, { otp })
// //       .then(response => {
// //         alert(response.data);
// //         setOrders(orders.filter(order => order._id !== orderId));
// //       })
// //       .catch(error => alert(error.response.data));
// //   };


// //   const handleTabClick = (status) => {
// //     setSelectedStatus(status);
// //   };

// //   // Calculate counts for each status
// //   const statusCounts = {
// //     'pending': orders.filter(order => order.status === 'pending').length,
// //     'completed': orders.filter(order => order.status === 'completed').length,
// //     'cancelled': orders.filter(order => order.status === 'cancelled').length,
// //   };

// //   const filteredOrders = orders.filter(order => order.status === selectedStatus);

// //   return (
// //     <div className="orders-dashboard">
// //       <h1 className="dashboard-title">Orders</h1>
// //       <div className="order-status-tabs">
// //         <button
// //           className={`status-tab ${selectedStatus === 'pending' ? 'active' : ''}`}
// //           onClick={() => handleTabClick('pending')}
// //         >
// //           Pending ({statusCounts['pending']})
// //         </button>
// //         <button
// //           className={`status-tab ${selectedStatus === 'completed' ? 'active' : ''}`}
// //           onClick={() => handleTabClick('completed')}
// //         >
// //           Completed ({statusCounts['completed']})
// //         </button>
// //         <button
// //           className={`status-tab ${selectedStatus === 'cancelled' ? 'active' : ''}`}
// //           onClick={() => handleTabClick('cancelled')}
// //         >
// //           Cancelled ({statusCounts['cancelled']})
// //         </button>
// //       </div>
// //       {filteredOrders.length === 0 ? (
// //           <p>No orders found</p>
// //         ) : (
// //       <div className="orders-list">
// //         {filteredOrders.map(order => (
// //           <div key={order._id} className="order-item">
// //             <div className="order-header">
// //               <h2 className="order-title">#{order._id}</h2>
// //               <span className="status-badge">{order.status}</span>
// //             </div>
// //             <div className="order-details">
// //               <p><span className="order-label">Seller Id:</span> {order.sellerID}</p>
// //               <p><span className="order-label">Buyer Id:</span> {order.buyerID}</p>
// //               <p><span className="order-label">Amount: </span> {order.amount}</p>
// //             </div>
// //             {order.status === 'Pending' && (
// //             <button 
// //                 className="close-order-button" 
// //                 onClick={() => {
// //                   const otp = prompt(`Enter OTP to close order #${order._id}`);
// //                   if (otp) {
// //                     handleCloseTransaction(order._id, otp);
// //                   }
// //                 }}
// //               >
// //                 Close
// //               </button>)}
// //           </div>

// //         ))}
// //       </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default OrdersDashboardSeller;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// const OrdersDashboardSeller = () => {
//   const [soldOrders, setSoldOrders] = useState([]);
//   const [otpInput, setOtpInput] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

//     if (!token || !user) {
//       setLoading(false);
//       setError('No authentication token or user data found.');
//       return;
//     }

//     const fetchSoldOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/orders/api/get_sold', {
//           headers: { Authorization: `${token}`, User_Data: JSON.stringify(user) },
//         });

//         setSoldOrders(response.data || []);
//       } catch (err) {
//         console.error('Error fetching sold orders:', err);
//         setError('Failed to fetch sold orders. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSoldOrders();
//   }, []);

//   const handleOtpChange = (orderId, value) => {
//     setOtpInput((prev) => ({ ...prev, [orderId]: value }));
//   };

//   const handleCloseTransaction = async (orderId) => {
//     const enteredOtp = otpInput[orderId];
//     const storedOtp = localStorage.getItem(`order:${orderId}`);

//     if (enteredOtp !== storedOtp) {
//       alert('Entered OTP is not correct. Please try again.');
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:4000/orders/api/close/${orderId}`);
//       setSoldOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//       alert('Transaction closed successfully!');
//     } catch (error) {
//       console.error('Error closing transaction:', error);
//       alert('Failed to close transaction. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger text-center" role="alert">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-4 py-3">
//       <div className="card shadow-lg">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Orders Dashboard - Seller</h2>
//         </div>
//         <div className="card-body">
//           {soldOrders.length === 0 ? (
//             <div className="alert alert-info text-center" role="alert">
//               No pending orders found.
//             </div>
//           ) : (
//             <div className="orders-list">
//               {soldOrders.map((order) => (
//                 <div key={order._id} className="card mb-3 shadow-sm">
//                   <div className="card-body">
//                     <h5 className="card-title">Order #{order._id}</h5>
//                     <p className="mb-1">
//                       <strong>Item:</strong> {order.itemName}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Price:</strong> ${Number(order.price).toFixed(2)}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Buyer:</strong> {order.buyerName}
//                     </p>
//                     <div className="d-flex align-items-center">
//                       <input
//                         type="text"
//                         className="form-control me-2"
//                         placeholder="Enter OTP"
//                         value={otpInput[order._id] || ''}
//                         onChange={(e) => handleOtpChange(order._id, e.target.value)}
//                       />
//                       <button
//                         className="btn btn-success"
//                         onClick={() => handleCloseTransaction(order._id)}
//                       >
//                         Close Transaction
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersDashboardSeller;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import TitleBar from '../components/TitleBar';
import { useNavigate } from 'react-router-dom';

const OrdersDashboardSeller = () => {
  const navigate = useNavigate();
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [otpInput, setOtpInput] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

    if(!token || !user1) {
      navigate("/login");
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(user1);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return;
    }

    if (!token || !user1) {
      setLoading(false);
      setError('No authentication token or user data found.');
      return;
    }

    const fetchSellerOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/orders/api/get_seller_orders', {
          headers: { 
            Authorization: `${token}`, 
            User_Data: JSON.stringify(parsedUser) 
          },
        });

        setSellerOrders(response.data || []);
      } catch (err) {
        console.error('Error fetching seller orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, []);

  const handleCloseTransaction = (orderId) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

    let parsedUser;
    try {
      parsedUser = JSON.parse(user1);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return;
    }

    const otp = otpInput[orderId];

    if (!otp) {
      alert('Please enter the OTP.');
      return;
    }

    axios
      .post(`http://localhost:4000/orders/api/close/${orderId}`, 
        { otp }, 
        {
          headers: { 
            'Authorization': `${token}`, 
            'User_Data': JSON.stringify(parsedUser) 
          },
        }
      )
      .then(() => {
        // Remove the order from the list
        setSellerOrders(prevOrders => 
          prevOrders.filter(order => order._id !== orderId)
        );
        // Clear the OTP input
        setOtpInput(prev => ({...prev, [orderId]: ''}));
        alert('Transaction closed successfully!');
      })
      .catch((error) => {
        console.error('Error closing order:', error);
        alert(error.response?.data?.error || 'Failed to close order. Please try again.');
      });
  };

  const statusCounts = {
    pending: sellerOrders.filter(order => order.status === 'pending').length,
    completed: sellerOrders.filter(order => order.status === 'completed').length,
  };

  const filteredOrders = (() => {
    switch (selectedStatus) {
      case 'pending':
        return sellerOrders.filter(order => order.status === 'pending');
      case 'completed':
        return sellerOrders.filter(order => order.status === 'completed');
      default:
        return [];
    }
  })();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Sidebar />
      <TitleBar title="Deliveries" />
      {/* <ChatBot /> */}
    <div className="container absolute left-16 mt-24 ml-24">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Orders to Deliver</h2>
          <div className="text-end">
            <small>Total Orders: {sellerOrders.length}</small>
          </div>
        </div>
        <div className="card-body">
          <div className="order-status-tabs nav nav-tabs mb-3">
            {['pending'].map((status) => (
              <button
                key={status}
                className={`nav-link ${selectedStatus === status ? 'active' : ''}`}
                onClick={() => setSelectedStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="badge bg-light text-dark ms-2">{statusCounts[status]}</span>
              </button>
            ))}
          </div>

          <div className="orders-list" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            {filteredOrders.length === 0 ? (
              <div className="alert alert-info text-center" role="alert">
                No {selectedStatus} orders found
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order._id} className="card mb-3 shadow-sm">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Order #{order._id}</h5>
                    <span
                      className={`badge bg-${
                        order.status === 'pending' ? 'warning' : 'success'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <p className="mb-1">
                      <strong>Buyer:</strong> {order.buyerID.name || 'Unknown Buyer'}
                    </p>
                    {order.sellers.map((sellerOrder, index) => (
                      <div key={index}>
                        {sellerOrder.items.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <p className="mb-1">
                              <strong>Item:</strong> {item.itemID.name}
                              <span className="ms-2">
                                <strong>Quantity:</strong> {item.quantity}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                    <p className="mb-1">
                      <strong>Total Amount:</strong> ${Number(order.amount).toFixed(2)}
                    </p>
                    {order.status === 'pending' && (
                      <div className="mt-3">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            value={otpInput[order._id] || ''}
                            onChange={(e) => 
                              setOtpInput(prev => ({
                                ...prev, 
                                [order._id]: e.target.value
                              }))
                            }
                          />
                          <button
                            className="btn btn-success"
                            onClick={() => handleCloseTransaction(order._id)}
                          >
                            Close Transaction
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default OrdersDashboardSeller;