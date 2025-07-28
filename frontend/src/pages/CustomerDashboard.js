import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { Link } from "react-router-dom";


export default function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("bookus_user"));

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios.get(`${API_URL}/appointments/customer/${user.id}/pending`)
        .then(res => setAppointments(res.data))
        .catch(err => console.error("Failed to load appointments", err));
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name} 👋</h2>
      <p>You are logged in as <strong>CUSTOMER</strong>.</p>


      <Link to="/browse" className="btn btn-primary mt-3">
        Browse & Book Services
      </Link>
      <Link to="/customer-profile" className="btn btn-primary mt-3">
        Profile
      </Link>


      <div className="mt-4">
        <h4>Pending Appointments</h4>
        {appointments.length === 0 ? (
          <p>No pending appointments.</p>
        ) : (
          <ul className="list-group">
            {appointments.map((appt) => (
              <li key={appt.id} className="list-group-item">
                {appt.serviceName} - {appt.date} at {appt.time}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
