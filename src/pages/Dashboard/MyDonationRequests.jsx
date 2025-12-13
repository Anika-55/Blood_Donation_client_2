import React, { useEffect, useState } from "react";
import api from "../../api/axios"; // axios instance
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function MyDonationRequests() {
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, statusFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const query = `/donor/my?page=${page}&limit=${limit}${
        statusFilter ? `&status=${statusFilter}` : ""
      }`;

      const res = await api.get(query, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/donor/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // remove deleted item from state for instant UI update
        setData((prev) => prev.filter((req) => req._id !== id));
        setTotal((prev) => prev - 1);
        MySwal.fire(
          "Deleted!",
          "Donation request has been deleted.",
          "success"
        );
      } catch (err) {
        console.error(err);
        MySwal.fire("Error", "Delete failed", "error");
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(
        `/donor/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
      MySwal.fire("Updated!", `Status changed to ${status}`, "success");
    } catch (err) {
      console.error(err);
      MySwal.fire("Error", "Status update failed", "error");
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Donation Requests
      </h1>

      {/* Filter & create button */}
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

        <button
          onClick={() => navigate("/dashboard/create-donation-request")}
          className="ml-auto bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          + Create New Request
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No donation requests found.</p>
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((req) => (
                <tr
                  key={req._id}
                  className="transition-all duration-300 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {req.recipientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(req.donationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {req.donationTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {req.bloodGroup}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap flex flex-wrap gap-2">
                    <Link
                      to={`/dashboard/donor/donation/${req._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    {["pending", "inprogress"].includes(req.status) && (
                      <button
                        onClick={() =>
                          navigate(`/dashboard/donor/edit/${req._id}`)
                        }
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    {req.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(req._id, "done")}
                          className="text-green-600 hover:underline"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "canceled")
                          }
                          className="text-gray-600 hover:underline"
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
      <div className="mt-4 flex items-center justify-center gap-4">
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
