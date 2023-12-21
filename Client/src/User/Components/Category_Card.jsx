import React from 'react';
import { Link } from 'react-router-dom';

function Category_Card({ categories, handleClick }) {
  return (
    <>
      <Link to="#" className="text-decoration-none">
        <div className="list-group">
          <h6 className="list-group-item list-group-item-action" onClick={() => handleClick(categories)}>
            {categories.toUpperCase().replace("-", " ")}
          </h6> 
        </div>
      </Link>
    </>
  );
}

export default Category_Card;
