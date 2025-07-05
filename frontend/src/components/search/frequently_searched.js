import React from 'react';

const FrequentlySearched = () => {
  const items = ['Coffee Machines', 'Espresso', 'Drip Coffee', 'Coffee Pods', 'Grinders'];

  return (
    <div className="frequently-searched py-3 px-2">
      <h6 className="mb-3">Frequently Searched</h6>
      <div className="d-flex gap-3 overflow-auto">
        {items.map((item, idx) => (
          <div key={idx} className="px-3 py-2 bg-light rounded">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlySearched;
