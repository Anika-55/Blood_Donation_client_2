import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AuthLayout from "../../Layouts/AuthLayout";

export default function DonationDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchDetails();
    // eslint-disable-next-line
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await api.get(`/donations/${id}`);
      setRequest(res.data);
    } catch (err) {
      console.error(err);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!request) {
    return <p className="text-center mt-10 text-gray-500">Not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          {request.recipientName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>📍 Location:</strong> {request.recipientDistrict},{" "}
            {request.recipientUpazila}
          </p>

          <p>
            <strong>🩸 Blood Group:</strong>{" "}
            <span className="text-red-600 font-semibold">
              {request.bloodGroup}
            </span>
          </p>

          <p>
            <strong>📅 Date:</strong>{" "}
            {new Date(request.donationDate).toLocaleDateString()}
          </p>

          <p>
            <strong>⏰ Time:</strong> {request.donationTime}
          </p>

          <p>
            <strong>🏥 Hospital:</strong> {request.hospitalName}
          </p>
        </div>

        {request.message && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-1">
              Additional Message
            </h4>
            <p className="text-gray-600">{request.message}</p>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
