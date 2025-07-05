import React from 'react';
import { Star } from 'lucide-react';

const StarRatingDisplay = ({ reviews = [] }) => {
  // Calculate average rating
  const averageRating = reviews.length 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

    console.log(reviews, averageRating);
  // Round to nearest decimal for display
  const displayRating = Number(averageRating.toFixed(1));

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(averageRating)
                ? 'text-yellow-400 fill-yellow-400'
                : index < averageRating
                ? 'text-yellow-400 fill-yellow-400 opacity-50'
                : 'text-gray-300 fill-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-600">
        ({displayRating}) • {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
      </span>
    </div>
  );
};

export default StarRatingDisplay;