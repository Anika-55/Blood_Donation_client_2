import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHandHoldingHeart,
  FaPhone,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const links = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Requests", path: "/donations", icon: <FaHandHoldingHeart /> },
    { name: "Search", path: "/search", icon: <FaSearch /> },
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboardCustomize /> },
    { name: "Contact", path: "/contact", icon: <FaPhone /> },
  ];

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 border-b border-red-200/20 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide flex items-center gap-1"
        >
          <span className="text-red-600">Blood</span>
          <span className="text-gray-800">Care</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-gray-700 font-medium hover:text-red-600 transition flex items-center gap-2 ${
                  isActive ? "text-red-600" : ""
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}

          {!user ? (
            <Link
              to="/register"
              className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-md"
            >
              Register
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 p-2 rounded-full hover:shadow transition"
              >
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-red-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-red-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-4 space-y-4 bg-white/80 backdrop-blur-md border-b">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="text-lg text-gray-800 font-medium hover:text-red-600 transition flex items-center gap-3"
            >
              {link.icon} {link.name}
            </NavLink>
          ))}

          {!user ? (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-center shadow hover:bg-red-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-red-100"
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-red-100"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
