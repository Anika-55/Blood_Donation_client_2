import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHandHoldingHeart,
  FaUsers,
  FaBullhorn,
  FaPhone,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/", icon: <FaHome /> },
    {
      name: "Requests",
      path: "/donations",
      icon: <FaHandHoldingHeart />,
    },
    { name: "Donate", path: "/donate-money", icon: <FaUsers /> },
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboardCustomize /> },
    { name: "Contact", path: "/contact", icon: <FaPhone /> },
  ];

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
        <div className="hidden md:flex items-center space-x-8">
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
              {({ isActive }) => (
                <span className="relative flex items-center gap-2 group">
                  <span className="text-lg">{link.icon}</span>
                  {link.name}

                  {/* Underline animation */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </span>
              )}
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
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-md"
            >
              Logout
            </button>
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
              <span className="text-xl">{link.icon}</span> {link.name}
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
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-center shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
