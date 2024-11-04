const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// POST /cart: Add a product to the shopping cart
router.post('/', authMiddleware, async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const username = req.user.username; 

    const cart = await Cart.findOneAndUpdate(
      { username },
      { $addToSet: { items: { productId, quantity } } },
      { new: true, upsert: true } 
    );

    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    next(error); 
  }
});

// PUT /cart/:productId: Update the quantity of a product in the cart
router.put('/:productId', authMiddleware, async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!productId || quantity === undefined) {
    return res.status(400).json({ message: 'Product ID and quantity are required.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const username = req.user.username;

    const cart = await Cart.findOneAndUpdate(
      { username, 'items.productId': productId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: 'Product not found in the cart.' });
    }

    res.json({ message: 'Cart item quantity updated', cart });
  } catch (error) {
    next(error);
  }
});

// DELETE /cart/:productId: Remove a product from the cart
router.delete('/:productId', authMiddleware, async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required.' });
  }

  try {
    const username = req.user.username;

    const cart = await Cart.findOneAndUpdate(
      { username },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: 'Product not found in the cart.' });
    }

    res.json({ message: 'Product removed from cart', cart });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
