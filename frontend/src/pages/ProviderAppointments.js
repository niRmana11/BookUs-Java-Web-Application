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
    }, [provider]);

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            await axios.put(`${API_URL}/appointments/${appointmentId}/status`, `"${newStatus}"`, {
                headers: { "Content-Type": "application/json" },
            });

            setStatusMessage(`✅ Appointment #${appointmentId} updated to ${newStatus}`);
            // Refresh list
            const res = await axios.get(`${API_URL}/appointments/provider/${provider.id}`);
            setAppointments(res.data);
            setTimeout(() => setStatusMessage(""), 5000);
        } catch (error) {
            console.error("Status update failed", error);
            setStatusMessage("❌ Failed to update status");
        }
    };

    return (
        <div className="container mt-5">
            <h2>📋 Your Appointments</h2>

            {statusMessage && (
                <div className={`alert ${statusMessage.startsWith("✅") ? "alert-success" : "alert-danger"}`}>
                    {statusMessage}
                </div>
            )}

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
                                <tr key={app.id}>
                                    <td>{app.id}</td>
                                    <td>{app.customer?.name || "N/A"}</td>
                                    <td>{app.service?.name}</td>
                                    <td>{app.timeSlot?.date}</td>
                                    <td>{app.timeSlot?.startTime}</td>
                                    <td>
                                        <span className="badge bg-info">{app.status}</span>
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
    );
}
