import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Logs() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/vehicles/my-vehicles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVehicles(res.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // 🔍 filter vehicles by plate number, brand, or model
  const filteredVehicles = vehicles.filter(
    (v) =>
      v.plateNumber?.toLowerCase().includes(search.toLowerCase()) ||
      v.brand?.toLowerCase().includes(search.toLowerCase()) ||
      v.model?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-orange-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
        🚗 My Vehicle Logs
      </h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Plate, Brand, or Model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-orange-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : filteredVehicles.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredVehicles.map((v) => (
            <div
              key={v._id}
              className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-2">
                {v.plateNumber}
              </h2>
              <p>
                <span className="font-semibold text-orange-600">Type:</span>{" "}
                {v.vehicleType}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Brand:</span>{" "}
                {v.brand || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Model:</span>{" "}
                {v.model || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Color:</span>{" "}
                {v.color || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Phone:</span>{" "}
                {v.phone}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Registered At: {new Date(v.createdAt).toLocaleString()}
              </p>

              {v.documents?.length > 0 && (
                <div className="mt-3">
                  <strong className="text-blue-600">Documents:</strong>
                  <ul className="list-disc ml-5 text-sm">
                    {v.documents.map((doc, i) => (
                      <li key={i}>
                        <a
                          href={`http://localhost:5000/${doc}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-orange-600 hover:underline"
                        >
                          {doc.split("-").slice(1).join("-")}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No vehicles found.</p>
      )}
    </div>
  );
}
