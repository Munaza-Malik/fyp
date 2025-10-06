const express = require("express");
const {
  signup,
  login,
  getProfile,
  sendOtp,
  verifyOtp
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// OTP Flow
router.post("/forgot-password", sendOtp);
router.post("/verify-otp", verifyOtp);

// Profile
router.get("/profile", authMiddleware, getProfile);

// Dashboard
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, you are logged in!` });
});

module.exports = router;
