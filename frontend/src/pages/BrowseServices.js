import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../api/config";

export default function BrowseServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingStatus, setBookingStatus] = useState("");

    const user = JSON.parse(localStorage.getItem("bookus_user"));

    // Booking handler
    const handleBook = async (slot, service) => {
        if (!user) {
            alert("Please login to book an appointment.");
            return;
        }

        try {
            await axios.post(`${API_URL}/appointments/book`, {
                customerId: user.id,
                providerId: service.providerId, // Make sure your DTO sends providerId
                serviceId: service.id,
                timeSlotId: slot.id,
            });

            setBookingStatus(`✅ Appointment booked for ${slot.date} at ${slot.startTime}`);

            // Refresh the services to get updated slot availability (optional)
            setLoading(true);
            const res = await axios.get(`${API_URL}/services/public`);
            setServices(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Booking failed:", error);
            setBookingStatus("❌ Booking failed. Please try again.");
        }
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

            {bookingStatus && (
                <div
                    className={`alert ${bookingStatus.startsWith("✅") ? "alert-success" : "alert-danger"
                        }`}
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
                            onClick={() => !slot.booked && handleBook(slot, service)}
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
        </div>
    );
}
