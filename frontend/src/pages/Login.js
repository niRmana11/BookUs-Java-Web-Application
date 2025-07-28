import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../api/config";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/users/login`, formData);
      const user = res.data;
      localStorage.setItem("bookus_user", JSON.stringify(res.data));

      if (user.role === "CUSTOMER") {
        navigate("/customer-dashboard");
      } else if (user.role === "PROVIDER") {
        navigate("/provider-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f4fbf4" }}>
      {/* Header */}
      <header
        className="py-4 shadow"
        style={{
          background: "linear-gradient(to right, #4dbb61ff 0%, #a0e2a3ff 50%, #4dbb61ff 100%)",
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bold text-black mb-1 display-6">BookUs</h1>
          <p className="text-black mb-0 fs-5">Your Smart Appointment Booking Companion</p>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="card shadow-sm my-5" style={{ width: "100%", maxWidth: "400px" }}>
          <div className="card-body px-4 py-4">
            <h4 className="mb-4 text-center">Welcome Back</h4>

            {error && (
              <div className="alert alert-danger py-2 text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-success w-100 mb-3" type="submit">
                Login
              </button>

              <div className="text-center">
                <small>
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-decoration-none fw-semibold text-success">
                    Sign Up
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "linear-gradient(to right, #4dbb61ff 0%, #a0e2a3ff 50%, #4dbb61ff 100%)",
          color: "black",
        }}
        className="py-3 text-center mt-auto"
      >
        <div className="container">
          <small className="text-black-80">© 2025 BookUs — All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}
