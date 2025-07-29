import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../api/config";

export default function BrowseServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const user = JSON.parse(localStorage.getItem("bookus_user"));

  useEffect(() => {
    axios.get(`${API_URL}/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to load categories"));
    loadServices(); // initial load
  }, []);

  const loadServices = async (categoryId = null) => {
    setLoading(true);
    try {
      const url = categoryId
        ? `${API_URL}/services/category/${categoryId}`
        : `${API_URL}/services/public`;
      const res = await axios.get(url);
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load services", err);
    }
    setLoading(false);
  };

  const handleBook = async (slot, service) => {
    if (!user) {
      alert("Please login to book an appointment.");
      return;
    }

    try {
      await axios.post(`${API_URL}/appointments/book`, {
        customerId: user.id,
        providerId: service.providerId,
        serviceId: service.id,
        timeSlotId: slot.id,
        note: note,
      });

      setBookingStatus(`✅ Appointment booked for ${slot.date} at ${slot.startTime}`);
      setSelectedSlot(null);
      setNote("");

      loadServices(selectedCategoryId);
      setTimeout(() => setBookingStatus(""), 5000);
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingStatus("❌ Booking failed. Please try again.");
    }
  };

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    loadServices(id);
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
          <p className="text-black mb-0 fs-5">Browse and Book Your Favorite Services</p>
        </div>
      </header>

      <div className="container flex-grow-1 py-5">
        <div className="mb-4 text-center">
          
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            <button
              className={`btn ${selectedCategoryId === null ? "btn-success" : "btn-outline-success"}`}
              onClick={() => handleCategoryClick(null)}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`btn ${selectedCategoryId === cat.id ? "btn-success" : "btn-outline-success"}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {bookingStatus && (
          <div
            className={`alert ${bookingStatus.startsWith("✅") ? "alert-success" : "alert-danger"}`}
          >
            {bookingStatus}
          </div>
        )}

        {loading ? (
          <p className="text-center">Loading services...</p>
        ) : services.length === 0 ? (
          <div className="alert alert-info text-center">No services available.</div>
        ) : (
          <div className="row">
            {services.map((service) => (
              <div className="col-md-6 col-lg-4 mb-4" key={service.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title text-success">{service.name}</h5>
                    <p>{service.description}</p>
                    <p>💰 {service.price} LKR</p>
                    <p>🕒 {service.durationInMinutes} minutes</p>
                    <p>📂 {service.categoryName}</p>
                    <p>👤 {service.providerName}</p>

                    <h6>🗓️ Time Slots</h6>
                    {service.availableTimeSlots.length === 0 ? (
                      <p>No available slots</p>
                    ) : (
                      <div className="d-flex flex-wrap gap-2">
                        {service.availableTimeSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className={`badge px-3 py-2 ${slot.booked ? "bg-danger" : "bg-success"} text-white`}
                            style={{ cursor: slot.booked ? "not-allowed" : "pointer" }}
                            onClick={() => !slot.booked && setSelectedSlot({ slot, service })}
                          >
                            {slot.date} - {slot.startTime}
                          </div>
                        ))}
                      </div>
                    )}
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

      {/* Booking Modal */}
      {selectedSlot && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content border-success">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">📝 Confirm Booking</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setSelectedSlot(null);
                    setNote("");
                  }}
                />
              </div>
              <div className="modal-body">
                <p><strong>Service:</strong> {selectedSlot.service.name}</p>
                <p><strong>Date:</strong> {selectedSlot.slot.date}</p>
                <p><strong>Time:</strong> {selectedSlot.slot.startTime}</p>
                <textarea
                  className="form-control mt-2"
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => handleBook(selectedSlot.slot, selectedSlot.service)}
                >
                  ✅ Confirm Booking
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedSlot(null);
                    setNote("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
