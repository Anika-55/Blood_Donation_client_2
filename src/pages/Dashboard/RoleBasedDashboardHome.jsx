// pages/Dashboard/RoleBasedDashboardHome.jsx
import React from "react";
import DonorHome from "./DonorHome";
import HomeAdmin from "./HomeAdmin";

export default function RoleBasedDashboardHome() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role || "donor";

  return role === "admin" ? <HomeAdmin /> : <DonorHome />;
}
