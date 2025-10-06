const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String, required: true },
  plateNumber: { type: String, required: true, unique: true },
  vehicleType: { type: String, enum: ["car", "bike", "van", "other"], required: true },
  brand: { type: String },
  model: { type: String },
  color: { type: String },
  documents: [{ type: String }], // file paths
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
