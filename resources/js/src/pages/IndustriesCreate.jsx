import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate, Link } from "react-router-dom";

const themeColor = "#2e6ab3";

const IndustriesCreate = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    section_id: "",
    title: "",
    subtitle: "",
    description1: "",
    description2: "",
    description3: "",
    list: ""
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/section`)
      .then(res => setSections(res.data.data))
      .catch(() => setError("Failed to load sections."));
  }, []);

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in inputs) {
      formData.append(key, inputs[key]);
    }
    if (image) {
      formData.append("image", image);
    }

    axios.post(`${BASE_URL}/api/industries`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => navigate("/industries-list"))
      .catch(() => setError("Unable to create industry."));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: themeColor }}>Create Industry</h3>
        <Link to="/industries-list" className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Back
        </Link>
      </div>

      <form onSubmit={handleFormSubmit} className="p-4 shadow-sm border rounded bg-white" encType="multipart/form-data">
        <div className="form-group mb-3">
          <label className="form-label">Section</label>
          <select
            className="form-control"
            name="section_id"
            value={inputs.section_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Section --</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>{section.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
            placeholder="Enter title"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Image</label>
          <input
            className="form-control"
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Subtitle</label>
          <textarea
            className="form-control"
            name="subtitle"
            rows="2"
            value={inputs.subtitle}
            onChange={handleChange}
            placeholder="Enter subtitle"
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Description 1</label>
          <textarea
            className="form-control"
            name="description1"
            rows="3"
            value={inputs.description1}
            onChange={handleChange}
            placeholder="Enter first description"
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Description 2</label>
          <textarea
            className="form-control"
            name="description2"
            rows="3"
            value={inputs.description2}
            onChange={handleChange}
            placeholder="Enter second description"
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Description 3</label>
          <textarea
            className="form-control"
            name="description3"
            rows="3"
            value={inputs.description3}
            onChange={handleChange}
            placeholder="Enter third description"
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <label className="form-label">List</label>
          <textarea
            className="form-control"
            name="list"
            rows="3"
            value={inputs.list}
            onChange={handleChange}
            placeholder="Enter list items"
          ></textarea>
        </div>

        <button className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Save Industry
        </button>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default IndustriesCreate;
