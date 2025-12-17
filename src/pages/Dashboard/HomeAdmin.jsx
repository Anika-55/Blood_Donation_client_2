import React, { useEffect, useState } from "react";
import { FaUsers, FaTint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function HomeAdmin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBloodRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await api.get("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div
          onClick={() => navigate("/dashboard/all-users")}
          className="cursor-pointer p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 flex items-center gap-6"
        >
          <div className="bg-red-500 text-white p-4 rounded-full shadow-inner">
            <FaUsers size={30} />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalUsers}
            </p>
            <p className="text-gray-500 uppercase tracking-wide text-sm">
              Total Users
            </p>
          </div>
        </div>

        <div
          onClick={() => navigate("/dashboard/all-blood-donation-request")}
          className="cursor-pointer p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 flex items-center gap-6"
        >
          <div className="bg-blue-500 text-white p-4 rounded-full shadow-inner">
            <FaTint size={30} />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalBloodRequests}
            </p>
            <p className="text-gray-500 uppercase tracking-wide text-sm">
              Blood Donation Requests
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/dashboard/all-users")}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:scale-105 transition flex items-center justify-center gap-3"
        >
          <FaUsers /> Manage Users
        </button>

        <button
          onClick={() => navigate("/dashboard/all-blood-donation-request")}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:scale-105 transition flex items-center justify-center gap-3"
        >
          <FaTint /> View All Requests
        </button>
      </div>
    </div>
  );
}
