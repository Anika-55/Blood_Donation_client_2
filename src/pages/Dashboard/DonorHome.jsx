import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function DonorHome() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("/donor/dashboard").then((res) => {
      setRequests(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name} 👋</h1>

      {requests.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-3">
            Recent Donation Requests
          </h2>

          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr key={r._id} className="text-center">
                  <td>{r.recipientName}</td>
                  <td>
                    {r.recipientDistrict}, {r.recipientUpazila}
                  </td>
                  <td>{r.donationDate}</td>
                  <td>{r.donationTime}</td>
                  <td>{r.bloodGroup}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link
            to="/dashboard/my-donation-requests"
            className="inline-block mt-4 text-red-600 font-semibold"
          >
            View my all requests →
          </Link>
        </>
      )}
    </div>
  );
}
