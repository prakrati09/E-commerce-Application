// routes/productRoutes.js
const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // For admin only

module.exports = router;
