import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/auth/me");
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          bloodGroup: data.bloodGroup || "",
          district: data.district || "",
          upazila: data.upazila || "",
          avatar: data.avatar || "",
        });
      } catch (err) {
        console.error(err);
        setMessage(
          err.response?.data?.message || "Failed to load profile. Try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const { data } = await axios.put("/auth/me", formData);
      setUser(data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (!user)
    return <p className="text-center mt-10 text-red-500">User not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

      {message && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="bg-white shadow rounded-xl p-6 md:p-10 space-y-6"
      >
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <img
            src={formData.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* Blood group, district, upazila */}
        <div className="grid md:grid-cols-3 gap-6">
          <Select
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          />
          <Select
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
            options={["Dhaka", "Chattogram", "Rajshahi"]}
          />
          <Select
            label="Upazila"
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            options={["Dhanmondi", "Mirpur", "Uttara"]}
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <input
            type="text"
            value={user?.role || "N/A"}
            disabled
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Input component
function Input({ label, name, value, onChange, disabled }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

// Select component
function Select({ label, name, value, options, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
