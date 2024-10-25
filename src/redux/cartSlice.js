// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (itemExists) {
        // If item already exists, increase quantity
        itemExists.quantity++;
      } else {
        // Otherwise, add the item to the cart with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
