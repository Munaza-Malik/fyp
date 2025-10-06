import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import sideImage from "../assets/side-img.jpg";
import logo from "../assets/logo.png";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [role, setRole] = useState("admin"); // default admin
  const [userType, setUserType] = useState(""); // only if role = user
  const [errors, setErrors] = useState({});

  // ✅ Email Validation (Student / Faculty / Guest Rules)
  const validateEmail = () => {
    let errorMsg = "";

    if (role === "user") {
      if (userType === "student") {
        if (!email.endsWith("@students.riphah.edu.pk")) {
          errorMsg =
            "Only student emails allowed (e.g., xyz@students.riphah.edu.pk)";
        }
      } else if (userType === "faculty") {
        if (!email.endsWith("@riphah.edu.pk")) {
          errorMsg =
            "Only faculty emails allowed (e.g., abc@riphah.edu.pk)";
        }
      } else if (userType === "guest") {
        if (
          email.endsWith("@students.riphah.edu.pk") ||
          email.endsWith("@riphah.edu.pk")
        ) {
          errorMsg =
            "Guests cannot use Student/Faculty emails. Please use a personal email.";
        }
      }
    }

    setErrors((prev) => ({ ...prev, email: errorMsg }));
    return errorMsg === "";
  };

  // ✅ Strong Password Validation
  const validatePassword = () => {
    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 chars, include 1 uppercase, 1 number, and 1 special character",
      }));
      return false;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        password: "Passwords do not match!",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validEmail = validateEmail();
    const validPassword = validatePassword();
    if (!validEmail || !validPassword) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
        userType,
      });

      // ✅ Success → Redirect
      setErrors({});
      console.log("Signup Success:", res.data);
      window.location.href = "/login";
    } catch (error) {
      // ✅ Catch duplicate email or server validation errors
      setErrors((prev) => ({
        ...prev,
        email:
          error.response?.data?.message ||
          "Signup failed. Please try again.",
      }));
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      {/* Card Container */}
      <div className="flex w-[90%] md:w-[70%] lg:w-[60%] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side Image */}
        <div className="hidden md:block w-1/2">
          <img
            src={sideImage}
            alt="Signup Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
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
              Create your account
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
              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Email */}
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

              {/* Password */}
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
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
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
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  >
                    {showConfirmPassword ? (
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

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                SIGN UP
              </button>
            </form>

            {/* Login Link */}
            <p className="text-sm text-center mt-6 text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                LOGIN
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
