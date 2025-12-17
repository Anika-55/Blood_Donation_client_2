import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function MyDonationRequestView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("donor"); // default donor

  useEffect(() => {
    // Detect role from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role || "donor";
    setUserRole(role);

    // Determine backend endpoint based on role
    const endpoint =
      role === "admin" ? `/admin/donations/${id}` : `/donor/${id}`;

    fetchRequest(endpoint);
    // eslint-disable-next-line
  }, [id]);

  const fetchRequest = async (endpoint) => {
    setLoading(true);
    try {
      const res = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequest(res.data);
    } catch (err) {
      console.error("Error fetching donation request:", err);
      setRequest(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading donation request...</p>;

  if (!request)
    return (
      <p className="text-center mt-10 text-red-500">
        Donation request not found
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Donation Request Details
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>
      </div>

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Recipient Name" value={request.recipientName} />
          <Info label="Blood Group" value={request.bloodGroup} highlight />
          <Info label="District" value={request.recipientDistrict} />
          <Info label="Upazila" value={request.recipientUpazila} />
          <Info label="Hospital" value={request.hospitalName || "—"} />
          <Info label="Address" value={request.address || "—"} />
          <Info
            label="Donation Date"
            value={new Date(request.donationDate).toLocaleDateString()}
          />
          <Info label="Donation Time" value={request.donationTime || "—"} />
        </div>

        {/* Status */}
        <div className="mt-6">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              request.status === "done"
                ? "bg-green-100 text-green-700"
                : request.status === "canceled"
                ? "bg-gray-100 text-gray-600"
                : request.status === "inprogress"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            Status: {request.status}
          </span>
        </div>

        {/* Message */}
        {request.message && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Message</h3>
            <p className="bg-gray-50 border rounded-lg p-4 text-gray-700">
              {request.message}
            </p>
          </div>
        )}

        {/* Created At */}
        <div className="mt-6 text-sm text-gray-500">
          Created at: {new Date(request.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, highlight }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`text-lg font-semibold ${
          highlight ? "text-red-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
