import React from 'react';
import ProductCard from './product_card';

const ProductGrid = ({ products }) => {
  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">No products found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 w-[100%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[100%] h-[100%]">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.name,
              image: product.image || '/api/placeholder/400/300',
              description: product.description,
              inStock: product.inStock,
              rating: product.rating,
              price: product.price,
              discount: product.discount,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
