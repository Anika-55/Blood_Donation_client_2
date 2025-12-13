import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHospital, FaUser, FaTint, FaClock } from "react-icons/fa";
import api from "../../api/axios"; // Axios instance with baseURL = http://localhost:5000/api

export default function CreateDonationRequest() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });

  const districts = ["Dhaka", "Chattogram", "Rajshahi"];
  const upazilas = ["Dhanmondi", "Mirpur", "Uttara"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/donor", // Matches backend route
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create Donation Request
        </h1>
        <p className="text-gray-500 mt-1">
          Request blood donation by providing accurate information
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10"
      >
        {error && (
          <div className="mb-6 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <Section title="Requester Information" icon={<FaUser />}>
          <div className="grid md:grid-cols-2 gap-6">
            <ReadOnly label="Name" value={user?.name} />
            <ReadOnly label="Email" value={user?.email} />
          </div>
        </Section>

        <Section title="Recipient Details" icon={<FaTint />}>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Recipient Name"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
            />
            <Select
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            />
            <Select
              label="District"
              name="recipientDistrict"
              value={formData.recipientDistrict}
              onChange={handleChange}
              options={districts}
            />
            <Select
              label="Upazila"
              name="recipientUpazila"
              value={formData.recipientUpazila}
              onChange={handleChange}
              options={upazilas}
            />
          </div>
        </Section>

        <Section title="Hospital & Location" icon={<FaHospital />}>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Hospital Name"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
            />
            <Input
              label="Full Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </Section>

        <Section title="Donation Schedule" icon={<FaClock />}>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Donation Date"
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
            />
            <Input
              label="Donation Time"
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
            />
          </div>
        </Section>

        <div className="mt-8">
          <label className="block font-medium mb-2">Additional Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Explain why blood is urgently needed..."
          />
        </div>

        <div className="mt-10 flex justify-end">
          <button
            disabled={loading}
            className={`px-10 py-3 rounded-xl font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="mb-10">
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-700">
        <span className="text-red-600">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>
  );
}

function Select({ label, name, options, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((op) => (
          <option key={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}

function ReadOnly({ label, value }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        value={value || ""}
        readOnly
        className="w-full bg-gray-100 border rounded-xl px-4 py-3 cursor-not-allowed"
      />
    </div>
  );
}
