// populateProducts.js
const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./models/Product'); // Adjust the path as necessary

const MONGODB_URI = 'mongodb://localhost:27017/shoppyglobeDB'; // Replace with your MongoDB URI

const populateProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);

    // Fetch products from the API
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;

    // Log products to verify
    console.log('Fetched products:', products);

    // Filter products to ensure they match the schema
    const validProducts = products.filter(product => 
      product.name && product.price && product.description && product.stock
    );

    // Save each valid product to MongoDB
    await Product.insertMany(validProducts);
    console.log('Products added to the database successfully!');
  } catch (error) {
    console.error('Error populating products:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

populateProducts();
