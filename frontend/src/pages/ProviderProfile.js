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
    <div className="container mt-5">
      <h2>👤 Provider Profile</h2>

      <div className="card mb-4">
        <div className="card-body">
          {editing ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" />
              </div>
              <button type="submit" className="btn btn-success me-2">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
            </form>
          ) : (
            <>
              <h5 className="card-title">{user?.name}</h5>
              <p className="card-text"><strong>Email:</strong> {user?.email}</p>
              <p className="card-text"><strong>Role:</strong> {user?.role}</p>
              <button onClick={() => setEditing(true)} className="btn btn-outline-primary mt-2">
                ✏️ Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="text-end">
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>
    </div>
  );
}
