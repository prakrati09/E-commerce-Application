// In your userRoutes.js or equivalent file

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController'); // Ensure you have this controller

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
