import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { Link } from "react-router-dom";

export default function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("bookus_user"));

  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");

  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, []);

  const fetchAppointments = () => {
    axios
      .get(`${API_URL}/appointments/customer/${user.id}/pending`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Failed to load appointments", err));
  };

  const handleEdit = (id, currentNote) => {
    setEditingId(id);
    setEditNote(currentNote || "");
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${API_URL}/appointments/${id}/note`, editNote);
      setEditingId(null);
      fetchAppointments();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await axios.delete(`${API_URL}/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error("Delete failed:", err);
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
          <p className="text-black mb-0 fs-5">Your Smart Appointment Booking Companion</p>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container flex-grow-1 py-5">
        <div className="mb-4 text-center">
          <h2>Welcome, {user?.name} 👋</h2>
          <p className="text-muted">You are logged in as <strong>CUSTOMER</strong></p>
          <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            <Link to="/browse" className="btn btn-success px-4">
              Browse & Book Services
            </Link>
            <Link to="/customer-profile" className="btn btn-outline-success px-4">
              View Profile
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="mb-3">📅 Pending Appointments</h4>

          {appointments.length === 0 ? (
            <div className="alert alert-info text-center">No pending appointments.</div>
          ) : (
            <div className="row">
              {appointments.map((appt) => (
                <div key={appt.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title text-success">{appt.serviceName}</h5>
                      <p className="mb-1"><strong>Date:</strong> {appt.date}</p>
                      <p className="mb-2"><strong>Time:</strong> {appt.time}</p>

                      {editingId === appt.id ? (
                        <>
                          <textarea
                            className="form-control mb-2"
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                          />
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleSave(appt.id)}
                            >
                              💾 Save
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => setEditingId(null)}
                            >
                              ✖ Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {appt.note && <p className="text-muted mt-2">📝 {appt.note}</p>}
                          <div className="d-flex gap-2 flex-wrap mt-2">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(appt.id, appt.note)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(appt.id)}
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
