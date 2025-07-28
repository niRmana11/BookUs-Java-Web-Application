import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { useNavigate } from "react-router-dom";

export default function CustomerProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("bookus_user"));
  const [user, setUser] = useState(storedUser);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, [user?.id]);

  const fetchAppointments = () => {
    axios
      .get(`${API_URL}/appointments/customer/${user.id}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Failed to fetch appointments", err))
      .finally(() => setLoading(false));
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.put(`${API_URL}/appointments/${appointmentId}/status`, `"CANCELLED"`, {
        headers: { "Content-Type": "application/json" },
      });
      setStatusMessage(`✅ Appointment #${appointmentId} cancelled`);
      fetchAppointments();
      setTimeout(() => setStatusMessage(""), 4000);
    } catch (error) {
      console.error("Failed to cancel appointment", error);
      setStatusMessage("❌ Failed to cancel appointment");
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-warning";
      case "CONFIRMED":
        return "bg-success";
      case "COMPLETED":
        return "bg-primary";
      case "CANCELLED":
        return "bg-secondary";
      default:
        return "bg-light";
    }
  };

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
      console.error("Profile update failed", err);
      alert("❌ Failed to update profile.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>👤 My Profile</h2>

      <div className="card mb-4">
        <div className="card-body">
          {editing ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h5 className="card-title">{user?.name}</h5>
              <p className="card-text"><strong>Email:</strong> {user?.email}</p>
              <p className="card-text"><strong>Role:</strong> {user?.role}</p>
              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            </>
          )}
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger mt-3 mx-3">
          Logout
        </button>
      </div>

      {statusMessage && (
        <div
          className={`alert ${statusMessage.startsWith("✅") ? "alert-success" : "alert-danger"}`}
        >
          {statusMessage}
        </div>
      )}

      <h4>📅 Appointment History</h4>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.serviceName}</td>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>{app.note || "-"}</td>
                  <td>
                    {(app.status === "PENDING" || app.status === "CONFIRMED") && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleCancel(app.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
