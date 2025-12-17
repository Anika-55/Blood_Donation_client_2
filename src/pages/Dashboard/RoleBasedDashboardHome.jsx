import React from "react";
import DonorHome from "./DonorHome";
import HomeAdmin from "./HomeAdmin";
import HomeVolunteer from "./HomeVolunteer";

export default function RoleBasedDashboardHome() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role || "donor";

  if (role === "admin") return <HomeAdmin />;
  if (role === "volunteer") return <HomeVolunteer />; // ✅ render volunteer home
  return <DonorHome />;
}
