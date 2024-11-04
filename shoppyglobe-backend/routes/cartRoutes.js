const express = require('express');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a product to the cart
router.post('/', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(item => item.productId === productId);
      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ productId, quantity });
      }
    } else {
      // Create new cart if none exists
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error });
  }
});

// Update product quantity in cart
router.put('/', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

// Remove a product from the cart
router.delete('/', authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error });
  }
});

// Get cart items
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart items', error });
  }
});

module.exports = router;
