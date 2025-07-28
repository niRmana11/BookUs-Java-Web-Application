import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import CreateService from "./pages/CreateService";
import BrowseServices from "./pages/BrowseServices";
import ProviderAppointments from "./pages/ProviderAppointments";
import CustomerProfile from "./pages/CustomerProfile";
import ProviderProfile from "./pages/ProviderProfile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/createService" element={<CreateService />} />
        <Route path="/browse" element={<BrowseServices />} />
        <Route path="/provider-appointments" element={<ProviderAppointments />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/provider-profile" element={<ProviderProfile />} />


      </Routes>
    </Router>
  )
}

export default App;