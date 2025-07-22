import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";

export default function CustomerProfile() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("bookus_user"));

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

    return (
        <div className="container mt-5">
            <h2>👤 My Profile</h2>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{user?.name}</h5>
                    <p className="card-text"><strong>Email:</strong> {user?.email}</p>
                    <p className="card-text"><strong>Role:</strong> {user?.role}</p>
                </div>
            </div>

            {statusMessage && (
                <div className={`alert ${statusMessage.startsWith("✅") ? "alert-success" : "alert-danger"}`}>
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
