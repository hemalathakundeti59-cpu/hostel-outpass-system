const express = require("express");
const router = express.Router();
const Outpass = require("../models/Outpass");

// -----------------------------
// Create / Apply Outpass
// -----------------------------
router.post("/apply", async (req, res) => {
  try {
    const newOutpass = new Outpass(req.body);
    await newOutpass.save();
    res.status(201).json({ message: "Outpass applied successfully", outpass: newOutpass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Get all Outpasses
// -----------------------------
router.get("/", async (req, res) => {
  try {
    const outpasses = await Outpass.find().sort({ createdAt: -1 });
    res.status(200).json(outpasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Get Outpass by ID
// -----------------------------
router.get("/:id", async (req, res) => {
  try {
    const outpass = await Outpass.findById(req.params.id);
    if (!outpass) return res.status(404).json({ message: "Outpass not found" });
    res.status(200).json(outpass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Update Outpass status
// -----------------------------
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // expected: "approved" or "rejected"
    const outpass = await Outpass.findById(req.params.id);
    if (!outpass) return res.status(404).json({ message: "Outpass not found" });

    outpass.status = status;
    await outpass.save();
    res.status(200).json({ message: "Status updated", outpass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Delete Outpass
// -----------------------------
router.delete("/:id", async (req, res) => {
  try {
    const outpass = await Outpass.findByIdAndDelete(req.params.id);
    if (!outpass) return res.status(404).json({ message: "Outpass not found" });
    res.status(200).json({ message: "Outpass deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;