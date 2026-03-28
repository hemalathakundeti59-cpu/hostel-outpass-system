const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Load .env from root folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

// -----------------------------
// Middleware
// -----------------------------
app.use(cors());
app.use(express.json());

// -----------------------------
// API Routes
// -----------------------------
const userRoutes = require("./routes/userRoutes");
const outpassRoutes = require("./routes/outpassRoutes");

app.use("/api/users", userRoutes);
app.use("/api/outpass", outpassRoutes);

// -----------------------------
// Serve React frontend
// -----------------------------
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// Catch-all for React routes (except API)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// -----------------------------
// MongoDB connection
// -----------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// -----------------------------
// Start server
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));