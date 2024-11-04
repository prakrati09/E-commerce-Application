// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import { useAuth } from '../AuthContext'; // Import useAuth
import './Header.css';

const Header = () => {
  const { username, logout } = useAuth(); // Use the auth context
  const cartItems = useSelector(selectCartItems);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate('/');
  };

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
          {username ? (
            <>
<li style={{ color: 'white' }}>Hello, {username}</li>
<li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/auth">Login / Register</Link></li>
          )}
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
