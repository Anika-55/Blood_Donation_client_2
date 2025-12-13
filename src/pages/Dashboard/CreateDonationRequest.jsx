import { useEffect, useState } from "react";

export default function CreateDonationRequest() {
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

  const user = JSON.parse(localStorage.getItem("user")); // logged-in user

  const districts = ["Dhaka", "Chattogram", "Rajshahi"];
  const upazilas = ["Dhanmondi", "Mirpur", "Uttara"];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Create Donation Request
        </h1>
        <p className="text-gray-500 text-sm">
          Fill out the form to request blood donation
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 md:p-8"
      >
        {/* Requester Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="label">Requester Name</label>
            <input
              value={user?.name || ""}
              readOnly
              className="input bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="label">Requester Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="input bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Recipient Name</label>
            <input
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              className="input"
              placeholder="Recipient full name"
              required
            />
          </div>

          <div>
            <label className="label">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select blood group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">District</label>
            <select
              name="recipientDistrict"
              value={formData.recipientDistrict}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select district</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Upazila</label>
            <select
              name="recipientUpazila"
              value={formData.recipientUpazila}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select upazila</option>
              {upazilas.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Hospital Name</label>
            <input
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="input"
              placeholder="Hospital name"
              required
            />
          </div>

          <div>
            <label className="label">Full Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input"
              placeholder="Street, area"
              required
            />
          </div>

          <div>
            <label className="label">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Donation Time</label>
            <input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        {/* Message */}
        <div className="mt-6">
          <label className="label">Request Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="input resize-none"
            placeholder="Explain why blood is needed..."
          />
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <button className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg">
            Request Blood
          </button>
        </div>
      </form>
    </div>
  );
}
