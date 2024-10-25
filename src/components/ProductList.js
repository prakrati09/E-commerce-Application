// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import useFetch from '../hooks/useFetch';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
  const { data: products, loading, error } = useFetch('https://dummyjson.com/products');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const filtered = products.filter(product =>
        product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="product-list">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      {loading && <p>Loading products...</p>}
      {error && <p>Error fetching products: {error.message}</p>}
      <div className="products">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
