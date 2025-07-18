import React from "react";
import { Link } from "react-router-dom";

export default function ProviderDashboard() {
  const user = JSON.parse(localStorage.getItem("bookus_user"));

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name} 👋</h2>
          <p>You are logged in as <strong>PROVIDER</strong>.</p>
          
          <Link to="/createService" className="btn btn-primary mt-3">
            + Add New Service
          </Link>

      <div className="mt-4">
        <h4>Your Services</h4>
        {/* Later: Add/manage services */}
      </div>
    </div>
  );
}
