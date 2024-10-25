// src/components/CartItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <h4>{item.title}</h4>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
      <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </div>
  );
};

export default CartItem;
