const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Define routes and map them to controller methods
router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;
