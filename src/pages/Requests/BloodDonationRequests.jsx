// pages/Requests/BloodDonationRequests.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";

export default function BloodDonationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch donation requests from API
    fetch("http://localhost:5000/api/donations?status=pending") // assuming API endpoint
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleView = (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate(`/donations/${id}`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <AuthLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
          Blood Donation Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {req.recipientName}
                </h3>
                <p>
                  <strong>Location:</strong> {req.district}, {req.upazila}
                </p>
                <p>
                  <strong>Blood Group:</strong> {req.bloodGroup}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(req.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {req.time}
                </p>
                <button
                  onClick={() => handleView(req._id)}
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
