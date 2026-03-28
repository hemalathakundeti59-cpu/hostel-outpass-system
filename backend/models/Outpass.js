const mongoose = require("mongoose");

const outpassSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  reason: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  status: { type: String, default: "pending" } // pending, approved, rejected
}, { timestamps: true });

module.exports = mongoose.model("Outpass", outpassSchema);