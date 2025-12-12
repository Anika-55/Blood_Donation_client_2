// Layouts/AuthLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-20 bg-gray-50">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
