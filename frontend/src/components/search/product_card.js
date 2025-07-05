// import { useState } from 'react';
// import { Star, ShoppingCart } from 'lucide-react';

// const ProductCard = () => {
//   const product = {
//     id: 1,
//     name: "Professional Coffee Maker",
//     image: "/api/placeholder/400/300",
//     description: "Premium coffee maker with advanced brewing technology. Features multiple brewing modes, temperature control, and a built-in grinder for the perfect cup every time. Includes a 2-year warranty.",
//     inStock: true,
//     rating: 4.5,
//     price: 299.99,
//     discount: {
//       percentage: 20,
//       validUntil: "2025-12-31"
//     }
//   };

//   const isDiscountValid = new Date(product.discount?.validUntil) > new Date();
//   const discountedPrice = isDiscountValid
//     ? product.price - (product.price * (product.discount.percentage / 100))
//     : product.price;

//   const renderStars = () => {
//     const stars = [];
//     const fullStars = Math.floor(product.rating);
//     const hasHalfStar = product.rating % 1 !== 0;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(
//           <Star 
//             key={i} 
//             className="w-5 h-5 text-yellow-400 fill-yellow-400"
//           />
//         );
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative">
//             <Star className="w-5 h-5 text-gray-300 fill-gray-300" />
//             <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
//               <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(
//           <Star 
//             key={i} 
//             className="w-5 h-5 text-gray-300 fill-gray-300"
//           />
//         );
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className="w-80 bg-white rounded-lg overflow-hidden relative
//       transform transition-all duration-300 ease-in-out
//       hover:shadow-xl hover:-translate-y-1
//       hover:scale-[1.02]">
//       {/* Stock Status Badge */}
//       <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs 
//         font-medium text-white shadow-md z-10
//         transition-all duration-300 ease-in-out
//         hover:scale-110 hover:shadow-lg
//         ${product.inStock 
//           ? 'bg-green-500 hover:bg-green-600' 
//           : 'bg-red-500 hover:bg-red-600'}`}>
//         {product.inStock ? 'In Stock' : 'Out of Stock'}
//       </div>

//       {/* Product Image Container */}
//       <div className="relative overflow-hidden group">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-48 object-cover
//             transition-transform duration-300 ease-in-out
//             group-hover:scale-110"
//         />
//         {/* Optional overlay on hover */}
//         <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10
//           transition-opacity duration-300 ease-in-out">
//         </div>
//       </div>

//       {/* Product Details */}
//       <div className="p-4 space-y-4">
//         {/* Product Name */}
//         <h3 className="text-xl font-semibold text-center text-gray-800
//           transition-colors duration-300 ease-in-out
//           group-hover:text-gray-900">
//           {product.name}
//         </h3>

//         {/* Product Description */}
//         <p className="text-gray-600 text-sm line-clamp-3">
//           {product.description}
//         </p>

//         {/* Rating */}
//         <div className="flex justify-center gap-1">
//           {renderStars()}
//           <span className="text-sm text-gray-600 ml-2">
//             ({product.rating})
//           </span>
//         </div>

//         {/* Price Section */}
//         <div className="flex items-center justify-center gap-4">
//           {isDiscountValid ? (
//             <>
//               <span className="text-gray-400 line-through text-sm">
//                 ${product.price.toFixed(2)}
//               </span>
//               <span className="text-red-500 font-bold text-2xl">
//                 ${discountedPrice.toFixed(2)}
//               </span>
//               <span className="text-green-500 text-sm">
//                 -{product.discount.percentage}%
//               </span>
//             </>
//           ) : (
//             <span className="text-gray-800 font-bold text-2xl">
//               ${product.price.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* Add to Cart Button */}
//         <button
//           className={`w-full py-2 px-4 rounded-md text-white font-medium 
//             transform transition-all duration-300 ease-in-out
//             flex items-center justify-center gap-2
//             hover:shadow-lg hover:scale-[1.02]
//             active:scale-95
//             ${product.inStock 
//               ? 'bg-blue-600 hover:bg-blue-700' 
//               : 'bg-gray-400 cursor-not-allowed'}`}
//           disabled={!product.inStock}
//         >
//           <ShoppingCart className="w-5 h-5 transition-transform duration-300 
//             group-hover:rotate-12" />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const isDiscountValid = product.discount?.validUntil 
    ? new Date(product.discount.validUntil) > new Date()
    : false;
    
  const discountedPrice = isDiscountValid
    ? product.price - (product.price * (product.discount.percentage / 100))
    : product.price;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star 
            key={i} 
            className="w-5 h-5 text-yellow-400 fill-yellow-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-5 h-5 text-gray-300 fill-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star 
            key={i} 
            className="w-5 h-5 text-gray-300 fill-gray-300"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden relative
    transform transition-all duration-300 ease-in-out
    hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
    w-[100%] h-[90%]">
      {/* Stock Status Badge */}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs 
        font-medium text-white shadow-md z-10
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-lg
        ${product.inStock 
          ? 'bg-green-500 hover:bg-green-600' 
          : 'bg-red-500 hover:bg-red-600'}`}>
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </div>

      {/* Product Image Container */}
      <div className="relative overflow-hidden group w-full h-[70%]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover
            transition-transform duration-300 ease-in-out
            group-hover:scale-110"
        />
        {/* Optional overlay on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10
          transition-opacity duration-300 ease-in-out">
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 h-[30%] flex flex-col justify-center">
        {/* Product Name */}
        <h3 className="text-xl font-semibold text-center text-gray-800
          transition-colors duration-300 ease-in-out
          group-hover:text-gray-900">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex justify-center gap-1">
          {renderStars()}
          <span className="text-sm text-gray-600 ml-2">
            ({product.rating})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-center gap-4">
          {isDiscountValid ? (
            <>
              <span className="text-gray-400 line-through text-sm">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-red-500 font-bold text-2xl">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-green-500 text-sm">
                -{product.discount.percentage}%
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-bold text-2xl">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
            transform transition-all duration-300 ease-in-out
            flex items-center justify-center gap-2
            hover:shadow-lg hover:scale-[1.02]
            active:scale-95
            ${product.inStock 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-5 h-5 transition-transform duration-300 
            group-hover:rotate-12" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;