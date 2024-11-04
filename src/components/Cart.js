import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeItem, updateQuantity } from '../redux/cartSlice';
import './Cart.css';

const CART_API_URL = 'http://localhost:5000/cart';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const updateCartInDatabase = async (id, quantity) => {
    try {
      const response = await fetch(`${CART_API_URL}`, {
        method: quantity > 0 ? 'PUT' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart in database');
      }
    } catch (error) {
      console.error('Error updating cart in database:', error);
      alert('There was an issue updating your cart. Please try again.');
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
    updateCartInDatabase(id, 0); // Quantity 0 to indicate deletion
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Ensure quantity is always at least 1
    dispatch(updateQuantity({ id, quantity }));
    updateCartInDatabase(id, quantity);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <div className="cart-item-quantity">
                <label>Quantity: </label>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                />
              </div>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
