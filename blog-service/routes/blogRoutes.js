const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogfull
} = require("../controllers/blogController");

// **Routes**
router.post("/", createBlog); // Create a new blog
router.get("/", getAllBlogs); // Get all blogs
router.get("/:id", getBlogById); // Get blog by ID
router.get("/:id/full", getBlogfull); // Get blog by ID
router.put("/:id", updateBlog); // Update blog by ID
router.delete("/:id", deleteBlog); // Delete blog by ID

module.exports = router;
