// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importing configurations and models from database.js
const { connectDB } = require('./database.js');

// Importing authentication strategies from auth.js
require('./auth.js');

// Importing API routes from api.js
const apiRoutes = require('./api.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to MongoDB
connectDB();

// Use API routes
app.use('/api', apiRoutes);

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Car Auction Website API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});