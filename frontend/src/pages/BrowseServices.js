import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../api/config";

export default function BrowseServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

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
                                            {service.availableTimeSlots.map((slot) => (
                                                <div key={slot.id} className="badge bg-success px-3 py-2">
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
    );
}
