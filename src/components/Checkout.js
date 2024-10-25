// src/components/Checkout.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import './Checkout.css';


const Checkout = () => {
  const cartItems = useSelector(selectCartItems);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    // Handle checkout logic here (e.g., API call to process payment)
    alert('Checkout successful! Thank you for your purchase.');
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div>
          <h3>Your Cart Items:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total: ${calculateTotal()}</h4>
          <button onClick={handleCheckout} className="checkout-btn">Complete Purchase</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
