import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate, Link } from "react-router-dom";

const UserCreate = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/users`, inputs)
      .then(() => navigate("/user-list"))
      .catch(() => setError("Unable to create user."));
  };

  const themeColor = "#2e6ab3";

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: themeColor }}>Create User</h3>
        <Link to="/user-list" className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="p-4 shadow-sm border rounded bg-white">
        <div className="form-group mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button
          className="btn"
          style={{ backgroundColor: themeColor, color: "#fff" }}
        >
          Save User
        </button>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default UserCreate;
