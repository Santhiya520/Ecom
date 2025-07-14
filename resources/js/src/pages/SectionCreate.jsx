import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../App";

const SectionCreate = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("body", inputs.body);

    axios
      .post(`${BASE_URL}/api/section`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => navigate("/section-list"))
      .catch(() => setError("Unable to create section."));
  };

  const themeColor = "#2e6ab3";

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: themeColor }}>Create Section</h3>
        <Link to="/section-list" className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Back
        </Link>
      </div>

      <form onSubmit={handleFormSubmit} className="p-4 shadow-sm border rounded bg-white" encType="multipart/form-data">
        <div className="form-group mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Body</label>
          <textarea
            className="form-control"
            name="body"
            value={inputs.body}
            onChange={handleChange}
            placeholder="Enter body"
            rows="5"
            required
          ></textarea>
        </div>

        <button className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Save Section
        </button>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default SectionCreate;
