const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // Ensure productId is required
    ref: 'Product' // Reference to Product model
  },
  quantity: {
    type: Number,
    required: true,
    min: 1 // Ensure quantity is at least 1
  }
});

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Make username required
  },
  items: [cartItemSchema], // Array of cart items
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
