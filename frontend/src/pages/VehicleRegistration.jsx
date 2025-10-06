import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import navigation hook

export default function VehicleRegistration() {
  const navigate = useNavigate(); // ✅ navigation instance

  const [formData, setFormData] = useState({
    role: "",
    userType: "",
    name: "",
    email: "",
    phone: "",
    plateNumber: "",
    vehicleType: "",
    brand: "",
    model: "",
    color: "",
    documents: [], // ✅ multiple files array
  });

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { role, name, email, userType } = res.data;
        setFormData((prev) => ({
          ...prev,
          role,
          userType,
          name,
          email,
        }));
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "documents") {
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)], // ✅ append instead of replace
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  // ✅ Handle Submit (with backend API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const phoneRegex = /^(\+92|0)?3\d{9}$/; // Pakistani mobile number
    const plateRegex = /^[A-Z]{2,3}-\d{3,4}$/; // Example: ABC-123

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid Pakistani phone number.";
    }
    if (!plateRegex.test(formData.plateNumber)) {
      newErrors.plateNumber = "Invalid plate number format (e.g., ABC-123).";
    }
    if (formData.documents.length === 0) {
      newErrors.documents = "Please upload your vehicle documents.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const data = new FormData();
      data.append("phone", formData.phone);
      data.append("plateNumber", formData.plateNumber);
      data.append("vehicleType", formData.vehicleType);
      data.append("brand", formData.brand);
      data.append("model", formData.model);
      data.append("color", formData.color);

      formData.documents.forEach((file) => data.append("documents", file));

      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      await axios.post("http://localhost:5000/api/vehicles/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Redirect instead of showing success message
      navigate("/user-dashboard");
    } catch (err) {
      console.error("Upload error:", err);
      setErrors({
        submit: err.response?.data?.message || "Upload failed. Try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Vehicle Registration
        </h1>

        {errors.submit && (
          <p className="text-red-600 font-semibold text-center mb-4">
            {errors.submit}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Details */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Your Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={
                    formData.role === "admin"
                      ? "Admin"
                      : formData.userType
                      ? formData.userType.charAt(0).toUpperCase() +
                        formData.userType.slice(1)
                      : "User"
                  }
                  className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed w-full"
                  readOnly
                />
              </div>

              {/* Name */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed w-full"
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed w-full"
                  readOnly
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+92xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Vehicle Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Plate */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Plate Number
                </label>
                <input
                  type="text"
                  name="plateNumber"
                  placeholder="ABC-123"
                  value={formData.plateNumber}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                  required
                />
                {errors.plateNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.plateNumber}
                  </p>
                )}
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Vehicle Type
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="van">Van</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="e.g., Toyota, Honda"
                  value={formData.brand}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  placeholder="e.g., Corolla 2022"
                  value={formData.model}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block font-bold text-gray-600 mb-1">
                  Color
                </label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                >
                  <option value="">Select Color</option>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="silver">Silver</option>
                  <option value="grey">Grey</option>
                  <option value="green">Green</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Upload Documents
            </h2>

            {/* ✅ Drag & Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);

                const files = Array.from(e.dataTransfer.files);

                setFormData((prev) => ({
                  ...prev,
                  documents: [...prev.documents, ...files],
                }));
              }}
            >
              <input
                type="file"
                name="documents"
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                multiple
                onChange={handleChange}
                className="hidden"
                id="fileUpload"
              />

              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                <span className="text-gray-500 mb-2">
                  Drag & drop your files here or click to browse
                </span>
                <span className="text-sm text-gray-400">
                  png, jpg, pdf, docx accepted
                </span>
                <span className="mt-3 bg-blue-900 text-white px-4 py-2 rounded-lg">
                  Browse
                </span>
              </label>

              {formData.documents.length > 0 && (
                <div className="mt-3 text-left">
                  <p className="text-sm font-semibold text-orange-600">
                    Files selected:
                  </p>
                  <ul className="list-disc list-inside text-sm text-orange-700 mt-1">
                    {formData.documents.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {errors.documents && (
                <p className="text-red-500 text-sm mt-1">{errors.documents}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  role: formData.role,
                  userType: formData.userType,
                  name: formData.name,
                  email: formData.email,
                  phone: "",
                  plateNumber: "",
                  vehicleType: "",
                  brand: "",
                  model: "",
                  color: "",
                  documents: [],
                })
              }
              className="px-6 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
