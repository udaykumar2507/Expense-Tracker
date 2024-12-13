const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expenseRoutes');

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse JSON bodies and handle CORS
app.use(cors({ 
  origin: "http://localhost:3000", // Allow requests only from your React app
  methods: "GET,POST,DELETE", // Specify allowed methods
  credentials: true // If you're using cookies or authentication headers
}));// Adjust to your frontend URL
// Allow cross-origin requests (useful during development)
app.use(express.json());
// Use expense routes
app.use('/api/expenses', expenseRoutes);

// Connect to MongoDB using URI from .env file
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
