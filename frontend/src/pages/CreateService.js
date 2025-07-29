import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { useNavigate } from "react-router-dom";

export default function CreateService() {
  const navigate = useNavigate();
  const provider = JSON.parse(localStorage.getItem("bookus_user"));

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    durationInMinutes: "",
    price: "",
    categoryId: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // load categories
  useEffect(() => {
    axios.get(`${API_URL}/categories`)
      .then(res => {

        setCategories(res.data);
      })
      .catch(err => {
        console.error("Error loading categories:", err);
        setCategories([]); // fallback to empty array
        setError("Failed to load categories");
      });
  }, []);


  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      durationInMinutes: parseInt(formData.durationInMinutes),
      price: parseFloat(formData.price),
      categoryId: parseInt(formData.categoryId),
      providerId: provider.id
    };


    try {
      await axios.post(`${API_URL}/services`, payload);
      setSuccess("Service created successfully");

      setTimeout(() => {
        navigate("/provider-dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Error creating service. Try again.");
    }
  }

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
        <p className="text-black mb-0 fs-5">Create New Service</p>
      </div>
    </header>

    {/* Main Form Content */}
    <div className="container flex-grow-1 py-5" style={{ maxWidth: "600px" }}>
      <div className="text-center mb-4">
        <h3 className="fw-semibold">Add Your Service</h3>
        <p className="text-muted">Fill in the form below to create a new service offering.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        <div className="mb-3">
          <label className="form-label">Service Name</label>
          <input
            name="name"
            className="form-control"
            placeholder="Enter service name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            placeholder="Enter a short description"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Duration (minutes)</label>
            <input
              type="number"
              name="durationInMinutes"
              className="form-control"
              placeholder="e.g. 60"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Price (LKR)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="e.g. 2500"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Category</label>
          <select
            name="categoryId"
            className="form-select"
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <button className="btn btn-success w-100">Create Service</button>
      </form>
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