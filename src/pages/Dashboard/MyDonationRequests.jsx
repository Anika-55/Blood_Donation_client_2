import React, { useEffect, useState } from "react";
import api from "../../api/axios";
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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRequest, setEditRequest] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchData();
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

  const handleEditOpen = (req) => {
    setEditRequest(req);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const {
        _id,
        recipientName,
        recipientDistrict,
        recipientUpazila,
        hospitalName,
        address,
        bloodGroup,
        donationDate,
        donationTime,
        message,
      } = editRequest;

      await api.patch(
        `/donor/${_id}`,
        {
          recipientName,
          recipientDistrict,
          recipientUpazila,
          hospitalName,
          address,
          bloodGroup,
          donationDate,
          donationTime,
          message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData((prev) =>
        prev.map((req) => (req._id === _id ? { ...req, ...editRequest } : req))
      );

      setEditModalOpen(false);
      MySwal.fire(
        "Updated!",
        "Donation request updated successfully.",
        "success"
      );
    } catch (err) {
      console.error(err);
      MySwal.fire("Error", "Update failed", "error");
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Donation Requests
      </h1>

      {/* Filter & create button */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="font-medium">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none w-full sm:w-auto"
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
          className="ml-auto bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
        >
          + Create New Request
        </button>
      </div>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto bg-white shadow-md rounded-lg">
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
            {data.map((req) => (
              <tr
                key={req._id}
                className="transition-all duration-300 hover:bg-gray-50"
              >
                <td className="px-4 py-2 whitespace-nowrap">
                  {req.recipientName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {new Date(req.donationDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {req.donationTime}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {req.bloodGroup}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
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
                <td className="px-4 py-2 whitespace-nowrap flex flex-wrap gap-2">
                  <Link
                    to={`/dashboard/donor/donation/${req._id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </Link>
                  {["pending", "inprogress"].includes(req.status) && (
                    <button
                      onClick={() => handleEditOpen(req)}
                      className="text-yellow-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                  {req.status === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req._id, "done")}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusChange(req._id, "canceled")}
                        className="text-gray-600 hover:underline text-sm"
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

      {/* Card layout for small screens */}
      <div className="sm:hidden flex flex-col gap-4">
        {data.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow-md rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{req.recipientName}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  req.status === "done"
                    ? "bg-green-100 text-green-800"
                    : req.status === "canceled"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {req.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Location: </span>
                {req.recipientDistrict}, {req.recipientUpazila}
              </p>
              <p>
                <span className="font-medium">Date: </span>
                {new Date(req.donationDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Time: </span>
                {req.donationTime}
              </p>
              <p>
                <span className="font-medium">Blood: </span>
                {req.bloodGroup}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link
                to={`/dashboard/donor/donation/${req._id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View
              </Link>
              {["pending", "inprogress"].includes(req.status) && (
                <button
                  onClick={() => handleEditOpen(req)}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(req._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
              {req.status === "inprogress" && (
                <>
                  <button
                    onClick={() => handleStatusChange(req._id, "done")}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleStatusChange(req._id, "canceled")}
                    className="text-gray-600 hover:underline text-sm"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
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

      {/* Edit Modal */}
      {editModalOpen && editRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 animate-fadeIn overflow-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 md:p-8 relative animate-slideUp">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Edit Donation Request
            </h2>

            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg transition"
              onClick={() => setEditModalOpen(false)}
            >
              ✖
            </button>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "recipientName",
                "recipientDistrict",
                "recipientUpazila",
                "hospitalName",
                "address",
                "bloodGroup",
                "donationDate",
                "donationTime",
              ].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  {field === "bloodGroup" ? (
                    <select
                      name={field}
                      value={editRequest[field]}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    >
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        )
                      )}
                    </select>
                  ) : field === "donationDate" || field === "donationTime" ? (
                    <input
                      type={field === "donationDate" ? "date" : "time"}
                      name={field}
                      value={editRequest[field]}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={editRequest[field]}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    />
                  )}
                </div>
              ))}

              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={editRequest.message}
                  onChange={handleEditChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="Additional message..."
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition w-full sm:w-auto"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
