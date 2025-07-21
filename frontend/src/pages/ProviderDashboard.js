import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api/config";

export default function ProviderDashboard() {
  const user = JSON.parse(localStorage.getItem("bookus_user"));

  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [showFormForService, setShowFormForService] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: ""
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${API_URL}/services/provider/${user.id}`)
        .then((res) => {
          setServices(res.data);
          res.data.forEach((service) => fetchTimeSlots(service.id));
        })
        .catch((err) => console.error("Failed to load services", err));
    }
  }, []);

  const fetchTimeSlots = async (serviceId) => {
    try {
      const res = await axios.get(`${API_URL}/timeslots/service/${serviceId}`);
      setTimeSlots((prev) => ({
        ...prev,
        [serviceId]: res.data
      }));
    } catch (err) {
      console.error("Failed to fetch timeslots:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSlotSubmit = async (e, serviceId) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/timeslots/generate`, {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        providerId: user.id,
        serviceId: serviceId
      });

      setSuccessMsg("✅ Time slots created successfully!");
      setErrorMsg("");
      setFormData({ date: "", startTime: "", endTime: "" });
      setShowFormForService(null);
      fetchTimeSlots(serviceId); // reload time slots
    } catch (err) {
      console.error("Time slot creation failed:", err);
      setErrorMsg("❌ Failed to create time slots.");
      setSuccessMsg("");
    }
  };

  const renderTimeSlots = (slots) => {
    if (!slots || slots.length === 0) return <p>No time slots yet.</p>;

    return (
      <div className="mt-2 d-flex flex-wrap gap-2">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`badge rounded-pill px-3 py-2 ${
              slot.booked ? "bg-danger" : "bg-success"
            }`}
          >
            {slot.startTime}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name} 👋</h2>
      <p>You are logged in as <strong>PROVIDER</strong>.</p>

      <Link to="/createService" className="btn btn-primary mt-3">
        + Add New Service
      </Link>

      <Link to="/provider-appointments" className="btn btn-primary mt-3">
        + Appointments
      </Link>

      <div className="mt-4">
        <h4>Your Services</h4>

        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          <div className="row">
            {services.map((service) => (
              <div className="col-md-6 mb-3" key={service.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text">{service.description}</p>
                    <p>💰 {service.price} LKR</p>
                    <p>🕒 {service.durationInMinutes} minutes</p>
                    <p>📂 Category: {service.categoryName}</p>

                    <button
                      className="btn btn-sm btn-outline-success mb-2"
                      onClick={() =>
                        setShowFormForService(
                          showFormForService === service.id ? null : service.id
                        )
                      }
                    >
                      ➕ Add Time Slot
                    </button>

                    {showFormForService === service.id && (
                      <form
                        className="mt-2"
                        onSubmit={(e) => handleTimeSlotSubmit(e, service.id)}
                      >
                        <div className="mb-2">
                          <label>Date</label>
                          <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="mb-2">
                          <label>Start Time</label>
                          <input
                            type="time"
                            name="startTime"
                            className="form-control"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="mb-2">
                          <label>End Time</label>
                          <input
                            type="time"
                            name="endTime"
                            className="form-control"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <button className="btn btn-sm btn-success w-100">
                          Submit
                        </button>
                      </form>
                    )}

                    <h6 className="mt-3">🗓️ Time Slots:</h6>
                    {renderTimeSlots(timeSlots[service.id])}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
