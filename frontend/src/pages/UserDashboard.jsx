import React, { useEffect, useState } from "react";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaUserCircle, FaHome, FaCar, FaFileAlt, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Fetch logged-in user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          navigate("/"); // Agar token hi nahi → redirect to login
          return;
        }
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        console.log("Profile API Response:", res.data);


      } catch (err) {
        console.error("Profile fetch error:", err);
        // navigate("/"); // error → logout
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/"); // logout → Home page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0056B3] text-white flex flex-col shadow-lg">
        <div className="p-6 text-center font-bold text-xl border-b border-blue-800">
          MOVA
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/user-home" className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#F7931E] transition">
            <FaHome /> <span>Home</span>
          </a>
          <a href="/vehicle-registration" className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#F7931E] transition">
            <FaCar /> <span>Vehicle Registration</span>
          </a>
          <a href="/logs" className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#F7931E] transition">
            <FaFileAlt /> <span>Logs / Reports</span>
          </a>
          <a href="/about" className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#F7931E] transition">
            <FaInfoCircle /> <span>About Us</span>
          </a>
          <a href="/contact" className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#F7931E] transition">
            <FaEnvelope /> <span>Contact Us</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-gray-700"
            />
          </div>

          {/* Profile + Logout */}
          <div className="flex items-center space-x-4">
            <FaUserCircle size={32} className="text-[#0056B3]" />
            <div className="text-gray-700">
              <span className="font-semibold">{user?.name || "Loading..."}</span>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-[#F7931E] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-500 transition"
            >
              <FiLogOut /> <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold text-[#0056B3] mb-4">
            Welcome, {user?.name || "User"} 
          </h1>
          <p className="text-gray-700">
            This is your AI-powered Multimodal Vehicle Access Dashboard.
          </p>

          {/* Example Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-[#0056B3]">Vehicles</h2>
              <p className="text-gray-600">Manage and register new vehicles here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-[#0056B3]">Reports</h2>
              <p className="text-gray-600">View system logs and reports.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-[#0056B3]">Profile</h2>
              <p className="text-gray-600">Update your account settings.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
