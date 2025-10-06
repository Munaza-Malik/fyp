const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { registerVehicle, getMyVehicles } = require("../controllers/vehicleController");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Register vehicle
router.post("/register", authMiddleware, upload.array("documents", 5), registerVehicle);

// Get my vehicles
router.get("/my-vehicles", authMiddleware, getMyVehicles);

module.exports = router;
