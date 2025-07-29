import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";

export default function ProviderAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");

    const provider = JSON.parse(localStorage.getItem("bookus_user"));

    useEffect(() => {
        if (provider?.id) {
            axios
                .get(`${API_URL}/appointments/provider/${provider.id}`)
                .then((res) => setAppointments(res.data))
                .catch((err) => console.error("Failed to fetch appointments", err))
                .finally(() => setLoading(false));
        }
    }, [provider?.id]);

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            await axios.put(`${API_URL}/appointments/${appointmentId}/status`, `"${newStatus}"`, {
                headers: { "Content-Type": "application/json" },
            });

            setStatusMessage(`✅ Appointment #${appointmentId} updated to ${newStatus}`);

            const res = await axios.get(`${API_URL}/appointments/provider/${provider.id}`);
            setAppointments(res.data);

            setTimeout(() => setStatusMessage(""), 5000);
        } catch (error) {
            console.error("Status update failed", error);
            setStatusMessage("❌ Failed to update status");
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
        <p className="text-black mb-0 fs-5">Manage Appointments</p>
      </div>
    </header>

    {/* Main Content */}
    <div className="container flex-grow-1 py-5">
      <h3 className="mb-4 text-center">📋 Your Appointment Schedule</h3>

      {statusMessage && (
        <div
          className={`alert ${
            statusMessage.startsWith("✅") ? "alert-success" : "alert-danger"
          } text-center`}
        >
          {statusMessage}
        </div>
      )}

      {loading ? (
        <p className="text-center">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <div className="alert alert-info text-center">No appointments found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover shadow-sm bg-white rounded">
            <thead className="table-success text-center">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app.id} className="align-middle text-center">
                  <td>{app.id}</td>
                  <td>{app.customerName}</td>
                  <td>{app.serviceName}</td>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === "PENDING"
                          ? "bg-warning text-dark"
                          : app.status === "CONFIRMED"
                          ? "bg-success"
                          : app.status === "COMPLETED"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>{app.note || "-"}</td>
                  <td>
                    {app.status === "PENDING" && (
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleStatusChange(app.id, "CONFIRMED")}
                      >
                        Confirm
                      </button>
                    )}
                    {app.status === "CONFIRMED" && (
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleStatusChange(app.id, "COMPLETED")}
                      >
                        Complete
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
