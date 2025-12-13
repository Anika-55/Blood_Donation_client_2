import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHospital, FaUser, FaTint, FaClock } from "react-icons/fa";

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
    hospital: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });

  const districts = ["Dhaka", "Chattogram", "Rajshahi"];
  const upazilas = ["Dhanmondi", "Mirpur", "Uttara"];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to submit request");
        return;
      }

      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
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
        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Requester Info */}
        <Section title="Requester Information" icon={<FaUser />}>
          <div className="grid md:grid-cols-2 gap-6">
            <ReadOnly label="Name" value={user?.name} />
            <ReadOnly label="Email" value={user?.email} />
          </div>
        </Section>

        {/* Recipient Info */}
        <Section title="Recipient Details" icon={<FaTint />}>
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Recipient Name" name="recipientName" />
            <Select
              label="Blood Group"
              name="bloodGroup"
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            />
            <Select
              label="District"
              name="recipientDistrict"
              options={districts}
            />
            <Select
              label="Upazila"
              name="recipientUpazila"
              options={upazilas}
            />
          </div>
        </Section>

        {/* Location */}
        <Section title="Hospital & Location" icon={<FaHospital />}>
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Hospital Name" name="hospital" />
            <Input label="Full Address" name="address" />
          </div>
        </Section>

        {/* Time */}
        <Section title="Donation Schedule" icon={<FaClock />}>
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Donation Date" type="date" name="donationDate" />
            <Input label="Donation Time" type="time" name="donationTime" />
          </div>
        </Section>

        {/* Message */}
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

        {/* Submit */}
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

  /* =================== Components =================== */

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

  function Input({ label, name, type = "text" }) {
    return (
      <div>
        <label className="block font-medium mb-1">{label}</label>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
        />
      </div>
    );
  }

  function Select({ label, name, options }) {
    return (
      <div>
        <label className="block font-medium mb-1">{label}</label>
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
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
}
