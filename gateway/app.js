const express = require("express");
const proxy = require("express-http-proxy");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { verifyToken } = require("./middlewares/authMiddleware");

const app = express();
const PORT = 4000; // Gateway port

app.use(cors()); // Enable CORS globally

// Middleware to parse JSON requests

app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data




app.use("/api/users", proxy("http://localhost:4001"));
app.use("/api/blogs", verifyToken, proxy("http://localhost:4002"));
app.use("/api/comments", verifyToken, proxy("http://localhost:4003"));



app.get("/", (req, res) => {
  res.send("API Gateway is running!");
});

// Start Gateway Service
app.listen(PORT, () => console.log(`Gateway service running on port ${PORT}`));
