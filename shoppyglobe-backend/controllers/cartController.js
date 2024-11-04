const Cart = require('../models/Cart'); // Import Cart model

// Add item to cart or update quantity if item already exists
exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const username = req.user.username; // Retrieve username from authenticated user

  try {
    // Find existing cart for the user
    let cart = await Cart.findOne({ username });

    if (cart) {
      // Check if item already exists in cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // If it exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If it doesn't exist, add new item to cart
        cart.items.push({ productId, quantity });
      }
    } else {
      // If no cart exists, create a new one
      cart = new Cart({
        username,
        items: [{ productId, quantity }],
      });
    }

    // Save updated cart to MongoDB
    await cart.save();
    res.status(201).json(cart); // Return updated cart to client
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// Get items in the user's cart
exports.getCartItems = async (req, res) => {
  const username = req.user.username; // Retrieve username from authenticated user

  try {
    const cart = await Cart.findOne({ username }).populate('items.productId');
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart items', error });
  }
};

// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
  const username = req.user.username; // Retrieve username from authenticated user
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ username });
    if (cart) {
      // Filter out item to remove from cart
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);

      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};
