import React, { useState } from 'react';

const FiltersSidebar = () => {
  const [showMore, setShowMore] = useState(false);
  const filters = {
    PRODUCT: ['Espresso Coffee Machine', 'Coffee Grinder', 'Drip Filter Coffee Machine', 'Coffee Machine', 'Accessories'],
    PRODUCTS: ['Coffee', '45 cm compact', 'Coffee Pods', 'Milk Frothers', 'Replacement Parts'],
  };

  return (
    <div className="filters-sidebar p-3" style={{ width: '70%', overflowY: showMore ? 'auto' : 'hidden', maxHeight: '500px', borderRight: '1px solid #ddd' }}>
      {Object.entries(filters).map(([category, options], index) => (
        <div key={index} className="mb-4">
          <h6>{category}</h6>
          {options.slice(0, showMore ? options.length : 3).map((option, idx) => (
            <div key={idx} className="form-check">
              <input className="form-check-input" type="checkbox" id={`${category}-${idx}`} />
              <label className="form-check-label" htmlFor={`${category}-${idx}`}>{option}</label>
            </div>
          ))}
          {options.length > 3 && (
            <button className="btn btn-link p-0 mt-2" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      ))}
      <div>
        <h6>PRICE</h6>
        <input type="range" className="form-range" min="0" max="5000" />
        <div className="d-flex justify-content-between">
          <span>$0</span>
          <span>$5000</span>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
