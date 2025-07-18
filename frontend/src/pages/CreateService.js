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
            category: { id: parseInt(formData.categoryId) },
            provider: { id: provider.id }
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
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">Create New Service</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Service Name</label>
          <input
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Duration (in minutes)</label>
          <input
            type="number"
            name="durationInMinutes"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Price (LKR)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label>Category</label>
          <select
            name="categoryId"
            className="form-select"
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
  <option key={cat.id} value={cat.id}>{cat.name}</option>
))}

          </select>
        </div>

        <button className="btn btn-success w-100">Create Service</button>
      </form>
    </div>
  );
}