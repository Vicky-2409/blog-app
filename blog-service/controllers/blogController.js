const Blog = require('../models/Blog'); // Import Blog model
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const gatewayUrl = process.env.GATEWAY_URL

// **Create a New Blog**
const createBlog = async (req, res) => {

    const { title, content, author } = req.body;

    // Validate input data
    if (!title || !content || !author) {
        return res.status(400).json({ message: 'Title, content, and author are required.' });
    }

    try {
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// **Get All Blogs**
const getAllBlogs = async (req, res) => {
    try {       
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// **Get Blog by ID**


const getBlogById = async (req, res) => {
    const id = req.params.id


    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Blog ID format' });
    }

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




const getBlogfull = async (req, res) => {
    const blogId = req.params.id;
    const token = req.headers.authorization; // Extract Bearer token from client request
    
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
    
    try {
        // Fetch the blog post (include token in headers for API Gateway)

        const blogResponse = await axios.get(
            `${gatewayUrl}/api/blogs/${blogId}`,
            { headers: { Authorization: token } } // Forward the token
        );
        const blog = blogResponse.data;

        // Use the author directly
        const author = blog.author;

        // Fetch comments (include token in headers)
        const commentsResponse = await axios.get(
            `${gatewayUrl}/api/comments/blog/${blogId}`,
            { headers: { Authorization: token } }
        );
        const comments = commentsResponse.data;

        // Add enriched data (use the author's name directly)
        const enrichedComments = comments.map((comment) => ({
            ...comment,
            commenter: comment.author, // Directly use the comment's author info
        }));

        // Send the aggregated response
        res.status(200).json({ ...blog, author, comments: enrichedComments });
    } catch (err) {
        console.error(`Error fetching data for blogId ${blogId}:`, err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    console.log(title, content, author);
    

    // Validate input data
    if (!title || !content || !author) {
        return res.status(400).json({ message: 'Title, content, and author are required.' });
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// **Delete Blog by ID**
const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogfull
};
