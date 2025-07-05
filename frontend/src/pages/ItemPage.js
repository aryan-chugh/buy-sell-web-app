// import React, { useEffect, useState } from "react";
// import "tailwindcss/tailwind.css";
// import axios from "axios";

// const ProductPage = ({item_id}) => {
//     const [item, setItem] = useState({});
//     const [recommendations, setRecommendations] = useState({})
//     const [reviews, setReviews] = useState([]);

//     const [shouldRender, setShouldRender] = useState(false);

//     const [showComments, setShowComments] = useState(false);
//     const toggleComments = () => {
//         setShowComments(!showComments);
//     };
//     const [shouldRenderRecommend, setShouldRenderRecommend] = useState(false);

//     useEffect(() => {
//         // make this port dynamic
//         axios
//             .get(`http://localhost:4000/item/api/${item_id}`)
//             .then((response) => {
//                 if (response.status === 200) {
//                     const data = response.data;
//                     // console.log(data.item[0].price);
//                     setItem(data.item[0]);
//                     console.log(item);
//                     setShouldRender(true);
//                 } else {
//                     setShouldRender(false);
//                 }
//             }).catch((error) => {
//                 console.log("Error fetching item:", error);
//                 setShouldRender(false);
//             });

//         axios
//             .get(`http://localhost:4000/item/api/${item_id}/recommend`)
//             .then((response) => {
//                 if (response.status === 200) {
//                     const data = response.data;
//                     setRecommendations(data.recommendations);
//                     setShouldRenderRecommend(true);
//                 } else {
//                     setShouldRenderRecommend(false);
//                 }
//             }).catch((error) => {
//                 console.log("Error fetching item:", error);
//                 setShouldRender(false);
//             });

//         axios
//             .get(`http://localhost:4000/item/api/${item_id}/reviews`)
//             .then((response) => {
//                 if (response.status === 200) {
//                     const data = response.data;
//                     setRecommendations(data.reviews);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching reviews:", error);
//             });
//     }, [item_id]);

//     if (!shouldRender) {
//         return <div className="text-center text-red-500">No product found</div>;
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 flex">
//         {/* Sidebar */}
//         <div className="w-[8%] bg-gray-200">{/* Sidebar content */}</div>

//         {/* Main Content */}
//         <div className="flex-1 ml-[8%] p-6">
//             {/* Header */}
//             <header className="flex items-center justify-between mb-6">
//             <h1 className="text-2xl font-bold">Product Details</h1>
//             </header>

//             {/* Product Section */}
//             <section className="bg-white shadow-sm rounded-md p-6 mb-6 flex">
//             {/* Thumbnails */}
//             <div className="w-1/5 mr-4">
//                 {Array(5).fill(0).map((_, index) => (
//                 <img
//                     key={index}
//                     src="https://via.placeholder.com/60"
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-auto mb-2 rounded-md cursor-pointer hover:opacity-80"
//                 />
//                 ))}
//             </div>

//             {/* Main Product Image */}
//             <div className="w-2/5 mr-6">
//                 <img
//                 src="https://via.placeholder.com/300"
//                 alt="Main Product"
//                 className="w-full h-auto rounded-md"
//                 />
//             </div>

//             {/* Product Details */}
//             <div className="flex-1">
//                 <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
//                 <p className="text-sm text-gray-600 mb-2">{item.reviews_count}</p>

//                 {/* <p className="text-lg font-bold mb-2 text-green-600">$16.00<span className="line-through text-gray-500">$20.00</span> <span className="text-sm text-red-500">20% OFF</span></p> */}
//                 <p className="text-lg font-bold mb-2">
//                     {item.Discount && item.Discount.percentage > 0 ? (
//                         <>
//                         {/* Original price with line-through when there's a discount */}
//                         <span className="line-through text-gray-500">
//                             ${item.price && item.price.toFixed(2)}
//                         </span>
//                         {/* Discount info */}
//                         <span className="text-sm text-red-500 ml-2">
//                             {item.discount && item.discount.percentage}% OFF
//                         </span>
//                         {/* New price after discount */}
//                         <span className="text-lg font-bold text-green-600 ml-2">
//                             ${(item.price && item.price * (1 - item.discount.percentage / 100)).toFixed(2)}
//                         </span>
//                         </>
//                     ) : (
//                         // When there's no discount, just show the price normally
//                         <span className="text-green-600">${item.price && item.price.toFixed(2)}</span>
//                     )}
//                 </p>

//                 <p className="text-sm text-gray-600 mb-4">{item.description}</p>

//                 {/* Size Selection */}
//                 {item.sizes && item.sizes.length > 0 && (
//                     <div className="flex items-center mb-4">
//                         <span className="mr-4 font-bold">Size:</span>
//                         {item.sizes.map((size, index) => (
//                             <button
//                                 key={index}
//                                 className={`
//                                     py-2 px-4 border rounded-md mr-2 ${
//                                     size.isSelected ? "bg-gray-200 font-bold" : ""}
//                                 `}
//                             >
//                             {size.label}
//                         </button>
//                         ))}
//                     </div>
//                 )}

//                 {/* Quantity and Add to Cart */}
//                 <div className="flex items-center mb-4">
//                     <input
//                         type="number"
//                         min="1"
//                         value="1"
//                         className="form-control border rounded-md py-1 px-2 w-16 mr-4"
//                     />
//                     <button className="btn btn-primary py-2 px-6">Add to Cart</button>
//                 </div>

//                 {/* Icons */}
//                 {item.key_properties && item.key_properties.length > 0 && (
//                     <div className="flex items-center space-x-4 mt-4">
//                         {item.key_properties.map((property, index) => (
//                             <div key={index} className="flex flex-col items-center">
//                                 <span className="text-sm">{property}</span>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//                 </div>
//             </section>

//             {/* You May Also Like Section */}
//             <section className="bg-white shadow-sm rounded-md p-6">
//             <h2 className="text-lg font-bold mb-4">You May Also Like</h2>
//             <div className="grid grid-cols-5 gap-4">
//                 {recommendations.length > 0 ? (
//                     recommendations.map((product, index) => (
//                     <div
//                         key={product._id}  // Use a unique key such as product._id
//                         className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md"
//                     >
//                         <img
//                         src={product.image || "https://via.placeholder.com/100"}  // Use product image or a placeholder
//                         alt={product.name}
//                         className="w-full h-24 object-cover mb-2 rounded-md"
//                         />
//                         <h3 className="text-sm font-bold text-gray-700">{product.name}</h3>
//                         <p className="text-sm text-gray-500">
//                         ${product.price.toFixed(2)}  {/* Format the price */}
//                         </p>
//                         <button className="btn btn-outline-primary btn-sm mt-2 w-full">
//                         Add to Cart
//                         </button>
//                     </div>
//                     ))
//                 ) : (
//                     <p className="col-span-5 text-center text-gray-500">No recommended products available</p>
//                 )}
//             </div>
//             </section>
//         </div>

//             {/* View Comments Button */}
//         <div className="mt-6">
//             <button
//             onClick={toggleComments}
//             className="py-2 px-4 bg-blue-600 text-white rounded-md"
//             >
//             {showComments ? "Hide Comments" : "View Comments"}
//             </button>
//         </div>

//         {/* Comments Section */}
//         {showComments && (
//         <section className="mt-6 bg-white shadow-sm rounded-md p-6">
//           <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>
//           <div className="space-y-4">
//             {reviews && reviews.length > 0 ? (
//               reviews.map((review) => (
//                 <div key={review._id} className="flex flex-col">
//                   <p className="font-semibold">{review.user}</p>
//                   <p className="text-sm text-gray-600">{review.comment}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-600">No reviews yet.</p>
//             )}
//           </div>
//         </section>
//       )}
//     </div>);
// }

// export default ProductPage;
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import TitleBar from "../components/TitleBar";
import ChatBot from "../components/Chatbot";

const ProductPage = () => {
  const navigate = useNavigate();
  const { item_id } = useParams(); // Retrieve item_id from URL

  const [item, setItem] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shouldRender, setShouldRender] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // console.log(item_id)
  useEffect(() => {
    axios.get(`http://localhost:4000/item/api/${item_id}`)
      .then((response) => {
        if (response.status === 200) {
          setItem(response.data.item[0]);
          setShouldRender(true);
        }
      }).catch(error => setShouldRender(false));

    // axios.get(`http://localhost:4000/item/api/${item_id}/recommend`)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setRecommendations(response.data.recommendations);
    //     }
    //   });

    axios.get(`http://localhost:4000/item/api/${item_id}/reviews`)
      .then((response) => {
        if (response.status === 200) {
          setReviews(response.data.reviews);
        }
      });
  }, [item_id]);

  if (!shouldRender) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Product not found</div>
      </div>
    );
  }

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price * (1 - discount.percentage / 100);
  };

  const handleCartAdd = async (event) => {
      event.stopPropagation();
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const user = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (!token) {
          navigate('/login');
          return;
        }
        // console.log(token);
        const response = await axios.post("http://localhost:4000/mycart/api/add_item", {
          item_id: item_id,
          quantity: quantity,
        }, { 
          headers: { Authorization: `${token}`, User_Data: JSON.stringify(user)},
        });
        
        if(response.data.status === '304') {
          alert("Required quantity is not available!");
        }else if(response.data.status === '306') {
          alert("You cannot add to cart your own item!");
        }else if (response.status === 200) {
          alert("Item added to cart successfully!");
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart.");
      }
  };
  {console.log(item)}
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <TitleBar title="Item Page" />
      <ChatBot />
      <div className="max-w-7xl auto px-4 py-8 mt-20 ml-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={item.images && item.images[selectedImage] ? item.images[selectedImage].url : "https://via.placeholder.com/600"}
                className="w-full h-72 object-fit"
                alt={item.name}
              />
            </div>
            {/* <div className="grid grid-cols-5 gap-2">
              {[0,1,2,3,4].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src="https://via.placeholder.com/150"
                    className="object-cover w-full h-full"
                    alt={`Product ${idx + 1}`}
                  />
                </button>
              ))}
            </div> */}
            <div className="grid grid-cols-5 gap-2">
              {item.images
                .slice(0, item.images.length) // Ensure only available images are used
                .map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                      selectedImage === idx ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={image.url} // Use actual image URL
                      className="object-cover w-full h-full"
                      alt={`Product ${idx + 1}`}
                    />
                  </button>
                ))}
            </div>

          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
              <div className="flex items-center space-x-4">
                {item.discount ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-red-600">
                      ${calculateDiscountedPrice(item.price, item.discount)?.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${item.price?.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-red-600">
                      ({item.discount.percentage}% OFF)
                    </span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-gray-900">
                    ${item.price?.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600">{item.description}</p>
            {/* {console.log(item)} */}
            <p className="text-gray-600">Seller: {item.seller_id.first_name} {item.seller_id.last_name}</p>

            {/* Size Selector */}
            {/* {item.sizes?.length > 0 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {item.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      className="border rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-50"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )} */}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-16 text-center border-x"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div>
              <button 
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                onClick={handleCartAdd}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Enhanced Key Details */}
            {item.key_details?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.key_details.map((detail, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gray-50 rounded-lg p-2 border border-gray-200 hover:border-blue-300 transition-colors duration-200"
                    >
                      <div className="flex item-start space-x-1">
                        {/* <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div> */}
                        <p className="text-gray-700 text-md leading-relaxed">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.map((product) => (
                <div key={product._id} className="group">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.image || "https://via.placeholder.com/300"}
                      className="object-cover group-hover:opacity-75"
                      alt={product.name}
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-16">
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {showComments ? "Hide Reviews" : "Show Reviews"} ({reviews.length})
          </button>
          
          {showComments && (
            <div className="mt-6 space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">{review.user.first_name + " " + review.user.last_name}</div>
                      <div className="text-sm text-gray-500">Verified Purchase</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
