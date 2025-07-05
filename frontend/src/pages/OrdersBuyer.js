// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrdersDashboardBuyer = () => {
//   const [boughtOrders, setBoughtOrders] = useState([]);
//   const [soldOrders, setSoldOrders] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState('pending');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//     let parsedUser;
//     try {
//       parsedUser = JSON.parse(user1);
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//       return;
//     }

//     if (!token || !user1) {
//       setLoading(false);
//       setError('No authentication token or user data found.');
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const [boughtResponse, soldResponse] = await Promise.all([
//           axios.get('http://localhost:4000/orders/api/get_bought', {
//             headers: { Authorization: `${token}`, User_Data: JSON.stringify(parsedUser) },
//           }),
//           axios.get('http://localhost:4000/orders/api/get_sold', {
//             headers: { Authorization: `${token}`, User_Data: JSON.stringify(parsedUser) },
//           }),
//         ]);

//         setBoughtOrders(boughtResponse.data || []);
//         setSoldOrders(soldResponse.data || []);
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//         setError('Failed to fetch orders. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);


//   const handleCancelOrder = (orderId) => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//     let parsedUser;
//     try {
//       parsedUser = JSON.parse(user1);
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//       return;
//     }

//     if (!token || !user1) {
//       setLoading(false);
//       setError('No authentication token or user data found.');
//       return;
//     }

//     axios
//       .post(`http://localhost:4000/orders/api/cancel/${orderId}`, null, {
//         headers: { 'Authorization': `${token}`, User_Data: JSON.stringify(parsedUser) },
//       })
//       .then(() => {
//         setBoughtOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, status: 'cancelled' } : order
//           )
//         );
//         localStorage.removeItem(`order:${orderId}`);
//       })
//       .catch((error) => {
//         console.error('Error cancelling order:', error);
//         alert('Failed to cancel order. Please try again.');
//       });
//   };
  


//   const pendingOrders = boughtOrders.filter((order) => order.status === 'pending');
//   const completedOrders = boughtOrders.filter((order) => order.status === 'completed');
//   const statusCounts = {
//     pending: pendingOrders.length,
//     completed: completedOrders.length,
//     sold: soldOrders.length,
//   };

//   const filteredOrders = (() => {
//     switch (selectedStatus) {
//       case 'pending':
//         return boughtOrders.filter(order => order.status === 'pending');
//       case 'completed':
//         return boughtOrders.filter(order => ['completed', 'cancelled'].includes(order.status));
//       case 'sold':
//         return soldOrders.filter(order => ['completed', 'cancelled'].includes(order.status));
//       default:
//         return [];
//     }
//   })();

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
//     <div className="container-fluid px-4 py-3"  style={{ maxHeight: '100vh', overflowY: 'auto' }}>
//       <div className="card shadow-lg">
//         <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//           <h2 className="mb-0">My Orders</h2>
//           <div className="text-end">
//             <small>Total Orders: {boughtOrders.length + soldOrders.length}</small>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="order-status-tabs nav nav-tabs mb-3">
//             {['pending', 'completed', 'sold'].map((status) => (
//               <button
//                 key={status}
//                 className={`nav-link ${selectedStatus === status ? 'active' : ''}`}
//                 onClick={() => setSelectedStatus(status)}
//               >
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//                 <span className="badge bg-light text-dark ms-2">{statusCounts[status]}</span>
//               </button>
//             ))}
//           </div>

//           <div className="orders-list" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
//             {filteredOrders.length === 0 ? (
//               <div className="alert alert-info text-center" role="alert">
//                 No {selectedStatus} orders found
//               </div>
//             ) : (
//               filteredOrders.map((order) => (
//                 order.sellers.map((seller) => (
//                   // <div key={`${order._id}-${seller.sellerID}`} className="card mb-3 shadow-sm">
//                   <div className="card mb-3 shadow-sm">
//                     <div className="card-header d-flex justify-content-between align-items-center">
//                       <h5 className="mb-0">Order #{order._id}</h5>
//                       <span
//                         className={`badge
//                           bg-${order.status === 'pending'
//                             ? 'warning'
//                             : order.status === 'completed'
//                             ? 'success'
//                             : 'info'
//                           }`}
//                       >
//                         {order.status}
//                       </span>
//                     </div>
//                     <div className="card-body">
//                       <p className="mb-1">
//                         {console.log(seller)}
//                         <strong>Seller:</strong> {seller.sellerID.first_name && seller.sellerID.last_name ? seller.sellerID.first_name + " " + seller.sellerID.last_name : 'Unknown Seller'}
//                       </p>
//                       <p className="mb-1">
//                         <strong>Items:</strong> {seller.items.map(item => `${item.itemID.name} (x${item.quantity})`).join(', ')}
//                       </p>
//                       <p className="mb-1">
//                         <strong>Amount:</strong> ${Number(order.amount).toFixed(2)}
//                       </p>
//                       <p className="mb-1">
//                         <strong>OTP:</strong> {localStorage.getItem(`order:${order._id}`) || 'N/A'}
//                       </p>
//                       {order.status === 'pending' && selectedStatus !== 'sold' && (
//                         <button
//                           className="btn btn-danger mt-2"
//                           onClick={() => handleCancelOrder(order._id)}
//                         >
//                           Cancel Order
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersDashboardBuyer;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrdersDashboardBuyer = () => {
//   const [boughtOrders, setBoughtOrders] = useState([]);
//   const [soldOrders, setSoldOrders] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState('pending');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Review state
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [currentReviewOrder, setCurrentReviewOrder] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [reviewComment, setReviewComment] = useState('');
//   const [currentReviewItem, setCurrentReviewItem] = useState(null);
//   const [currentReviewSeller, setCurrentReviewSeller] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//     let parsedUser;
//     try {
//       parsedUser = JSON.parse(user1);
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//       return;
//     }

//     if (!token || !user1) {
//       setLoading(false);
//       setError('No authentication token or user data found.');
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const [boughtResponse, soldResponse] = await Promise.all([
//           axios.get('http://localhost:4000/orders/api/get_bought', {
//             headers: { Authorization: `${token}`, User_Data: JSON.stringify(parsedUser) },
//           }),
//           axios.get('http://localhost:4000/orders/api/get_sold', {
//             headers: { Authorization: `${token}`, User_Data: JSON.stringify(parsedUser) },
//           }),
//         ]);

//         setBoughtOrders(boughtResponse.data || []);
//         setSoldOrders(soldResponse.data || []);
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//         setError('Failed to fetch orders. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleCancelOrder = (orderId) => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//     let parsedUser;
//     try {
//       parsedUser = JSON.parse(user1);
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//       return;
//     }

//     if (!token || !user1) {
//       setLoading(false);
//       setError('No authentication token or user data found.');
//       return;
//     }

//     axios
//       .post(`http://localhost:4000/orders/api/cancel/${orderId}`, null, {
//         headers: { 'Authorization': `${token}`, User_Data: JSON.stringify(parsedUser) },
//       })
//       .then(() => {
//         setBoughtOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, status: 'cancelled' } : order
//           )
//         );
//         localStorage.removeItem(`order:${orderId}`);
//       })
//       .catch((error) => {
//         console.error('Error cancelling order:', error);
//         alert('Failed to cancel order. Please try again.');
//       });
//   };

//   const openReviewModal = (order, seller, item) => {
//     setCurrentReviewOrder(order);
//     setCurrentReviewSeller(seller);
//     setCurrentReviewItem(item);
//     // setCurrentReviewOrder(order);
//     setIsReviewModalOpen(true);
//     setRating(0);
//     setReviewComment('');
//   };

//   const submitReview = () => {
//     if (!currentReviewOrder || !currentReviewItem || !currentReviewSeller ) return;

//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//     let parsedUser;
//     try {
//       parsedUser = JSON.parse(user1);
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//       return;
//     }

//     axios.post('http://localhost:4000/reviews/create', {
//       orderId: currentReviewOrder._id,
//       itemId: currentReviewItem.itemID._id,
//       sellerId: currentReviewSeller.sellerID._id,
//       rating,
//       comment: reviewComment
//     }, {
//       headers: { 
//         'Authorization': `${token}`, 
//         'User_Data': JSON.stringify(parsedUser) 
//       }
//     })
//     .then(() => {
//       // Update order to mark as reviewed
//       // setBoughtOrders(prevOrders => 
//       //   prevOrders.map(order => 
//       //     order._id === currentReviewOrder._id 
//       //       ? {...order, reviewed: true} 
//       //       : order
//       //   )
//       // );
//       // setIsReviewModalOpen(false);
//       // alert('Review submitted successfully!');

//       setBoughtOrders(prevOrders => 
//         prevOrders.map(order => {
//           if (order._id === currentReviewOrder._id) {
//             // Update the reviewed status for the specific item
//             const updatedSellers = order.sellers.map(seller => {
//               if (seller.sellerID._id === currentReviewSeller.sellerID._id) {
//                 const updatedItems = seller.items.map(item => {
//                   if (item.itemID._id === currentReviewItem.itemID._id) {
//                     return { ...item, reviewed: true };
//                   }
//                   return item;
//                 });
//                 return { ...seller, items: updatedItems };
//               }
//               return seller;
//             });
//             return { ...order, sellers: updatedSellers };
//           }
//           return order;
//         })
//       );
//       setIsReviewModalOpen(false);
//       alert('Review submitted successfully!');
//     })
//     .catch((error) => {
//       console.error('Error submitting review:', error);
//       alert('Failed to submit review. Please try again.');
//     });
//   };

//   // Improved status counting
//   const statusCounts = {
//     pending: boughtOrders.filter(order => 
//       order.status === 'pending'
//     ).length,
//     completed: boughtOrders.filter(order => 
//       ['completed', 'cancelled'].includes(order.status) && 
//       (!order.reviewed || order.reviewed === false)
//     ).length,
//     sold: soldOrders.filter(order => 
//       ['completed', 'cancelled'].includes(order.status)
//     ).length
//   };

//   const filteredOrders = (() => {
//     switch (selectedStatus) {
//       case 'pending':
//         return boughtOrders.filter(order => order.status === 'pending');
//       case 'completed':
//         return boughtOrders.filter(order => 
//           ['completed', 'cancelled'].includes(order.status) && 
//           (!order.reviewed || order.reviewed === false)
//         );
//       case 'sold':
//         return soldOrders.filter(order => ['completed', 'cancelled'].includes(order.status));
//       default:
//         return [];
//     }
//   })();

//   // Star Rating Component
//   const StarRating = ({ rating, setRating }) => {
//     return (
//       <div className="d-flex mb-3">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span 
//             key={star}
//             onClick={() => setRating(star)}
//             className="star-rating"
//             style={{
//               color: star <= rating ? 'gold' : 'gray',
//               cursor: 'pointer',
//               fontSize: '1.5rem',
//               marginRight: '5px'
//             }}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//     );
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
//     <div className="container-fluid px-4 py-3" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
//       {/* Review Modal */}
//       <div 
//         className={`modal fade ${isReviewModalOpen ? 'show d-block' : ''}`} 
//         tabIndex="-1" 
//         style={{ 
//           backgroundColor: isReviewModalOpen ? 'rgba(0,0,0,0.5)' : 'transparent',
//           display: isReviewModalOpen ? 'block' : 'none'
//         }}
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Leave a Review</h5>
//               <button 
//                 type="button" 
//                 className="btn-close" 
//                 onClick={() => setIsReviewModalOpen(false)}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <h4 className="mb-3">Rate Your Experience</h4>
//               <StarRating rating={rating} setRating={setRating} />
              
//               <div className="form-group">
//                 <textarea 
//                   className="form-control" 
//                   placeholder="Write your review here..."
//                   value={reviewComment}
//                   onChange={(e) => setReviewComment(e.target.value)}
//                   rows="4"
//                 ></textarea>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 type="button" 
//                 className="btn btn-secondary" 
//                 onClick={() => setIsReviewModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 type="button" 
//                 className="btn btn-primary" 
//                 onClick={submitReview}
//                 disabled={rating === 0}
//               >
//                 Submit Review
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow-lg">
//         <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//           <h2 className="mb-0">My Orders</h2>
//           <div className="text-end">
//             <small>Total Orders: {boughtOrders.length + soldOrders.length}</small>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="order-status-tabs nav nav-tabs mb-3">
//             {['pending', 'completed', 'sold'].map((status) => (
//               <button
//                 key={status}
//                 className={`nav-link ${selectedStatus === status ? 'active' : ''}`}
//                 onClick={() => setSelectedStatus(status)}
//               >
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//                 <span className="badge bg-light text-dark ms-2">{statusCounts[status]}</span>
//               </button>
//             ))}
//           </div>

//           <div className="orders-list" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
//             {filteredOrders.length === 0 ? (
//               <div className="alert alert-info text-center" role="alert">
//                 No {selectedStatus} orders found
//               </div>
//             ) : (
//               filteredOrders.map((order) => (
//                 order.sellers.map((seller) => (
//                   <div key={order._id} className="card mb-3 shadow-sm">
//                     <div className="card-header d-flex justify-content-between align-items-center">
//                       <h5 className="mb-0">Order #{order._id}</h5>
//                       <span
//                         className={`badge
//                           bg-${order.status === 'pending'
//                             ? 'warning'
//                             : order.status === 'completed'
//                             ? 'success'
//                             : 'info'
//                           }`}
//                       >
//                         {order.status}
//                       </span>
//                     </div>
//                     <div className="card-body">
//                       <p className="mb-1">
//                         <strong>Seller:</strong> {seller.sellerID.first_name && seller.sellerID.last_name ? seller.sellerID.first_name + " " + seller.sellerID.last_name : 'Unknown Seller'}
//                       </p>
//                       <p className="mb-1">
//                         <strong>Items:</strong> {seller.items.map(item => `${item.itemID.name} (x${item.quantity})`).join(', ')}
//                       </p>
//                       <p className="mb-1">
//                         <strong>Amount:</strong> ${Number(order.amount).toFixed(2)}
//                       </p>
//                       <p className="mb-1">
//                         <strong>OTP:</strong> {localStorage.getItem(`order:${order._id}`) || 'N/A'}
//                       </p>
//                       {order.status === 'pending' && selectedStatus !== 'sold' && (
//                         <button
//                           className="btn btn-danger mt-2 me-2"
//                           onClick={() => handleCancelOrder(order._id)}
//                         >
//                           Cancel Order
//                         </button>
//                       )}
//                       {selectedStatus === 'completed' && (!order.reviewed || order.reviewed === false) && (
//                         <button
//                           className="btn btn-primary mt-2"
//                           onClick={() => openReviewModal(order)}
//                         >
//                           Leave a Review
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersDashboardBuyer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import TitleBar from '../components/TitleBar';
import { useNavigate } from 'react-router-dom';

const OrdersDashboardBuyer = () => {
  const navigate = useNavigate();
  const [boughtOrders, setBoughtOrders] = useState([]);
  const [soldOrders, setSoldOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Review states
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentReviewOrder, setCurrentReviewOrder] = useState(null);
  const [currentReviewItem, setCurrentReviewItem] = useState(null);
  const [currentReviewSeller, setCurrentReviewSeller] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

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
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const [boughtResponse, soldResponse] = await Promise.all([
          axios.get('http://localhost:4000/orders/api/get_bought', {
            headers: { Authorization: `${token}`, User_Data: JSON.stringify(parsedUser) },
          }),
          axios.get('http://localhost:4000/orders/api/get_sold', {
            headers: { Authorization: `${token}`, User_Data: JSON.stringify(parsedUser) },
          }),
        ]);

        setBoughtOrders(boughtResponse.data || []);
        setSoldOrders(soldResponse.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

    let parsedUser;
    try {
      parsedUser = JSON.parse(user1);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return;
    }

    axios
      .post(`http://localhost:4000/orders/api/cancel/${orderId}`, null, {
        headers: { 'Authorization': `${token}`, User_Data: JSON.stringify(parsedUser) },
      })
      .then(() => {
        setBoughtOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: 'cancelled' } : order
          )
        );
        localStorage.removeItem(`order:${orderId}`);
      })
      .catch((error) => {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order. Please try again.');
      });
  };

  // const handleRegenerateOTP = (orderId) => {
  //   const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  //   const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

  //   let parsedUser;
  //   try {
  //     parsedUser = JSON.parse(user1);
  //   } catch (error) {
  //     console.error("Error parsing user data:", error);
  //     return;
  //   }

  //   axios
  //     .post(`http://localhost:4000/orders/api/regenerate/${order_id}`, null, {
  //       headers: { 'Authorization': `${token}`, User_Data: JSON.stringify(parsedUser) },
  //     })
  //     .then((response) => {
  //       localStorage.setItem(`order:${orderId}`, response.data.new_otp);
  //     })
  //     .catch((error) => {
  //       console.error('Error generating otp:', error);
  //       alert('Error, Please try again.');
  //     });
  // };

  const openReviewModal = (order, seller, item) => {
    setCurrentReviewOrder(order);
    setCurrentReviewSeller(seller);
    setCurrentReviewItem(item);
    setIsReviewModalOpen(true);
    setRating(0);
    setReviewComment('');
  };

  const submitReview = () => {
    if (!currentReviewOrder || !currentReviewItem || !currentReviewSeller) return;

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

    let parsedUser;
    try {
      parsedUser = JSON.parse(user1);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return;
    }

    axios.post('http://localhost:4000/reviews/create', {
      orderId: currentReviewOrder._id,
      itemId: currentReviewItem.itemID._id,
      sellerId: currentReviewSeller.sellerID._id,
      rating,
      comment: reviewComment
    }, {
      headers: { 
        'Authorization': `${token}`, 
        'User_Data': JSON.stringify(parsedUser) 
      }
    })
    .then(() => {
      setBoughtOrders(prevOrders => 
        prevOrders.map(order => {
          if (order._id === currentReviewOrder._id) {
            const updatedSellers = order.sellers.map(seller => {
              if (seller.sellerID._id === currentReviewSeller.sellerID._id) {
                const updatedItems = seller.items.map(item => {
                  if (item.itemID._id === currentReviewItem.itemID._id) {
                    return { ...item, reviewed: true };
                  }
                  return item;
                });
                return { ...seller, items: updatedItems };
              }
              return seller;
            });
            return { ...order, sellers: updatedSellers };
          }
          return order;
        })
      );
      setIsReviewModalOpen(false);
      alert('Review submitted successfully!');
    })
    .catch((error) => {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    });
  };

  // const statusCounts = {
  //   pending: boughtOrders.filter(order => 
  //     order.status === 'pending'
  //   ).length,
  //   completed: boughtOrders.filter(order => 
  //     ['completed', 'cancelled'].includes(order.status) && 
  //     order.sellers.some(seller => 
  //       seller.items.some(item => !item.reviewed)
  //     )
  //   ).length,
  //   sold: soldOrders.filter(order => 
  //     ['completed', 'cancelled'].includes(order.status)
  //   ).length
  // };

  const statusCounts = {
      pending: boughtOrders.filter(order => 
          order.status === 'pending'
      ).length,
      completed: boughtOrders.filter(order => 
          ['completed', 'cancelled'].includes(order.status)
      ).length,
      sold: soldOrders.filter(order => 
          ['completed', 'cancelled'].includes(order.status)
      ).length
  };
  const filteredOrders = (() => {
      switch (selectedStatus) {
          case 'pending':
              return boughtOrders.filter(order => order.status === 'pending');
          case 'completed':
              return boughtOrders.filter(order => 
                  ['completed', 'cancelled'].includes(order.status)
              );
          case 'sold':
              return soldOrders.filter(order => ['completed', 'cancelled'].includes(order.status));
          default:
              return [];
      }
  })();
  // const filteredOrders = (() => {
  //   switch (selectedStatus) {
  //     case 'pending':
  //       return boughtOrders.filter(order => order.status === 'pending');
  //     case 'completed':
  //       return boughtOrders.filter(order => 
  //         ['completed', 'cancelled'].includes(order.status) && 
  //         order.sellers.some(seller => 
  //           seller.items.some(item => !item.reviewed)
  //         )
  //       );
  //     case 'sold':
  //       return soldOrders.filter(order => ['completed', 'cancelled'].includes(order.status));
  //     default:
  //       return [];
  //   }
  // })();

  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="d-flex mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star}
            onClick={() => setRating(star)}
            className="star-rating"
            style={{
              color: star <= rating ? 'gold' : 'gray',
              cursor: 'pointer',
              fontSize: '1.5rem',
              marginRight: '5px'
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

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
      <TitleBar title="Orders" />
      {/* <ChatBot /> */}
    <div className="container absolute left-16 mt-24 ml-24">
      {/* Review Modal */}
      <div 
        className={`modal fade ${isReviewModalOpen ? 'show d-block' : ''}`} 
        tabIndex="-1" 
        style={{ 
          backgroundColor: isReviewModalOpen ? 'rgba(0,0,0,0.5)' : 'transparent',
          display: isReviewModalOpen ? 'block' : 'none'
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Review Item: {currentReviewItem?.itemID?.name}</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setIsReviewModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Seller:</strong> {currentReviewSeller?.sellerID?.first_name} {currentReviewSeller?.sellerID?.last_name}
              </p>
              <h4 className="mb-3">Rate Your Experience</h4>
              <StarRating rating={rating} setRating={setRating} />
              
              <div className="form-group">
                <textarea 
                  className="form-control" 
                  placeholder="Write your review here..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setIsReviewModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={submitReview}
                disabled={rating === 0}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">My Orders</h2>
          <div className="text-end">
            <small>Total Orders: {boughtOrders.length + soldOrders.length}</small>
          </div>
        </div>
        <div className="card-body">
          <div className="order-status-tabs nav nav-tabs mb-3">
            {['pending', 'completed', 'sold'].map((status) => (
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
                order.sellers.map((seller) => (
                  <div key={`${order._id}-${seller.sellerID._id}`} className="card mb-3 shadow-sm">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Order #{order._id}</h5>
                      <span className={`badge bg-${order.status === 'pending' ? 'warning' : order.status === 'completed' ? 'success' : 'info'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <p className="mb-1">
                        <strong>Seller:</strong> {seller.sellerID.first_name && seller.sellerID.last_name ? 
                          seller.sellerID.first_name + " " + seller.sellerID.last_name : 'Unknown Seller'}
                      </p>
                      <div className="items-list">
                        <strong>Items:</strong>
                        {seller.items.map(item => (
                          <div key={item.itemID._id} className="d-flex justify-content-between align-items-center mt-2">
                            <span>{item.itemID.name} (x{item.quantity})</span>
                            {/* {selectedStatus === 'completed' && !item.reviewed && (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => openReviewModal(order, seller, item)}
                              >
                                Review Item
                              </button>
                            )} */}
                            {selectedStatus === 'completed' && (
                                item.reviewed ? (
                                    <span className="badge bg-success">Reviewed</span>
                                ) : (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => openReviewModal(order, seller, item)}
                                    >
                                        Review Item
                                    </button>
                                )
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="mb-1 mt-2">
                        <strong>Amount:</strong> ${Number(order.amount).toFixed(2)}
                      </p>
                      {selectedStatus === 'pending' &&
                        <p className="mb-1">
                          <strong>OTP:</strong> {localStorage.getItem(`order:${order._id}`) || 'N/A'}
                        </p>
                      }
                      {order.status === 'pending' && selectedStatus !== 'sold' && (
                        <button
                          className="btn btn-danger mt-2"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </button>
                      )}
                      {/* {order.status === 'pending' && selectedStatus !== 'sold' && (
                        <button
                          className="btn btn-danger mt-2"
                          onClick={() => handleRegenerateOTP(order._id)}
                        >
                          Regenerate OTP
                        </button>
                      )} */}
                      {/* {order.status === 'pending' && localStorage.getItem(`order:${order._id}`) && localStorage.removeItem(`order:${order._id}`)} */}
                    </div>
                  </div>
                ))
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrdersDashboardBuyer;