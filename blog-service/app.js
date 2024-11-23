const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogRoutes');


const app = express();


// Middleware
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/blogdb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use(blogRoutes);




// Start Server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Blog service running on port ${PORT}`));
