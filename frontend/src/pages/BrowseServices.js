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

      // Refresh
      setLoading(true);
      const res = await axios.get(`${API_URL}/services/public`);
      setServices(res.data);
      setLoading(false);
      setTimeout(() => setBookingStatus(""), 5000);
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingStatus("❌ Booking failed. Please try again.");
    }
  };

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

  const handleCategoryClick = (id) => {
  setSelectedCategoryId(id);
  loadServices(id);
};


  useEffect(() => {
    axios
      .get(`${API_URL}/services/public`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Failed to load services", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Services</h2>

      <div className="mb-4">
  <button
    className={`btn me-2 ${selectedCategoryId === null ? "btn-primary" : "btn-outline-primary"}`}
    onClick={() => handleCategoryClick(null)}
  >
    All
  </button>
  {categories.map((cat) => (
    <button
      key={cat.id}
      className={`btn me-2 ${selectedCategoryId === cat.id ? "btn-primary" : "btn-outline-primary"}`}
      onClick={() => handleCategoryClick(cat.id)}
    >
      {cat.name}
    </button>
  ))}
</div>


      {bookingStatus && (
        <div
          className={`alert ${bookingStatus.startsWith("✅") ? "alert-success" : "alert-danger"}`}
        >
          {bookingStatus}
        </div>
      )}

      {loading ? (
        <p>Loading services...</p>
      ) : services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div className="col-md-6 mb-4" key={service.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">{service.description}</p>
                  <p>💰 {service.price} LKR</p>
                  <p>🕒 {service.durationInMinutes} minutes</p>
                  <p>📂 Category: {service.categoryName}</p>
                  <p>👤 Provider: {service.providerName}</p>

                  <h6 className="mt-3">🗓️ Available Time Slots</h6>
                  {service.availableTimeSlots.length === 0 ? (
                    <p>No available slots.</p>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {service.availableTimeSlots.map((slot) => {
                        const slotClass = slot.booked
                          ? "bg-danger text-white"
                          : "bg-success text-white clickable";

                        return (
                          <div
                            key={slot.id}
                            className={`badge px-3 py-2 ${slotClass}`}
                            style={{ cursor: slot.booked ? "not-allowed" : "pointer" }}
                            onClick={() =>
                              !slot.booked && setSelectedSlot({ slot, service })
                            }
                          >
                            {slot.date} - {slot.startTime}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedSlot && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger text-white">
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
                  className="form-control mb-2"
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleBook(selectedSlot.slot, selectedSlot.service)
                  }
                >
                  Confirm Booking
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
