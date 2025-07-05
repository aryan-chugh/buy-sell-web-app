// // import React, { useState, useEffect, useRef } from "react";
// // import { Search, X, Sliders,Star, ShoppingCart } from "lucide-react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const SearchPage = () => {
// //   const [itemsShowing, setItemsShowing] = useState([]);
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [categories, setCategories] = useState([]);
// //   const [selectedCategories, setSelectedCategories] = useState([]);
// //   const [priceRange, setPriceRange] = useState(5000);

// //   const inputRef = useRef(null);  // Create the inputRef

// //   useEffect(() => {
// //     fetchProducts();
// //     fetchCategories();
// //   }, []);

// //   const fetchProducts = () => {
// //     axios
// //       .get(`http://localhost:4000/search/api/get_all`)
// //       .then((response) => {
// //         setItemsShowing(response.data.items);
// //       })
// //       .catch((error) => console.error("Error: ", error));
// //   };

// //   const fetchCategories = () => {
// //     axios
// //       .get(`http://localhost:4000/search/api/get_categories`)
// //       .then((response) => {
// //         setCategories(response.data.categories);
// //       })
// //       .catch((error) => console.error("Error: ", error));
// //   };

// //   const handleSearch = () => {
// //     const searchTerm = inputRef.current.value; // Get value directly from the ref
// //     axios
// //       .get(`http://localhost:4000/search/api/get_all`)
// //       .then((response) => {
// //         let filteredItems = response.data.items.filter((item) =>
// //           item.name.toLowerCase().includes(searchTerm.toLowerCase())
// //         );

// //         if (selectedCategories.length > 0) {
// //           filteredItems = filteredItems.filter((item) =>
// //             item.category.some((cat) => selectedCategories.includes(cat))
// //           );
// //         }

// //         filteredItems = filteredItems.filter((item) => item.price <= priceRange);
// //         setItemsShowing(filteredItems);
// //       })
// //       .catch((error) => console.error("Error: ", error));

// //       // inputRef.current.value = searchTerm;
// //   };

// //   const handleCategoryChange = (category) => {
// //     setSelectedCategories((prev) =>
// //       prev.includes(category)
// //         ? prev.filter((cat) => cat !== category)
// //         : [...prev, category]
// //     );
// //   };

// //   const SearchBar = () => {
// //     useEffect(() => {
// //       if (inputRef.current) {
// //         inputRef.current.focus(); // Ensure focus stays
// //       }
// //     }, []);  // Focus when component mounts

// //     const clearSearch = () => {
// //       if (inputRef.current) {
// //         inputRef.current.value = "";  // Clear the input directly
// //         handleSearch();
// //       }
// //     };

// //     return (
// //       <div className="relative w-full max-w-4xl mx-auto mb-8">
// //         <div className="relative">
// //           <input
// //             ref={inputRef}  // Attach the ref to the input
// //             type="text"
// //             className="w-full px-10 py-3 pl-12 pr-10 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             placeholder="Search for products..."
// //           />
// //           <button
// //             onClick={clearSearch}  // Clear the input directly using the ref
// //             className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //           <button
// //             onClick={handleSearch}
// //             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
// //           >
// //             <Search className="w-5 h-5" />
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 pl-16 pt-20">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <SearchBar />

// //         <div className="flex flex-col lg:flex-row gap-8">
// //           <button
// //             className="lg:hidden flex items-center justify-center space-x-2 w-full mb-4 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
// //             onClick={() => setShowFilters(!showFilters)}
// //           >
// //             <Sliders className="w-5 h-5" />
// //             <span>Filters</span>
// //           </button>

// //           <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
// //             <FiltersSidebar
// //               categories={categories}
// //               selectedCategories={selectedCategories}
// //               handleCategoryChange={handleCategoryChange}
// //               priceRange={priceRange}
// //               setPriceRange={setPriceRange}
// //             />
// //           </div>

// //           <div className="lg:w-3/4">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-6">
// //               {itemsShowing.length} Products Found
// //             </h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {itemsShowing.map((product) => (
// //                 <ProductCard key={product._id} product={product} />
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const ProductCard = ({ product }) => {
// //   const navigate = useNavigate();

// //   // console.log(product._id);
// //   const handleNavigate = () => {
// //     navigate(`/item/${product._id}`);
// //   };

// //   const handleCartAdd = async (event) => {
// //     event.stopPropagation(); // Prevent triggering the card click event
// //     try {
// //       const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// //       const user = localStorage.getItem('user') || sessionStorage.getItem('user')
// //       if (!token) {
// //         // navigate('/login');
// //         return;
// //       }
// //       // console.log(token);
// //       const response = await axios.post("http://localhost:4000/mycart/api/add_item", {
// //         item_id: product._id,
// //         quantity: 1,
// //       }, { 
// //         headers: { Authorization: `${token}`, User_Data: JSON.stringify(user)},
// //       });
      
// //       if (response.status === 200) {
// //         alert("Item added to cart successfully!");
// //       }
// //     } catch (error) {
// //       console.error("Error adding item to cart:", error);
// //       alert("Failed to add item to cart. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
// //           onClick={handleNavigate}>
// //       <div className="relative">
// //         <img
// //           src={product.image}
// //           alt={product.name}
// //           className="w-full h-48 object-cover"
// //         />
// //         {product.discount && (
// //           <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
// //             {product.discount.percentage}% OFF
// //           </div>
// //         )}
// //       </div>
      
// //       <div className="p-4">
// //         <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
// //         <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
// //         <div className="flex align-self-center items-center mb-4">
// //           {[...Array(5)].map((_, i) => (
// //             <Star
// //               key={i}
// //               className={`w-4 h-4 ${
// //                 i < Math.floor(product.rating)
// //                   ? 'text-yellow-400 fill-yellow-400'
// //                   : 'text-gray-300 fill-gray-300'
// //               }`}
// //             />
// //           ))}
// //           <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
// //         </div>
        
// //         <div className="flex flex-column justify-between items-center">
// //           <div className="flex flex-row space-between">
// //             {product.discount ? (
// //               <>
// //                 <span className="flex items-center py-1 text-gray-400 line-through text-sm mr-2">
// //                   ${product.price.toFixed(2)}
// //                 </span>
// //                 <span className="text-xl font-bold text-gray-900 ml-2">
// //                   ${(product.price * (1 - product.discount.percentage / 100)).toFixed(2)}
// //                 </span>
// //               </>
// //             ) : (
// //               <span className="text-xl font-bold text-gray-900">
// //                 ${product.price.toFixed(2)}
// //               </span>
// //             )}
// //           </div>
          
// //           <button 
// //             onClick={handleCartAdd}
// //             className="flex items-center justify-center px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
// //             <ShoppingCart className="w-5 h-5 mr-2" />
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // //   const FiltersSidebar = () => {
// // //     const [categories, setCategories] = useState([]);

// // //     useEffect(() => {
// // //       axios
// // //       .get(`http://localhost:4000/search/api/get_categories`)
// // //       .then((response) => {
// // //           const data = response.data;
// // //           setCategories(data.categories);

// // //           // console.log(categories);
// // //       })
// // //       .catch((error) => {
// // //           console.log("Error: ", error);
// // //       });
// // //     }, []);

// // //     return (
// // //       <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
// // //         <div className="flex items-center justify-between mb-4">
// // //           <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
// // //           <button className="text-blue-600 text-sm hover:text-blue-800">Clear All</button>
// // //         </div>
        
// // //           <div key="categories" className="space-y-4">
// // //             <h3 className="font-medium text-gray-700">Categories</h3>
// // //             <div className="space-y-2">
// // //               {categories.length > 0 ? (
// // //                 categories.map((option, index) => (
// // //                   <label key={index} className="flex items-center space-x-3 text-gray-600 hover:text-gray-800">
// // //                     <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
// // //                     <span className="text-sm">{option}</span>
// // //                   </label>
// // //                 ))) : (
// // //                   <p> No categories found </p>
// // //                 )
// // //               }
// // //             </div>
// // //           </div>
// // //       </div>
// // //     );
// // //   // };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         <SearchBar />
        
// // //         <div className="flex flex-col lg:flex-row gap-8">
// // //           {/* Mobile filter button */}
// // //           <button
// // //             className="lg:hidden flex items-center justify-center space-x-2 w-full mb-4 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
// // //             onClick={() => setShowFilters(!showFilters)}
// // //           >
// // //             <Sliders className="w-5 h-5" />
// // //             <span>Filters</span>
// // //           </button>

// // //           {/* Filters sidebar - hidden on mobile unless toggled */}
// // //           <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
// // //             <FiltersSidebar />
// // //           </div>

// // //           {/* Product grid */}
// // //           <div className="lg:w-3/4">
// // //             <div className="mb-6 flex justify-between items-center">
// // //               <h2 className="text-xl font-semibold text-gray-800">
// // //                 {itemsShowing.length} Products
// // //               </h2>
// // //               <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
// // //                 <option>Sort by: Featured</option>
// // //                 <option>Price: Low to High</option>
// // //                 <option>Price: High to Low</option>
// // //                 <option>Customer Rating</option>
// // //               </select>
// // //             </div>
            
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //               {itemsShowing.map(product => (
// // //                 <ProductCard key={product._id} product={product} />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // const FiltersSidebar = ({ categories, selectedCategories, handleCategoryChange, priceRange, setPriceRange }) => {
// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-md">
// //       <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
// //       <div className="mb-4">
// //         <h4 className="font-semibold text-gray-800 mb-2">Categories</h4>
// //         <div className="space-y-2">
// //           {categories.map((category) => (
// //             <div key={category} className="flex items-center">
// //               <input
// //                 type="checkbox"
// //                 checked={selectedCategories.includes(category)}
// //                 onChange={() => handleCategoryChange(category)}
// //                 className="mr-2"
// //               />
// //               <label className="text-gray-700">{category}</label>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div>
// //         <h4 className="font-semibold text-gray-800 mb-2">Price Range</h4>
// //         <input
// //           type="range"
// //           min="0"
// //           max="10000"
// //           step="100"
// //           value={priceRange}
// //           onChange={(e) => setPriceRange(e.target.value)}
// //           className="w-full"
// //         />
// //         <div className="flex justify-between">
// //           <span>$0</span>
// //           <span>${priceRange}</span>
// //           <span>$10000</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchPage;

// import React, { useState, useEffect, useRef } from "react";
// import { Search, X, Sliders, Star, ShoppingCart } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import TitleBar from "../components/TitleBar";
// import ChatBot from "../components/Chatbot";
// import Sidebar from "../components/SideBar";

// const SearchPage = () => {
//   const [itemsShowing, setItemsShowing] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState(5000);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = () => {
//     axios
//       .get(`http://localhost:4000/search/api/get_all`)
//       .then((response) => {
//         setItemsShowing(response.data.items);
//       })
//       .catch((error) => console.error("Error: ", error));
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`http://localhost:4000/search/api/get_categories`)
//       .then((response) => {
//         setCategories(response.data.categories);
//       })
//       .catch((error) => console.error("Error: ", error));
//   };

//   const handleSearch = () => {
//     const searchTerm = inputRef.current.value;
//     axios
//       .get(`http://localhost:4000/search/api/get_all`)
//       .then((response) => {
//         let filteredItems = response.data.items.filter((item) =>
//           item.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//         if (selectedCategories.length > 0) {
//           filteredItems = filteredItems.filter((item) =>
//             item.category.some((cat) => selectedCategories.includes(cat))
//           );
//         }

//         filteredItems = filteredItems.filter((item) => item.price <= priceRange);
//         setItemsShowing(filteredItems);
//       })
//       .catch((error) => console.error("Error: ", error));
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//   };

//   const SearchBar = () => {
//     useEffect(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, []);

//     const clearSearch = () => {
//       if (inputRef.current) {
//         inputRef.current.value = "";
//         handleSearch();
//       }
//     };

//     return (
//       <div className="relative w-full max-w-4xl mx-auto mb-8">
//         <div className="relative">
//           <input
//             ref={inputRef}
//             type="text"
//             className="w-full px-10 py-3 pl-12 pr-10 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Search for products..."
//           />
//           <button
//             onClick={clearSearch}
//             className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-5 h-5" />
//           </button>
//           <button
//             onClick={handleSearch}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             <Search className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const FiltersSidebar = ({ categories, selectedCategories, handleCategoryChange, priceRange, setPriceRange }) => {
//     const applyFilters = () => {
//       handleSearch();
//     };
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
//         <div className="mb-4">
//           <h4 className="font-semibold text-gray-800 mb-2">Categories</h4>
//           <div className="space-y-2">
//             {categories.map((category) => (
//               <div key={category} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories.includes(category)}
//                   onChange={() => handleCategoryChange(category)}
//                   className="mr-2"
//                 />
//                 <label className="text-gray-700">{category}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h4 className="font-semibold text-gray-800 mb-2">Price Range</h4>
//           <input
//             type="range"
//             min="0"
//             max="10000"
//             step="100"
//             value={priceRange}
//             onChange={(e) => setPriceRange(e.target.value)}
//             className="w-full"
//           />
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>$0</span>
//             <span>${priceRange}</span>
//             <span>$10000</span>
//           </div>
//         </div>
//         <button
//           onClick={applyFilters}
//           className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//         Apply Filters
//         </button>
//       </div>
//     );
//   };

//   // const ProductCard = ({ product }) => {
//   //   const navigate = useNavigate();

//   //   const handleNavigate = () => {
//   //     navigate(`/item/${product._id}`);
//   //   };

//   //   const handleCartAdd = async (event) => {
//   //     event.stopPropagation();
//   //     try {
//   //       const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//   //       const user = localStorage.getItem('user') || sessionStorage.getItem('user')
//   //       if (!token) {
//   //         return;
//   //       }
//   //       const response = await axios.post("http://localhost:4000/mycart/api/add_item", {
//   //         item_id: product._id,
//   //         quantity: 1,
//   //       }, { 
//   //         headers: { Authorization: `${token}`, User_Data: JSON.stringify(user)},
//   //       });
        
//   //       if (response.status === 200) {
//   //         alert("Item added to cart successfully!");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error adding item to cart:", error);
//   //       alert("Failed to add item to cart. Please try again.");
//   //     }
//   //   };

//   //   return (
//   //     <div 
//   //       className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//   //       onClick={handleNavigate}
//   //     >
//   //       <div className="relative">
//   //         <img
//   //           src={product.image}
//   //           alt={product.name}
//   //           className="w-full h-48 object-cover"
//   //         />
//   //         {product.discount && (
//   //           <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
//   //             {product.discount.percentage}% OFF
//   //           </div>
//   //         )}
//   //       </div>
        
//   //       <div className="p-4">
//   //         <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
//   //         <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          
//   //         <div className="flex items-center mb-4">
//   //           {[...Array(5)].map((_, i) => (
//   //             <Star
//   //               key={i}
//   //               className={`w-4 h-4 ${
//   //                 i < Math.floor(product.rating)
//   //                   ? 'text-yellow-400 fill-yellow-400'
//   //                   : 'text-gray-300 fill-gray-300'
//   //               }`}
//   //             />
//   //           ))}
//   //           <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
//   //         </div>
          
//   //         <div className="flex justify-between items-center">
//   //           <div className="flex items-center">
//   //             {product.discount ? (
//   //               <>
//   //                 <span className="text-gray-400 line-through text-sm mr-2">
//   //                   ${product.price.toFixed(2)}
//   //                 </span>
//   //                 <span className="text-xl font-bold text-gray-900">
//   //                   ${(product.price * (1 - product.discount.percentage / 100)).toFixed(2)}
//   //                 </span>
//   //               </>
//   //             ) : (
//   //               <span className="text-xl font-bold text-gray-900">
//   //                 ${product.price.toFixed(2)}
//   //               </span>
//   //             )}
//   //           </div>
            
//   //           <button 
//   //             onClick={handleCartAdd}
//   //             className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
//   //           >
//   //             <ShoppingCart className="w-5 h-5 mr-2" />
//   //             Add to Cart
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // };
//   const ProductCard = ({ product }) => {
//     const navigate = useNavigate();
  
//     const handleNavigate = () => {
//       navigate(`/item/${product._id}`);
//     };
  
//     const handleCartAdd = async (event) => {
//       event.stopPropagation();
//       try {
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         const user = localStorage.getItem('user') || sessionStorage.getItem('user')
//         if (!token) {
//           return;
//         }
//         const response = await axios.post("http://localhost:4000/mycart/api/add_item", {
//           item_id: product._id,
//           quantity: 1,
//         }, { 
//           headers: { Authorization: `${token}`, User_Data: JSON.stringify(user)},
//         });
        
//         if (response.status === 200) {
//           alert("Item added to cart successfully!");
//         }
//       } catch (error) {
//         console.error("Error adding item to cart:", error);
//         alert("Failed to add item to cart. Please try again.");
//       }
//     };
  
//     return (
//       <div 
//         className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
//         onClick={handleNavigate}
//       >
//         <div className="relative">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-48 object-cover"
//           />
//           {product.discount && (
//             <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
//               {product.discount.percentage}% OFF
//             </div>
//           )}
//         </div>
        
//         <div className="p-4 flex flex-col flex-grow">
//           <div className="flex-grow">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
//             <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            
//             <div className="flex items-center mb-4">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < Math.floor(product.rating)
//                       ? 'text-yellow-400 fill-yellow-400'
//                       : 'text-gray-300 fill-gray-300'
//                   }`}
//                 />
//               ))}
//               <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
//             </div>
//           </div>
          
//           <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
//             <div className="flex items-center">
//               {product.discount ? (
//                 <>
//                   <span className="text-gray-400 line-through text-sm mr-2">
//                     ${product.price.toFixed(2)}
//                   </span>
//                   <span className="text-xl font-bold text-gray-900">
//                     ${(product.price * (1 - product.discount.percentage / 100)).toFixed(2)}
//                   </span>
//                 </>
//               ) : (
//                 <span className="text-xl font-bold text-gray-900">
//                   ${product.price.toFixed(2)}
//                 </span>
//               )}
//             </div>
            
//             <button 
//               onClick={handleCartAdd}
//               className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
//             >
//               <ShoppingCart className="w-5 h-5 mr-2" />
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50 pl-16 pt-16">
//       {/* <div className="min-h-screen bg-gray-50 pl-16 pt-16"> */}
//       <Sidebar />
//       <TitleBar />
//       <ChatBot />
//       <div className="max-w-7xl mx-auto px-4 mt-8">
//         <SearchBar />

//         <div className="flex flex-col lg:flex-row gap-8">
//           <button
//             className="lg:hidden flex items-center justify-center space-x-2 w-full mb-4 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <Sliders className="w-5 h-5" />
//             <span>Filters</span>
//           </button>

//           <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
//             <FiltersSidebar
//               categories={categories}
//               selectedCategories={selectedCategories}
//               handleCategoryChange={handleCategoryChange}
//               priceRange={priceRange}
//               setPriceRange={setPriceRange}
//               applyFilters={applyFilters}
//             />
//           </div>

//           <div className="lg:w-3/4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">
//               {itemsShowing.length} Products Found
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {itemsShowing.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Sliders, Star, ShoppingCart } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import ChatBot from "../components/Chatbot";
import Sidebar from "../components/SideBar";
import StarRatingDisplay from "../components/StarRatingDisplay";

const SearchPage = () => {
  const [itemsShowing, setItemsShowing] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(5000);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(() => {
    axios
      .get(`http://localhost:4000/search/api/get_all`)
      .then((response) => {
        setItemsShowing(response.data.items);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  const fetchCategories = useCallback(() => {
    axios
      .get(`http://localhost:4000/search/api/get_categories`)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  const handleSearch = useCallback(() => {
    const searchTerm = inputRef.current.value;
    axios
      .get(`http://localhost:4000/search/api/get_all`)
      .then((response) => {
        let filteredItems = response.data.items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCategories.length > 0) {
          filteredItems = filteredItems.filter((item) =>
            item.category.some((cat) => selectedCategories.includes(cat))
          );
        }

        filteredItems = filteredItems.filter((item) => item.price <= priceRange);
        setItemsShowing(filteredItems);
      })
      .catch((error) => console.error("Error: ", error));
  }, [selectedCategories, priceRange]);

  const applyFilters = () => {
    handleSearch();
    setShowFilters(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const SearchBar = () => {
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const clearSearch = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
        handleSearch();
      }
    };

    return (
      <div className="relative w-full max-w-4xl mx-auto mb-5">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            className="w-full px-10 py-3 pl-12 pr-10 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search for products..."
          />
          <button
            onClick={clearSearch}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={handleSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const FiltersSidebar = ({ 
    categories, 
    selectedCategories, 
    handleCategoryChange, 
    priceRange, 
    setPriceRange 
  }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                <label className="text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Price Range</h4>
          <input
            type="range"
            min="0"
            max="1000"
            step="5"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${priceRange}</span>
            <span>$1000</span>
          </div>
        </div>
        <button
          onClick={applyFilters}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    );
  };

  const ProductCard = ({ product }) => {
    const handleNavigate = () => {
      navigate(`/item/${product._id}`);
    };

    const handleCartAdd = async (event) => {
      event.stopPropagation();
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const user = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (!token) return;

        const response = await axios.post("http://localhost:4000/mycart/api/add_item", 
          {
            item_id: product._id,
            quantity: 1,
          }, 
          { 
            headers: { 
              Authorization: `${token}`, 
              User_Data: JSON.stringify(user)
            },
          }
        );
        if(response.data.status === '304') {
          alert("Required quantity is not available!");
        }else if(response.data.status === '306') {
          alert("You cannot add to cart your own item!");
        }else if (response.status === 200) {
          alert("Item added to cart successfully!");
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart. Please try again.");
      }
    };
    

    return (
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
        onClick={handleNavigate}
      >
        <div className="relative">
        
          <img
            src={product.images && product.images[0] ? product.images[0].url : "/api/placeholder/600" }
            alt={product.name}
            className="w-full h-48 object-fit"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
              {product.discount.percentage}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center mb-4">
              {/* {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 fill-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.rating})</span> */}
              {console.log(product.reviews)}
              <StarRatingDisplay reviews={product.reviews} />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center">
              {product.discount ? (
                <>
                  <span className="text-gray-400 line-through text-sm mr-2">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ${(product.price * (1 - product.discount.percentage / 100)).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <button 
              onClick={handleCartAdd}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-16 pt-16">
      <Sidebar />
      <TitleBar title="Search"/>
      <ChatBot />
      <div className="maxw-7xl mx-auto px-4 mt-10">
      
      <SearchBar />
        <div className="flex flex-col lg:flex-row gap-8">
          <button
            className="lg:hidden flex items-center justify-center space-x-2 w-full mb-4 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Sliders className="w-5 h-5" />
            <span>Filters</span>
          </button>

          <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"} overflow-y-auto`}>
            <FiltersSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          <div className="lg:w-3/4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {itemsShowing.length} Products Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
              {itemsShowing.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
