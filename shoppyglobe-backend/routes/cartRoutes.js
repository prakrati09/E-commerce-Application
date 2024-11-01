// routes/cartRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addToCart, getCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', authMiddleware, addToCart); // Protected route
router.get('/', authMiddleware, getCart); // Protected route

module.exports = router;
