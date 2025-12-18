import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"; // your axios instance
import { FaTint, FaPlusCircle } from "react-icons/fa";

export default function HomeVolunteer() {
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Fetch recent donation requests
  useEffect(() => {
    const fetchRecentRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/volunteer/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setRecentRequests(res.data);
      } catch (err) {
        console.error("Error fetching recent requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentRequests();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Volunteer Dashboard
      </h1>

      {/* Create Donation Request Button */}
      <div className="mb-8">
        <button
          onClick={() =>
            navigate("/dashboard/volunteer/create-donation-request")
          }
          className="w-full md:w-1/3 py-6 rounded-xl bg-red-600 text-white font-semibold shadow-md hover:scale-105 transition flex items-center justify-center gap-3"
        >
          <FaPlusCircle /> Create Donation Request
        </button>
      </div>

      {/* Recent Requests */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <FaTint className="text-red-600" /> Recent Blood Donation Requests
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : recentRequests.length === 0 ? (
        <p>No recent requests found.</p>
      ) : (
        <div className="space-y-3">
          {recentRequests.map((req) => (
            <div
              key={req._id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <p>
                  <span className="font-semibold">{req.recipientName}</span> -{" "}
                  {req.bloodGroup}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`font-semibold px-3 py-1 rounded-full text-sm ${
                  req.status === "done"
                    ? "bg-green-100 text-green-800"
                    : req.status === "pending"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {req.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
