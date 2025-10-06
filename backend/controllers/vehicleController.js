// controllers/vehicleController.js
const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle");

/**
 * Register a vehicle
 */
exports.registerVehicle = async (req, res) => {
  try {
    const { phone, plateNumber, vehicleType, brand, model, color } = req.body;

    if (!phone || !plateNumber || !vehicleType) {
      return res.status(400).json({ message: "phone, plateNumber and vehicleType are required." });
    }

    const normalizedPlate = plateNumber.trim().toUpperCase();
    const userId = req.user.id; // JWT me id string hai, mongoose will handle conversion


    // 🔹 Check how many vehicles this user already has
    const count = await Vehicle.countDocuments({ user: userId });
    if (count >= 4) {
      return res.status(400).json({ message: "You can only register up to 4 vehicles." });
    }

    // 🔹 Check if plate number is already registered
    const existingPlate = await Vehicle.findOne({ plateNumber: normalizedPlate });
    if (existingPlate) {
      return res.status(400).json({ message: "This plate number is already registered." });
    }

    // 🔹 Files from multer
    const documents = req.files?.map((f) => f.filename) || [];

    // 🔹 Create vehicle
    const newVehicle = new Vehicle({
      user: userId,
      phone,
      plateNumber: normalizedPlate,
      vehicleType,
      brand,
      model,
      color,
      documents,
    });

    await newVehicle.save();

    return res.status(201).json({
      message: "Vehicle registered successfully",
      vehicle: newVehicle,
    });
  } catch (err) {
    console.error("Vehicle registration error:", err);

    if (err.code === 11000 && err.keyPattern?.plateNumber) {
      return res.status(400).json({ message: "This plate number is already registered." });
    }

    return res.status(500).json({ message: "Vehicle registration failed", error: err.message });
  }
};

/**
 * Get vehicles for logged-in user
 */
exports.getMyVehicles = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicles = await Vehicle.find({ user: userId }).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ message: "Error fetching vehicles" });
  }
};
