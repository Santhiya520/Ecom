import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate, Link, useParams } from "react-router-dom";

const SectionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);

  const themeColor = "#2e6ab3";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/section/${id}/edit`)
      .then((res) => {
        const section = res.data.data;
        setInputs({ title: section.title, body: section.body });
      })
      .catch(() => setError("Failed to load section details."));
  }, [id]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", inputs.title.trim());
    formData.append("body", inputs.body.trim());

    axios
      .post(`${BASE_URL}/api/section/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => navigate("/section-list"))
      .catch((error) => {
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          const errorMsg = Object.values(errors).flat().join(" ");
          setError(errorMsg);
        } else {
          setError("Unable to update section.");
        }
      });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: themeColor }}>Edit Section</h3>
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
          Update Section
        </button>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default SectionEdit;
