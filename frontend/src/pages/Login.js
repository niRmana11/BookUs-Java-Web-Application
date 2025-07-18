import axios from "axios";
import React, { useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import API_URL from "../api/config";

export default function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/users/login`, formData);
            console.log(res.data);

            // Optional: Save user to localStorage or context
            localStorage.setItem("bookus_user", JSON.stringify(res.data));

            navigate("/");

        } catch(err) {
            console.error(err);
            setError("Invalid email or password. Please try again.")
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
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

                <button className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
}