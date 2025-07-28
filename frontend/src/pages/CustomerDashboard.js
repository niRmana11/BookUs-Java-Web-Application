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
      axios.get(`${API_URL}/appointments/customer/${user.id}/pending`)
        .then(res => setAppointments(res.data))
        .catch(err => console.error("Failed to load appointments", err));
    }
  }, []);

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

  const fetchAppointments = () => {
    axios
      .get(`${API_URL}/appointments/customer/${user.id}/pending`)
      .then(res => setAppointments(res.data))
      .catch(err => console.error("Failed to load appointments", err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await axios.delete(`${API_URL}/appointments/${id}`);
      fetchAppointments(); // refetch list
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };


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
                <strong>{appt.serviceName}</strong> - {appt.date} at {appt.time}

                {editingId === appt.id ? (
                  <>
                    <textarea
                      className="form-control mt-2"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                    />
                    <button className="btn btn-sm btn-success mt-2 me-2" onClick={() => handleSave(appt.id)}>Save</button>
                    <button className="btn btn-sm btn-secondary mt-2" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {appt.note && <p className="mt-2">📝 {appt.note}</p>}
                    <button className="btn btn-sm btn-outline-primary me-2 mt-2" onClick={() => handleEdit(appt.id, appt.note)}>✏️ Edit</button>
                    <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => handleDelete(appt.id)}>🗑 Delete</button>
                  </>
                )}
              </li>

            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
