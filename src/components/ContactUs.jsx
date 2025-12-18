import React, { useState } from "react";
import api from "../api/axios";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await api.post("/contact", form);
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 grid md:grid-cols-2 gap-8">
        {/* Left Info */}
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Have questions about blood donation or need help? Feel free to
            contact us anytime.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📧 Email: support@blooddonation.com</p>
            <p>📞 Phone: +880 1234-567890</p>
            <p>📍 Address: Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Right Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-600 text-center font-medium">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}
