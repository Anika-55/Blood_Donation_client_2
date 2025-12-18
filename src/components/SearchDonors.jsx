import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function SearchDonors() {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // Load districts (like registration page)
  useEffect(() => {
    fetch("/centers.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueDistricts = [...new Set(data.map((d) => d.district))];
        setDistricts(uniqueDistricts);
      });
  }, []);

  // Update upazilas when district changes
  useEffect(() => {
    if (!filters.district) return;
    fetch("/centers.json")
      .then((res) => res.json())
      .then((data) => {
        const districtData = data.find((d) => d.district === filters.district);
        setUpazilas(districtData ? districtData.covered_area : []);
        setFilters((prev) => ({ ...prev, upazila: "" }));
      });
  }, [filters.district]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const { data } = await axios.get("/donor/search", { params: filters });
      setDonors(data);
    } catch (err) {
      console.error("Search error:", err);
      setDonors([]); // reset if error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Donors</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white shadow rounded-xl p-6 grid md:grid-cols-4 gap-4"
      >
        <select
          name="bloodGroup"
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        >
          <option value="">Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          name="district"
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        >
          <option value="">District</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        >
          <option value="">Upazila</option>
          {upazilas.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-red-600 text-white rounded px-4 py-2 font-semibold hover:bg-red-700"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-10">
        {loading && <p className="text-center">Searching...</p>}

        {searched && !loading && donors.length === 0 && (
          <p className="text-center text-gray-500">No donors found</p>
        )}

        {donors.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <div key={donor._id} className="border rounded-xl p-5 shadow">
                <h3 className="font-bold text-lg">{donor.name}</h3>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>District: {donor.district}</p>
                <p>Upazila: {donor.upazila}</p>
                <p>Email: {donor.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
