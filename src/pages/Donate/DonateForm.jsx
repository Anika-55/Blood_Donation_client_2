import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../../api/axios";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXX"); // your Stripe publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    setLoading(true);
    try {
      // Create payment intent
      const { data } = await axiosInstance.post(
        "/api/money-donations/create-payment-intent",
        {
          amount: Number(amount),
        }
      );

      // Confirm card payment
      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful! Thank you for your donation ❤️");

        // Update donation status
        const donationId = result.paymentIntent.metadata.donationId;
        await axiosInstance.patch("/api/money-donations/update-status", {
          donationId,
          status: "succeeded",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("Payment failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Donate Money</h2>

      <input
        type="number"
        placeholder="Amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 w-full p-3 border rounded"
      />

      <div className="mb-4 p-3 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </form>
  );
};

export default function DonateForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
