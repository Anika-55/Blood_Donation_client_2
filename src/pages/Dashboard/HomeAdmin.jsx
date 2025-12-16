import React, { useEffect, useState } from "react";
import { FaUsers, FaTint } from "react-icons/fa";
import api from "../../api/axios";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBloodRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await api.get("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Only pick totalUsers and totalBloodRequests
        setStats({
          totalUsers: res.data.totalUsers,
          totalBloodRequests: res.data.totalBloodRequests,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaUsers className="text-red-600 text-5xl mb-4" />
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <p className="text-gray-700 mt-1">Total Users</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaTint className="text-blue-600 text-5xl mb-4" />
          <p className="text-3xl font-bold">{stats.totalBloodRequests}</p>
          <p className="text-gray-700 mt-1">Blood Donation Requests</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
          Manage Users
        </button>
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          View All Donation Requests
        </button>
      </div>
    </div>
  );
}
