import React from "react";
import { Link } from "react-router-dom";


export default function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("bookus_user"));

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name} 👋</h2>
      <p>You are logged in as <strong>CUSTOMER</strong>.</p>

     
<Link to="/browse" className="btn btn-primary mt-3">
  Browse & Book Services
</Link>


      <div className="mt-4">
        <h4>Upcoming Appointments</h4>
        {/* Later: List appointments */}
      </div>
    </div>
  );
}
