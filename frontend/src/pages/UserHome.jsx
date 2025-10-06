import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserHome() {
  const [stats, setStats] = useState({
    registeredVehicles: 0,
    logsToday: 0,
    pendingApprovals: 0,
    reportsGenerated: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token from login
        if (!token) return; // not logged in

        const config = { headers: { Authorization: `Bearer ${token}` } };

        // ✅ Fetch registered vehicles for logged-in user
        const vehiclesRes = await axios.get(
          "http://localhost:5000/api/vehicles/my-vehicles",
          config
        );

        // Make sure backend returns an array
        const registeredVehicles = Array.isArray(vehiclesRes.data)
          ? vehiclesRes.data.length
          : 0;

        // TODO: Replace these with real API calls if you have endpoints
        const logsToday = 45;
        const pendingApprovals = 10;
        const reportsGenerated = 8;

        setStats({
          registeredVehicles,
          logsToday,
          pendingApprovals,
          reportsGenerated,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setStats((prev) => ({ ...prev, registeredVehicles: 0 }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Welcome Banner */}
      <div className="bg-blue-900 text-white rounded-xl p-6 shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Welcome to MoVA System</h1>
        <p className="mt-2 text-lg text-gray-200">
          AI Multimodal Vehicle Access System – Secure. Reliable. Smart.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-blue-900">
            {stats.registeredVehicles}
          </h2>
          <p className="text-gray-600">Registered Vehicles</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-orange-500">
            {stats.logsToday}
          </h2>
          <p className="text-gray-600">Logs Today</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-blue-700">
            {stats.pendingApprovals}
          </h2>
          <p className="text-gray-600">Pending Approvals</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-600">
            {stats.reportsGenerated}
          </h2>
          <p className="text-gray-600">Reports Generated</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => window.location.href = "/register-vehicle"}
            className="bg-blue-900 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Register Vehicle
          </button>
          <button
            onClick={() => window.location.href = "/logs"}
            className="bg-orange-500 text-white px-5 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            View Logs
          </button>
          <button
            onClick={() => window.location.href = "/reports"}
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Generate Report
          </button>
          <button
            onClick={() => window.location.href = "/support"}
            className="bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
