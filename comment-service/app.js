const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use(commentRoutes);

// Start Server
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`Comment service running on port ${PORT}`));
