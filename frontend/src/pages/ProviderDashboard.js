import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api/config";

export default function ProviderDashboard() {
    const user = JSON.parse(localStorage.getItem("bookus_user"));
    
    const [services, setServices] = useState([]);

    useEffect(() => {
    
    if (user?.id) {
        axios
            .get(`${API_URL}/services/provider/${user.id}`)
            .then((res) => setServices(res.data))
            .catch((err) => console.error("Failed to load services", err));
    }
}, []);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name} 👋</h2>
          <p>You are logged in as <strong>PROVIDER</strong>.</p>
          
          <Link to="/createService" className="btn btn-primary mt-3">
            + Add New Service
          </Link>

      <div className="mt-4">
        <h4>Your Services</h4>
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
                  {/* 🔜 Add time slot button here later */}
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
