import React, { useEffect, useState } from "react";
import axios from "../../api/axios"; // make sure you have your axios instance
import { FaTint } from "react-icons/fa";

export default function HomeVolunteer() {
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchRecentRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/donor/dashboard", {
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Volunteer Dashboard</h1>
      <h2 className="text-lg font-semibold mb-2">
        Recent Blood Donation Requests
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
              <span className="text-red-600 font-semibold">{req.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
