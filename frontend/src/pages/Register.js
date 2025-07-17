import React, { useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CUSTOMER", // default
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/users`, formData);
            console.log(res.data);
            setSuccess("Registered successfully! Redirecting to Login Page");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            setError("Registration failed! Please try again.");
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h3 className="mb-4">Register</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{ success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Role</label>
                    <select
                        name="role"
                        className="form-select"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="PROVIDER">Provider</option>
                    </select>
                </div>

                <button className="btn btn-success w-100">Register</button>
            </form>
        </div>
    );
}