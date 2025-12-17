import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function HomeVolunteer() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await api.get(
        `/volunteer/requests?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page]);

  const handleStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.patch(
        `/volunteer/requests/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Loading donation requests...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-red-600 mb-6">
        Pending Donation Requests
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {requests.map((r) => (
          <div key={r._id} className="bg-white p-4 rounded-xl shadow-md">
            <p>
              <strong>Recipient:</strong> {r.recipientName}
            </p>
            <p>
              <strong>District:</strong> {r.recipientDistrict}
            </p>
            <p>
              <strong>Blood Group:</strong> {r.bloodGroup}
            </p>
            <p>
              <strong>Hospital:</strong> {r.hospital}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(r.donationDate).toLocaleDateString()}
            </p>

            <div className="mt-4 flex gap-2">
              {r.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatus(r._id, "accepted")}
                    className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    onClick={() => handleStatus(r._id, "rejected")}
                    className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <FaTimes /> Reject
                  </button>
                </>
              )}
              {r.status !== "pending" && (
                <span className="text-gray-500 capitalize">{r.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
