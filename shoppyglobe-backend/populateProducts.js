const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./models/Product'); // Adjust the path as necessary

const MONGODB_URI = 'mongodb://localhost:27017/shoppyglobeDB'; // Replace with your MongoDB URI

const populateProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Fetch products from the API
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;
    console.log('Fetched products:', products.length);

    // Check and filter products
    const validProducts = products.filter(product =>
      product.title && product.price && product.description && product.stock
    );

    console.log('Valid products after filtering:', validProducts.length);

    if (validProducts.length === 0) {
      console.error('No valid products found for insertion.');
      return;
    }

    // Attempt to insert into MongoDB
    const insertResult = await Product.insertMany(validProducts, { ordered: false });
    console.log(`Inserted ${insertResult.length} products into the database.`);

    // Verify if products are in the database
    const count = await Product.countDocuments();
    console.log(`Total products in the database after insertion: ${count}`);
  } catch (error) {
    console.error('Error in population script:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

populateProducts();
