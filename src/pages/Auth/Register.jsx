import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    avatar: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null); // track registered user
  const [loading, setLoading] = useState(false);

  // Fetch districts from centers.json
  useEffect(() => {
    fetch("/centers.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueDistricts = [...new Set(data.map((d) => d.district))];
        setDistricts(uniqueDistricts);
      })
      .catch((err) => console.error(err));
  }, []);

  // Update upazilas when district changes
  useEffect(() => {
    if (!formData.district) return;
    fetch("/centers.json")
      .then((res) => res.json())
      .then((data) => {
        const districtData = data.find((d) => d.district === formData.district);
        setUpazilas(districtData ? districtData.covered_area : []);
        setFormData((prev) => ({ ...prev, upazila: "" }));
      });
  }, [formData.district]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful!");
      setUser({ name: formData.name, email: formData.email }); // save user
      navigate("/"); // redirect to home page
    } catch (err) {
      setLoading(false);
      setMessage("Server error. Try again later.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      avatar: "",
      bloodGroup: "",
      district: "",
      upazila: "",
    });
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto my-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {message && (
          <div className="mb-4 text-center text-red-500 font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {!user ? (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Logout
            </button>
          )}
        </form>

        {!user && (
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-red-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </AuthLayout>
  );
}
