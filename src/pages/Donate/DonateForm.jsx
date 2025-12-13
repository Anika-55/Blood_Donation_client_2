import React, { useState } from "react";
import axiosInstance from "../../api/axios";

const DonateForm = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    if (!amount || amount <= 0) return;

    setLoading(true);

    try {
      // ✅ Correct route with /api prefix
      const { data } = await axiosInstance.post(
        "/api/money-donations/create-checkout-session",
        { amount: Number(amount) }
      );

      // Redirect to Stripe-hosted checkout page (TEST MODE)
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Donate Money</h2>

      <input
        type="number"
        placeholder="Amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 w-full p-3 border rounded"
      />

      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
      >
        {loading ? "Redirecting..." : `Pay $${amount}`}
      </button>
    </div>
  );
};

export default DonateForm;
