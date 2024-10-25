// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import './Header.css';

const Header = () => {
  const cartItems = useSelector(selectCartItems);
  
  // Calculate total quantity of items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">ShoppyGlobe</Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
        </ul>
        <div className="cart-icon">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
