import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import sideImage from "../assets/side-img.jpg";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // ✅ hook top-level pe call karo

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState("admin"); // default admin
  const [userType, setUserType] = useState("");

  const [errors, setErrors] = useState({}); // { email: "", password: "" }

  // ✅ Email validation
  const validateEmail = () => {
    let errorMsg = "";

    if (role === "user") {
      if (userType === "student" && !email.endsWith("@students.riphah.edu.pk")) {
        errorMsg =
          "Only student emails allowed (e.g., xyz@students.riphah.edu.pk)";
      } else if (userType === "faculty" && !email.endsWith("@riphah.edu.pk")) {
        errorMsg =
          "Only faculty emails allowed (e.g., abc@riphah.edu.pk)";
      }
      // Guest → koi bhi email chalega
    }

    setErrors((prev) => ({ ...prev, email: errorMsg }));
    return errorMsg === "";
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = validateEmail();
    if (!valid) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
        userType,
      });

      // Save token
      if (remember) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      // ✅ Redirect according to role (React way, no reload)
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "user") {
        navigate("/user-dashboard");
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        password: error.response?.data?.message || "Login failed",
      }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      {/* Card container */}
      <div className="flex w-[90%] md:w-[70%] lg:w-[60%] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block w-1/2">
          <img
            src={sideImage}
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center p-10">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">
              AI Multimodal Vehicle Access System
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Login to your account
            </p>

            {/* Role Selection */}
            <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
              Select Your Role
            </h2>

            <div className="flex space-x-6 justify-center mb-4">
              <button
                type="button"
                onClick={() => {
                  setRole("admin");
                  setUserType("");
                }}
                className={`px-4 py-2 rounded-lg border ${
                  role === "admin"
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-900 border-blue-900"
                } transition`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole("user");
                  setUserType("");
                }}
                className={`px-4 py-2 rounded-lg border ${
                  role === "user"
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-900 border-blue-900"
                } transition`}
              >
                User
              </button>
            </div>

            {role === "user" && (
              <>
                <h3 className="text-md font-medium text-gray-600 mb-2 text-center">
                  Are you a Student, Faculty, or Guest?
                </h3>
                <div className="flex space-x-3 justify-center mb-4">
                  {["student", "faculty", "guest"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setUserType(type)}
                      className={`px-3 py-2 rounded-lg border capitalize ${
                        userType === type
                          ? "bg-blue-900 text-white"
                          : "bg-white text-blue-900 border-blue-900"
                      } transition`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-blue-500"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-500"
                    }`}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                LOGIN
              </button>
            </form>

            {/* Signup link */}
            <p className="text-sm text-center mt-6 text-gray-500">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                SIGN UP
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
