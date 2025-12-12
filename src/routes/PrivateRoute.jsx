// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // Check if user is logged in (example: using localStorage token)
  const token = localStorage.getItem("accessToken");

  // If token exists, render the children (the protected page)
  if (token) {
    return children;
  }

  // Otherwise, redirect to login
  return <Navigate to="/login" replace />;
}
