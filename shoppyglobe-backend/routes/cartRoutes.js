// routes/cartRoutes.js
const express = require('express');
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const router = express.Router();

router.get('/:userId', getCart);
router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);

module.exports = router;
