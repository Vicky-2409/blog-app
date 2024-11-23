const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentsByBlogId,
    getCommentById,
    updateComment,
    deleteComment,
} = require('../controllers/commentController');

// **Routes**
router.post('/', createComment); // Create a new comment
router.get('/blog/:blogId', getCommentsByBlogId); // Get all comments for a specific blog
router.get('/:id', getCommentById); // Get comment by ID
router.put('/:id', updateComment); // Update comment by ID
router.delete('/:id', deleteComment); // Delete comment by ID

module.exports = router;
