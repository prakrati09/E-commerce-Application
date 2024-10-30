// src/components/ProductItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="product-item">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="product-actions">
        {/* Add to Cart button calls the addToCart function */}
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <Link to={`/product/${product.id}`}>
          <button className="view-button">View</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;