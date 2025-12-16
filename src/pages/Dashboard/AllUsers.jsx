import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  FaLock,
  FaUnlock,
  FaUserPlus,
  FaUserShield,
  FaEllipsisV,
} from "react-icons/fa";

/* ---------- Gradient Presets ---------- */
const gradients = {
  red: "from-pink-500 to-rose-600",
  green: "from-emerald-400 to-green-600",
  blue: "from-sky-500 to-blue-600",
  purple: "from-violet-400 to-purple-500",
};

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null); // track which user dropdown is open

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await api.get(
        `/admin/users${filter ? `?status=${filter}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.patch(
        `/admin/users/${id}/${action}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
      setOpenDropdownId(null); // close dropdown after action
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Loading users...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
          User Management
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage roles and access permissions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["", "active", "blocked"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition shadow-sm ${
              filter === status
                ? "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {status === ""
              ? "All Users"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-sm overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition relative"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={u.avatar || "/default.png"}
                    className="w-11 h-11 rounded-full ring-2 ring-gray-200"
                  />
                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                </td>
                <td className="p-4 capitalize">{u.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                {/* Action Dropdown */}
                <td className="p-4 text-center relative">
                  <button
                    onClick={() =>
                      setOpenDropdownId(openDropdownId === u._id ? null : u._id)
                    }
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdownId === u._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                      {u.status === "active" && (
                        <DropdownItem
                          color="red"
                          label="Block"
                          onClick={() => handleAction(u._id, "block")}
                          icon={<FaLock />}
                        />
                      )}
                      {u.status === "blocked" && (
                        <DropdownItem
                          color="green"
                          label="Unblock"
                          onClick={() => handleAction(u._id, "unblock")}
                          icon={<FaUnlock />}
                        />
                      )}
                      {u.role !== "volunteer" && (
                        <DropdownItem
                          color="blue"
                          label="Make Volunteer"
                          onClick={() => handleAction(u._id, "make-volunteer")}
                          icon={<FaUserPlus />}
                        />
                      )}
                      {u.role !== "admin" && (
                        <DropdownItem
                          color="purple"
                          label="Make Admin"
                          onClick={() => handleAction(u._id, "make-admin")}
                          icon={<FaUserShield />}
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white rounded-xl shadow-sm p-4 space-y-4 relative"
          >
            <div className="flex items-center gap-3">
              <img
                src={u.avatar || "/default.png"}
                className="w-12 h-12 rounded-full ring-2 ring-gray-200"
              />
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>

              {/* Mobile Dropdown */}
              <div className="ml-auto relative">
                <button
                  onClick={() =>
                    setOpenDropdownId(openDropdownId === u._id ? null : u._id)
                  }
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FaEllipsisV />
                </button>

                {openDropdownId === u._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    {u.status === "active" && (
                      <DropdownItem
                        color="red"
                        label="Block"
                        onClick={() => handleAction(u._id, "block")}
                        icon={<FaLock />}
                      />
                    )}
                    {u.status === "blocked" && (
                      <DropdownItem
                        color="green"
                        label="Unblock"
                        onClick={() => handleAction(u._id, "unblock")}
                        icon={<FaUnlock />}
                      />
                    )}
                    {u.role !== "volunteer" && (
                      <DropdownItem
                        color="blue"
                        label="Make Volunteer"
                        onClick={() => handleAction(u._id, "make-volunteer")}
                        icon={<FaUserPlus />}
                      />
                    )}
                    {u.role !== "admin" && (
                      <DropdownItem
                        color="purple"
                        label="Make Admin"
                        onClick={() => handleAction(u._id, "make-admin")}
                        icon={<FaUserShield />}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span>
                <strong>Role:</strong> {u.role}
              </span>
              <span>
                <strong>Status:</strong> {u.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Dropdown Item ---------- */
function DropdownItem({ color, label, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 w-full text-sm text-white bg-gradient-to-r ${gradients[color]} hover:opacity-90 transition`}
    >
      {icon} {label}
    </button>
  );
}
