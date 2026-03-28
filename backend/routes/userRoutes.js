const express = require("express");
const router = express.Router();

// Example: Register route
router.post("/register", (req, res) => {
  res.json({ message: "User registered successfully" });
});

// Example: Login route
router.post("/login", (req, res) => {
  res.json({ message: "User logged in successfully" });
});

module.exports = router;