// pages/DonationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";

export default function DonationDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return navigate("/login");

    fetch(`http://localhost:5000/api/donations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error(err));
  }, [id, navigate]);

  if (!request) return <p className="text-center mt-10">Loading...</p>;

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto py-10 px-4 bg-white shadow rounded">
        <h2 className="text-3xl font-bold mb-4 text-red-600">
          {request.recipientName}
        </h2>
        <p>
          <strong>Location:</strong> {request.district}, {request.upazila}
        </p>
        <p>
          <strong>Blood Group:</strong> {request.bloodGroup}
        </p>
        <p>
          <strong>Date:</strong> {new Date(request.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {request.time}
        </p>
        <p className="mt-4">{request.description}</p>
      </div>
    </AuthLayout>
  );
}
