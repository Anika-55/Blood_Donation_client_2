import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axios";

const DonateSuccess = () => {
  const [searchParams] = useSearchParams();
  const donationId = searchParams.get("donationId");

  useEffect(() => {
    if (donationId) {
      axiosInstance.patch("/money-donations/update-status", {
        donationId,
        status: "succeeded",
      });
    }
  }, [donationId]);

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-green-100 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Thank you for your donation!</h2>
      <p>Your support means a lot ❤️</p>
    </div>
  );
};

export default DonateSuccess;
