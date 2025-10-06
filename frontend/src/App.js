import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard"; 
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard"; 
import UserHome from "./pages/UserHome";
import VerifyOtp from "./pages/VerifyOtp";

// 👇 New pages import
import VehicleRegistration from "./pages/VehicleRegistration";
import Logs from "./pages/Logs";
import Reports from "./pages/Reports";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

function App() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* ✅ Ab "/" par MainPage dikhega */}
        <Route path="/" element={<Home />} />

        {/* ✅ Auth page */}
        <Route path="/auth" element={<Auth />} />

        {/* ✅ Login / Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* ✅ Dashboards */}
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* ✅ Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* ✅ Sidebar Pages */}
        <Route path="/vehicle-registration" element={<VehicleRegistration />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

      </Routes>
    </Router>
  );
}

export default App;
