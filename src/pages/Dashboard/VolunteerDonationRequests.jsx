import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export default function VolunteerDonationRequests() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/volunteer/donations?page=${page}&limit=${limit}${
          statusFilter ? `&status=${statusFilter}` : ""
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setRequests([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, statusFilter]);

  const totalPages = Math.ceil(total / limit) || 1;

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.patch(
        `/volunteer/donations/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );

      MySwal.fire(
        "Success",
        `Donation request has been marked as ${newStatus}.`,
        "success"
      );
    } catch (err) {
      console.error(err);
      MySwal.fire("Error", "Status update failed", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
        All Blood Donation Requests
      </h2>

      {/* Filter */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="border rounded px-3 py-1 focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">Inprogress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500 text-center">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Recipient",
                  "Location",
                  "Date",
                  "Time",
                  "Blood",
                  "Status",
                  "Actions",
                ].map((th) => (
                  <th
                    key={th}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{req.recipientName}</td>
                  <td className="px-4 py-2">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(req.donationDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{req.donationTime}</td>
                  <td className="px-4 py-2">{req.bloodGroup}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        req.status === "done"
                          ? "bg-green-100 text-green-800"
                          : req.status === "canceled"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    {/* View button */}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/volunteer/donation/${req._id}`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>

                    {/* Status update buttons */}
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "inprogress")
                          }
                          className="text-green-600 hover:underline"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="text-red-600 hover:underline"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
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
