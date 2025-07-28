import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../img/back01.png";


export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f4fbf4" }}>
      {/* Header */}
      <header className="py-4 shadow" style={{    background: "linear-gradient(to right, #4dbb61ff 0%, #a0e2a3ff 50%, #4dbb61ff 100%)"
 }}>
        <div className="container text-center">
          <h1 className="fw-bold text-black mb-1 display-6">BookUs</h1>
          <p className="text-black mb-0 fs-5">Your Smart Appointment Booking Companion</p>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="flex-grow-1 d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <div className="container px-4">
          <h2 className="display-4 fw-bold mb-3">Effortless Appointments Start Here</h2>
          <p className="lead mb-5">
            Discover and book services from verified providers. Manage your schedule with ease — anytime, anywhere.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link to="/login" className="btn btn-light btn-lg px-5 shadow-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg px-5 border-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
  style={{
    background: "linear-gradient(to right, #4dbb61ff 0%, #a0e2a3ff 50%, #4dbb61ff 100%)",
    color: "black",
  }}
  className="py-3 text-center"
>
  <div className="container">
    <small className="text-black-80">© 2025 BookUs — All rights reserved.</small>
  </div>
</footer>

    </div>
  );
}
