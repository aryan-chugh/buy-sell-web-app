// import React, { useEffect, useState } from 'react';
// import { Trash2, Plus, Minus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [orderSummary, setOrderSummary] = useState({
//     merchandise: 0,
//     shipping: 16.95,
//     discount: -16.95,
//     tax: 10.63
//   });

//   useEffect(() => {
//       const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//       const user = localStorage.getItem('user') || sessionStorage.getItem('user')
//       if (!token) {
//           // useNavigate('/login');
//           return;
//       }
//       axios.get('http://localhost:4000/mycart/api/get_items', { 
//           headers: { Authorization: `${token}`, User_Data: JSON.stringify(user)},
//       })
//       .then(response => setCartItems(response.data.items))
//       .catch(error => console.error(error));
//   }, []);

//   const handleQuantityChange = (change) => {
//     setQuantity(Math.max(1, quantity + change));
//   };

//   const calculateTotal = () => {
//     const { merchandise, shipping, discount, tax } = orderSummary;
//     return merchandise + shipping + discount + tax;
//   };

//   const calculateDiscountedPrice = (price, discount) => {
//     if (!discount) return price;
//     return price * (1 - discount.percentage / 100);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <h1 className="text-3xl mx-auto left-5 font-bold text-gray-800 mb-4">Your Cart</h1>
//       <div className="container mx-auto py-8 px-4">

//         <div className="grid grid-cols-3 gap-6">
//           {/* Cart Column */}
//           <div className="col-span-2">
//             {cartItems.map(item => (
//               <div key={item.item._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
//                 <h2 className="text-xl font-semibold mb-4">Your Cart ({cartItems.length} Item{cartItems.length !== 1 ? 's' : ''})</h2>
                
//                 <div className="grid grid-cols-4 gap-4 items-center">
//                   <img
//                     src={item.item.image}
//                     alt={item.item.name}
//                     className="w-full h-32 object-cover rounded-md"
//                   />
                  
//                   <div className="col-span-2">
//                     <h3 className="font-bold text-lg">{item.item.name}</h3>
//                     <p className="text-gray-500 text-sm">Item ID: {item.item._id}</p>
//                     <p className="text-sm text-green-600">{item.item.stock > 0 ? 'In stock and ready to ship' : 'Out of stock'}</p>
//                   </div>
                  
//                   <div className="flex flex-col items-end space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <button 
//                         onClick={() => handleQuantityChange(-1)} 
//                         className="bg-gray-100 p-1 rounded-full hover:bg-gray-200"
//                       >
//                         <Minus size={16} />
//                       </button>
//                       <input
//                         type="text"
//                         value={item.quantity}
//                         readOnly
//                         className="w-12 text-center border rounded-md"
//                       />
//                       <button 
//                         onClick={() => handleQuantityChange(1)} 
//                         className="bg-gray-100 p-1 rounded-full hover:bg-gray-200"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                     {/* <p className="font-bold">${item.price.toFixed(2)}</p> */}
//                     <div className="flex items-center space-x-4">
//                       {item.item.discount ? (
//                         <div className="flex flex-column items-center space-x-2">
//                           <div className="flex flex-row items-center space-x-2">
//                             <span className="text-xl font-bold text-red-600">
//                               ${calculateDiscountedPrice(item.item.price, item.item.discount)?.toFixed(2)}
//                             </span>
//                             <span className="text-md text-gray-500 line-through">
//                               ${item.item.price?.toFixed(2)}
//                             </span>
//                           </div>
//                           <span className="text-sm text-red-600">
//                             ({item.item.discount.percentage}% OFF)
//                           </span>
//                         </div>
//                       ) : (
//                         <div className="text-2xl font-bold text-gray-900">
//                           ${item.item.price?.toFixed(2)}
//                         </div>
//                       )}
//                     </div>
//                     <button className="text-gray-500 hover:text-red-500 flex items-center">
//                       <Trash2 size={16} className="mr-1" /> Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Cart Summary Column */}
//           <div>
//             <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Merchandise:</span>
//                   <span className="font-medium">${orderSummary.merchandise.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping:</span>
//                   <span className="font-medium">${orderSummary.shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Discount:</span>
//                   <span className="text-green-600">${orderSummary.discount.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax:</span>
//                   <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
//                 </div>
//                 <hr className="my-3" />
//                 <div className="flex justify-between font-bold text-lg">
//                   <span>Total:</span>
//                   <span>${calculateTotal().toFixed(2)}</span>
//                 </div>
//               </div>
//               <div className="mt-4 space-y-2">
//                 <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
//                   Checkout Now
//                 </button>
//                 <button className="w-full bg-gray-100 py-3 rounded-md hover:bg-gray-200 transition">
//                   PayPal
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Suggested Items */}
//           <div className="col-span-3 bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
//             <div className="grid grid-cols-5 gap-4">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <div key={index} className="text-center">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt={`Recommended Item ${index + 1}`}
//                     className="w-full h-32 object-cover rounded-md mb-2"
//                   />
//                   <p className="text-sm font-medium">Product {index + 1}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Additional Content */}
//           <div className="col-span-3">
//             <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//               <h2 className="text-xl font-semibold mb-4">Returns Made Easy</h2>
//               <p className="text-gray-600">
//                 We stand behind our products and want every purchase to be a positive experience.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-semibold mb-3">International Shipping</h2>
//               <p className="text-gray-600">
//                 Shipping outside the US and Canada? Complete the International Order Quote form for eligible merchandise.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import TitleBar from '../components/TitleBar';
import ChatBot from "../components/Chatbot";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    merchandise: 0,
    tax: 10
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCartItems(token, user);
  }, []);

  const fetchCartItems = (token, user) => {
    axios.get('http://localhost:4000/mycart/api/get_items', { 
      headers: { Authorization: `${token}`, User_Data: JSON.stringify(user)},
    })
    .then(response => {
      const items = response.data.items;
      setCartItems(items);
      updateOrderSummary(items);
    })
    .catch(error => console.error(error));
  };

  const handleQuantityChange = (itemId, change) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');

    const itemToUpdate = cartItems.find(cartItem => cartItem.item._id === itemId);
    if (!itemToUpdate) return;

    const newQuantity = Math.max(1, itemToUpdate.quantity + change);

    let change2 = newQuantity - itemToUpdate.quantity;
    console.log(change2);
    if(change2 < 0) {
      axios.post(`http://localhost:4000/mycart/api/reduce_item`, 
        { 
          item_id: itemId, 
          item_quantity: -change2
        },
        { 
          headers: { 
            Authorization: `${token}`, 
            User_Data: JSON.stringify(user) 
          } 
        }
      )
      .then(response => {
        if(response.data.status == 304) {
          alert("Stock limit reached!");
        }else {
          const updatedCartItems = cartItems.map(cartItem => 
            cartItem.item._id === itemId 
              ? { ...cartItem, quantity: newQuantity } 
              : cartItem
          );
          
          setCartItems(updatedCartItems);
          updateOrderSummary(updatedCartItems);
        }
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
      });
    }else if(change2 > 0){
      axios.post(`http://localhost:4000/mycart/api/add_item`, 
        { 
          item_id: itemId, 
          quantity: change2
        },
        { 
          headers: { 
            Authorization: `${token}`, 
            User_Data: JSON.stringify(user) 
          } 
        }
      )
      .then(response => {
        if(response.data.status == 304) {
          alert("Stock limit reached!");
        }else {
          const updatedCartItems = cartItems.map(cartItem => 
            cartItem.item._id === itemId 
              ? { ...cartItem, quantity: newQuantity } 
              : cartItem
          );
          
          setCartItems(updatedCartItems);
          updateOrderSummary(updatedCartItems);
        }
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
      });
    }
  };

  const handleRemoveItem = (itemId) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');

    axios.post(`http://localhost:4000/mycart/api/remove_item`, { 
      item_id: itemId, 
      },{
      headers: { 
        Authorization: `${token}`, 
        User_Data: JSON.stringify(user) 
      }
    })
    .then(response => {
      const updatedCartItems = cartItems.filter(cartItem => cartItem.item._id !== itemId);
      setCartItems(updatedCartItems);
      updateOrderSummary(updatedCartItems);
    })
    .catch(error => {
      console.error('Error removing item:', error);
    });
  };

  const updateOrderSummary = (items) => {
    const merchandiseTotal = items.reduce((total, item) => {
      const price = calculateDiscountedPrice(item.item.price, item.item.discount);
      return total + (price * item.quantity);
    }, 0);

    setOrderSummary(prevSummary => ({
      ...prevSummary,
      merchandise: merchandiseTotal
    }));
  };

  const calculateTotal = () => {
    const { merchandise, tax } = orderSummary;
    return merchandise + (tax / 100) * merchandise ;
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price * (1 - discount.percentage / 100);
  };

  // const handleCheckout = () => {
  //   const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  //   const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

  //   // console.log(JSON.parse(user1));

  //   let parsedUser;
  //   try {
  //     parsedUser = JSON.parse(user1);  // Ensure proper parsing
  //   } catch (error) {
  //     console.error("Error parsing user data:", error);
  //     return;
  //   }

  //   axios.post(`http://localhost:4000/mycart/api/checkout`, {}, {
  //     headers: { 
  //       Authorization: `${token}`, 
  //       User_Data: JSON.stringify(parsedUser) 
  //     }
  //   })
  //   .then(response => {
  //     const data = response.data;
  //     alert(`total bill is ${data.bill}`);
  //     localStorage.setItem(`order:${data.order_id}`, data.otp);
  //     setCartItems([]);
  //     updateOrderSummary([]);
  //   })
  //   .catch(error => {
  //     console.error('Error checking out:', error);
  //   });
  // };

  const handleCheckout = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

    let parsedUser;
    try {
        parsedUser = JSON.parse(user1);
    } catch (error) {
        console.error("Error parsing user data:", error);
        return;
    }

    axios.post(`http://localhost:4000/mycart/api/checkout`, {}, {
        headers: { 
            Authorization: `${token}`, 
            User_Data: JSON.stringify(parsedUser) 
        }
    })
    .then(response => {
        const data = response.data;
        data.orders.forEach(order => {
            alert(`Order ID: ${order.order_id}, Bill: $${order.bill}`);
            localStorage.setItem(`order:${order.order_id}`, order.otp);
        });
        setCartItems([]);
        updateOrderSummary([]);
    })
    .catch(error => {
        console.error('Error checking out:', error);
    });
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <TitleBar title="My Cart"/>
      <Sidebar />
      {/* <ChatBot /> */}
      <div className="container absolute mt-32 left-16">
        <div className="grid grid-cols-3 gap-6">
          {/* Cart Column */}
          <div className="col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.item._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    {/* {console.log(item.item)} */}
                    <img
                      src={item.item.images[0] ? item.item.images[0].url : "http://placeholder/600"}
                      alt={item.item.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    
                    <div className="col-span-2">
                      <h3 className="font-bold text-lg">{item.item.name}</h3>
                      <p className="text-gray-500 text-sm">Item ID: {item.item._id}</p>
                      <p className="text-sm text-green-600">{item.item.stock > 0 ? 'In stock and ready to ship' : 'Out of stock'}</p>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleQuantityChange(item.item._id, -1)} 
                          className="bg-gray-100 p-1 rounded-full hover:bg-gray-200"
                          // disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center border rounded-md"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item.item._id, 1)} 
                          className="bg-gray-100 p-1 rounded-full hover:bg-gray-200"
                          // disabled={item.quantity >= item.item.stock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        {item.item.discount ? (
                          <div className="flex flex-column items-center space-x-2">
                            <div className="flex flex-row items-center space-x-2">
                              <span className="text-xl font-bold text-red-600">
                                ${(calculateDiscountedPrice(item.item.price, item.item.discount)).toFixed(2)}
                              </span>
                              <span className="text-md text-gray-500 line-through">
                                ${item.item.price.toFixed(2)}
                              </span>
                            </div>
                            <span className="text-sm text-red-600">
                              ({item.item.discount.percentage}% OFF)
                            </span>
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-gray-900">
                            ${item.item.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.item._id)}
                        className="text-gray-500 hover:text-red-500 flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary Column */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sum Total:</span>
                  <span className="font-medium">${orderSummary.merchandise.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (%):</span>
                  <span className="text-green-600">{orderSummary.tax.toFixed(2)} %</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button 
                  disabled={cartItems.length === 0}
                  className={`w-full py-3 rounded-md transition ${
                    cartItems.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  onClick={handleCheckout}
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Items
          <div className="col-span-3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt={`Recommended Item ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <p className="text-sm font-medium">Product {index + 1}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Additional Content */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Returns Made Easy</h2>
              <p className="text-gray-600">
                We stand behind our products and want every purchase to be a positive experience.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">International Shipping</h2>
              <p className="text-gray-600">
                Shipping outside the US and Canada? Complete the International Order Quote form for eligible merchandise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;