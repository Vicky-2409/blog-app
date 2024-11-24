const express = require("express");
const proxy = require("express-http-proxy");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { verifyToken } = require("./middlewares/authMiddleware");
require('dotenv').config();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const BLOG_SERVICE_URL = process.env.BLOG_SERVICE_URL;
const COMMENT_SERVICE_URL = process.env.COMMENT_SERVICE_URL;
const app = express();
const PORT = 4000; // Gateway port

app.use(cors()); // Enable CORS globally

// Middleware to parse JSON requests

app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data




app.use("/api/users", proxy(USER_SERVICE_URL));
app.use("/api/blogs", verifyToken, proxy(BLOG_SERVICE_URL ));
app.use("/api/comments", verifyToken, proxy(COMMENT_SERVICE_URL));



app.get("/", (req, res) => {
  res.send("API Gateway is running!");
});

// Start Gateway Service
app.listen(PORT, () => console.log(`Gateway service running on port ${PORT}`));
