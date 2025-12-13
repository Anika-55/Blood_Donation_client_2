import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaTint,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const menu = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboardCustomize />,
    },
    {
      name: "My Requests",
      path: "/dashboard/my-donation-requests",
      icon: <FaTint />,
    },
    {
      name: "Create Request",
      path: "/dashboard/create-donation-request",
      icon: <FaPlusCircle />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ===== Sidebar (Desktop) ===== */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col">
        <div className="px-6 py-5 text-2xl font-bold text-red-600 border-b">
          BloodCare
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-red-100 text-red-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Mobile Sidebar ===== */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden">
          <div className="w-64 bg-white h-full shadow-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <span className="text-xl font-bold text-red-600">BloodCare</span>
              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <nav className="px-4 py-6 space-y-2">
              {menu.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                      isActive
                        ? "bg-red-100 text-red-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar (Mobile) */}
        <header className="md:hidden bg-white shadow px-4 py-3 flex items-center">
          <button onClick={() => setOpen(true)}>
            <FaBars className="text-xl text-gray-700" />
          </button>
          <h1 className="ml-4 text-lg font-semibold text-gray-700">
            Dashboard
          </h1>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
