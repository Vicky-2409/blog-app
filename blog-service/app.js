const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogRoutes');
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
app.use(blogRoutes);




// Start Server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Blog service running on port ${PORT}`));
