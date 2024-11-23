const Comment = require('../models/Comment'); // Import Comment model

// **Create a New Comment**
const   createComment = async (req, res) => {
    const { blogId, author, content } = req.body;

    try {
        const newComment = new Comment({ blogId, author, content });
        await newComment.save();

        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (err) {
        console.error('Error creating comment:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// **Get Comments by Blog ID**
const getCommentsByBlogId = async (req, res) => {
    const { blogId } = req.params;

    try {
        const comments = await Comment.find({ blogId });
        res.status(200).json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// **Get Comment by ID**
const getCommentById = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (err) {
        console.error('Error fetching comment:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// **Update Comment by ID**
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    } catch (err) {
        console.error('Error updating comment:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// **Delete Comment by ID**
const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createComment,
    getCommentsByBlogId,
    getCommentById,
    updateComment,
    deleteComment,
};
