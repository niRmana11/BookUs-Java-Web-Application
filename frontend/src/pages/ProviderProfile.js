import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/config";

export default function ProviderProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("bookus_user"));
  const [user, setUser] = useState(storedUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "", // optional
  });

  const handleLogout = () => {
    localStorage.removeItem("bookus_user");
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/users/${user.id}`, form);
      localStorage.setItem("bookus_user", JSON.stringify(res.data));
      setUser(res.data);
      setEditing(false);
      alert("✅ Profile updated!");
    } catch (err) {
      console.error("Update failed", err);
      alert("❌ Failed to update profile");
    }
  };

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
        <p className="text-black mb-0 fs-5">Manage Your Provider Profile</p>
      </div>
    </header>

    {/* Profile Content */}
    <div className="container flex-grow-1 py-5" style={{ maxWidth: "700px" }}>
      <h3 className="mb-4 text-center">👤 Provider Profile</h3>

      <div className="card shadow-sm">
        <div className="card-body">
          {editing ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="submit" className="btn btn-success">
                  ✅ Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn btn-secondary"
                >
                  ✖ Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h5 className="card-title">{user?.name}</h5>
              <p className="card-text">
                <strong>Email:</strong> {user?.email}
              </p>
              <p className="card-text">
                <strong>Role:</strong> {user?.role}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="btn btn-outline-primary mt-2"
              >
                ✏️ Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="text-end mt-3">
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>
    </div>

    {/* Footer */}
    <footer
      className="py-3 text-center mt-auto"
      style={{
        background: "linear-gradient(to right, #4dbb61ff 0%, #a0e2a3ff 50%, #4dbb61ff 100%)",
        color: "black",
      }}
    >
      <div className="container">
        <small className="text-black-80">© 2025 BookUs — All rights reserved.</small>
      </div>
    </footer>
  </div>
);

}
