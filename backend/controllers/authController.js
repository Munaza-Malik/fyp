const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail"); // ✅ SendGrid utility

// ================== SIGNUP ==================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, userType } = req.body;

    // Email validation based on role
    if (role === "user") {
      if (userType === "student" && !email.endsWith("@students.riphah.edu.pk")) {
        return res.status(400).json({ message: "Student email must end with @students.riphah.edu.pk" });
      } else if (userType === "faculty" && !email.endsWith("@riphah.edu.pk")) {
        return res.status(400).json({ message: "Faculty email must end with @riphah.edu.pk" });
      }
      // guest → no restriction
    }

    // Check if already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      userType: role === "admin" ? null : userType,
    });
    await user.save();

    res.json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email, password, role, userType, remember } = req.body;

    // Find user with correct role + type
    const query = { email, role };
    if (role === "user") query.userType = userType;

    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, userType: user.userType },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: remember ? "7d" : "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ================== OTP STORE ==================
const otpStore = {}; // memory store (production: Redis/DB)

// ================== SEND OTP ==================
exports.sendOtp = async (req, res) => {
  try {
    // ✅ Debugging logs
    console.log("Request body:", req.body);

    const { email } = req.body;

    const user = await User.findOne({ email });
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 min

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Send OTP error:", err.response?.body || err);
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
};



// ================== VERIFY OTP + RESET PASSWORD ==================
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const record = otpStore[email];
    if (!record || record.otp !== otp || Date.now() > record.expires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    delete otpStore[email]; // clear OTP
    res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Error resetting password", error: err.message });
  }
};

// ================== GET PROFILE ==================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};
