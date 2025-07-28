import React, { useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER", // default
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/users`, formData);
      console.log(res.data);
      setSuccess("Registered successfully! Redirecting to Login Page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Registration failed! Please try again.");
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

      {/* Form Card */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="card shadow-sm my-5" style={{ width: "100%", maxWidth: "500px" }}>
          <div className="card-body px-4 py-4">
            <h4 className="mb-4 text-center">Create Your Account</h4>

            {error && (
              <div className="alert alert-danger text-center py-2" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success text-center py-2" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Register As</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="PROVIDER">Provider</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success w-100 mb-3">
                Register
              </button>

              <div className="text-center">
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none fw-semibold text-success">
                    Login
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
