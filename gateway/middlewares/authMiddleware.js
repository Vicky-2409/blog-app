const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        
        req.user = decoded; // Attach decoded user info to request object
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = {verifyToken}
