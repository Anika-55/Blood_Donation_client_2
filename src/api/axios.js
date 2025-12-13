import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // change to your server
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;


