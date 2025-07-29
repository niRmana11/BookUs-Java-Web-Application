import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api/config";

export default function ProviderDashboard() {
  const user = JSON.parse(localStorage.getItem("bookus_user"));

  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [showFormForService, setShowFormForService] = useState(null);
  const [formData, setFormData] = useState({ date: "", startTime: "", endTime: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [editServiceId, setEditServiceId] = useState(null);
  const [categories, setCategories] = useState([]);




  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    durationInMinutes: "",
    categoryId: ""
  });

  useEffect(() => {
  if (successMsg || errorMsg) {
    const timer = setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Clear timeout if component unmounts or re-renders
  }
}, [successMsg, errorMsg]);


  const fetchServices = () => {
    if (user?.id) {
      axios
        .get(`${API_URL}/services/provider/${user.id}`)
        .then((res) => {
          setServices(res.data);
          res.data.forEach((service) => fetchTimeSlots(service.id));
        })
        .catch((err) => console.error("Failed to load services", err));
    }
  };

  useEffect(() => {
    axios.get(`${API_URL}/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to load categories", err));
    fetchServices();
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleTimeSlotSubmit = async (e, serviceId) => {
    e.preventDefault();

    console.log("Sending time slot:", {
    date: formData.date,
    startTime: formData.startTime,
    endTime: formData.endTime,
    providerId: user.id,
    serviceId,
  });

    try {
      await axios.post(`${API_URL}/timeslots/generate`, {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        providerId: user.id,
        serviceId
      });

      setSuccessMsg("✅ Time slots created successfully!");
      setErrorMsg("");
      setFormData({ date: "", startTime: "", endTime: "" });
      setShowFormForService(null);
      fetchTimeSlots(serviceId);
    } catch (err) {
      console.error("Time slot creation failed:", err);
      setErrorMsg("❌ Failed to create time slots.");
      setSuccessMsg("");
    }
  };

  const startEditService = (service) => {
    setEditServiceId(service.id);
    setEditForm({
      name: service.name,
      description: service.description,
      price: service.price,
      durationInMinutes: service.durationInMinutes,
      categoryId: service.categoryId || "", // backend might need it
    });
  };

  const submitEditService = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/services/${editServiceId}`, {
        ...editForm,
        providerId: user.id,
      });

      await axios.delete(`${API_URL}/timeslots/service/${editServiceId}`);

      setSuccessMsg("✅ Service updated successfully!");
      setEditServiceId(null);

      setTimeSlots(prev => {
      const copy = { ...prev };
      delete copy[editServiceId];
      return copy;
    });
      fetchServices();
    } catch (err) {
      console.error("Update failed", err);
      setErrorMsg("❌ Failed to update service.");
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`${API_URL}/services/${id}`);
      setSuccessMsg("✅ Service deleted successfully!");
      fetchServices();
    } catch (err) {
      console.error("Delete failed", err);
      setErrorMsg("❌ Failed to delete service.");
    }
  };

  const renderTimeSlots = (slots) => {
    if (!slots || slots.length === 0) return <p>No time slots yet.</p>;
    return (
      <div className="mt-2 d-flex flex-wrap gap-2">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`badge rounded-pill px-3 py-2 ${slot.booked ? "bg-danger" : "bg-success"}`}
          >
            {slot.startTime}
          </div>
        ))}
      </div>
    );
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
        <p className="text-black mb-0 fs-5">Provider Dashboard</p>
      </div>
    </header>

    {/* Main Content */}
    <div className="container flex-grow-1 py-5">
      <div className="text-center mb-4">
        <h2>Welcome, {user?.name} 👋</h2>
        <p className="text-muted">You are logged in as <strong>PROVIDER</strong></p>
        <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
          <Link to="/createService" className="btn btn-success">+ Add New Service</Link>
          <Link to="/provider-appointments" className="btn btn-outline-dark">📋 View Appointments</Link>
          <Link to="/provider-profile" className="btn btn-outline-success">👤 Profile</Link>
        </div>
      </div>

      <h4 className="mb-3">🛠️ Your Services</h4>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {services.length === 0 ? (
        <div className="alert alert-info text-center">No services found.</div>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div className="col-md-6 mb-4" key={service.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  {editServiceId === service.id ? (
                    <form onSubmit={submitEditService}>
                      {/* Edit Form */}
                      {["name", "description", "price", "durationInMinutes"].map((field, idx) => (
                        <div className="mb-2" key={idx}>
                          <input
                            type={field === "price" || field === "durationInMinutes" ? "number" : "text"}
                            className="form-control"
                            name={field}
                            placeholder={field}
                            value={editForm[field]}
                            onChange={handleEditInputChange}
                            required
                          />
                        </div>
                      ))}
                      <div className="mb-2">
                        <select
                          className="form-control"
                          name="categoryId"
                          value={editForm.categoryId}
                          onChange={handleEditInputChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <button className="btn btn-sm btn-success w-100">✅ Update</button>
                    </form>
                  ) : (
                    <>
                      <h5 className="card-title text-success">{service.name}</h5>
                      <p className="card-text">{service.description}</p>
                      <p>💰 {service.price} LKR</p>
                      <p>🕒 {service.durationInMinutes} minutes</p>
                      <p>📂 Category: {service.categoryName}</p>
                    </>
                  )}

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
                    <form onSubmit={(e) => handleTimeSlotSubmit(e, service.id)} className="mt-2">
                      {["date", "startTime", "endTime"].map((field, idx) => (
                        <div className="mb-2" key={idx}>
                          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                          <input
                            type={field === "date" ? "date" : "time"}
                            name={field}
                            className="form-control"
                            value={formData[field]}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      ))}
                      <button className="btn btn-sm btn-success w-100">Submit</button>
                    </form>
                  )}

                  <h6 className="mt-3">🗓️ Time Slots:</h6>
                  {renderTimeSlots(timeSlots[service.id])}
                </div>

                <div className="d-flex justify-content-between p-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => startEditService(service)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteService(service.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
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
