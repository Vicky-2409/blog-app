const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/userdb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use(userRoutes);

// Start Server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
