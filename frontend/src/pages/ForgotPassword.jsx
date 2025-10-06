import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import sideImage from "../assets/side-img.jpg";
import logo from "../assets/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      setMessage(res.data.message || "OTP sent to your email!");
      // ✅ Redirect to VerifyOtp page with email
      navigate("/verify-otp", { state: { email } });

    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP");
      console.error("Forgot Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="flex w-[90%] md:w-[70%] lg:w-[60%] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block w-1/2">
          <img src={sideImage} alt="Forgot Password Illustration" className="h-full w-full object-cover" />
        </div>

        {/* Right Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center p-10">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
            </div>

            <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">
              Forgot Password?
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Enter your email to receive OTP.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>

            {message && (
              <p className="mt-4 text-sm text-center text-gray-600">{message}</p>
            )}

            <p className="text-sm text-center mt-6 text-gray-500">
              Remembered your password?{" "}
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
                LOGIN HERE
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
