import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function MyDonationRequests() {
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/donor/my-requests${status ? `?status=${status}` : ""}`)
      .then((res) => setData(res.data));
  }, [status]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Donation Requests</h1>

      <select
        onChange={(e) => setStatus(e.target.value)}
        className="mb-4 p-2 border"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Location</th>
            <th>Date</th>
            <th>Blood</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r._id} className="text-center">
              <td>{r.recipientName}</td>
              <td>
                {r.recipientDistrict}, {r.recipientUpazila}
              </td>
              <td>{r.donationDate}</td>
              <td>{r.bloodGroup}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
