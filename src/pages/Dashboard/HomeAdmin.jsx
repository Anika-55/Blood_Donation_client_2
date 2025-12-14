// pages/Admin/AdminDashboardHome.jsx
import React, { useEffect, useState } from "react";
import { FaUsers, FaDonate, FaTint } from "react-icons/fa";
import axios from "axios";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalBloodRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage users, donations, and monitor statistics from here.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Go to All Users
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-100 to-red-200 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaUsers className="text-red-600 text-5xl mb-4" />
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <p className="text-gray-700 mt-1">Total Users</p>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaDonate className="text-green-600 text-5xl mb-4" />
          <p className="text-3xl font-bold">${stats.totalFunds}</p>
          <p className="text-gray-700 mt-1">Total Funding</p>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaTint className="text-blue-600 text-5xl mb-4" />
          <p className="text-3xl font-bold">{stats.totalBloodRequests}</p>
          <p className="text-gray-700 mt-1">Blood Donation Requests</p>
        </div>
      </div>

      {/* Optional: Quick Action Section */}
      <div className="mt-10 bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
            Manage Users
          </button>
          <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            View All Donation Requests
          </button>
          <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Add Funding
          </button>
        </div>
      </div>
    </div>
  );
}
