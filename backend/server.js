require("dotenv").config();
console.log("Loaded SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY); // Debug



const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const vehicleRoutes = require("./routes/vehicleRoutes");
// require("dotenv").config();
//require("dotenv").config({ path: "./.env" });
//console.log("✅ SendGrid key prefix:", process.env.SENDGRID_API_KEY?.slice(0, 3) || "NOT FOUND");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

console.log("Auth routes loaded at /api/auth");



// Default route
app.get("/", (req, res) => {
  res.send("🚀 Backend server is running...");
});


app.use("/api/vehicles", vehicleRoutes);

// Static folder for uploaded files
app.use("/uploads", express.static("uploads"));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
