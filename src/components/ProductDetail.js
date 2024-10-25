// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice'; 
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch(); // To dispatch the addToCart action

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product details');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem(product)); // Add product to cart
    setAddedToCart(true); // Show confirmation message
    setTimeout(() => setAddedToCart(false), 2000); // Hide after 2 seconds
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Rating:</strong> {product.rating} / 5</p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
      {addedToCart && <p className="cart-confirmation">Item added to cart!</p>}
    </div>
  );
};

export default ProductDetail;
