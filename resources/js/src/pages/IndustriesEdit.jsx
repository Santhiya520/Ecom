import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate, Link, useParams } from "react-router-dom";

const themeColor = "#2e6ab3";

const IndustriesEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    title: "",
    subtitle: "",
    description1: "",
    description2: "",
    description3: "",
    list: "",
    section_id: "",
  });

  const [sections, setSections] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/industries/${id}/edit`)
      .then((res) => {
        const data = res.data.data;
        setInputs({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description1: data.description1 || "",
          description2: data.description2 || "",
          description3: data.description3 || "",
          list: data.list || "",
          section_id: data.section_id || "",
        });
        setCurrentImage(data.image);
      })
      .catch(() => setError("Failed to load industry details."));

    axios.get(`${BASE_URL}/api/section`)
      .then((res) => setSections(res.data.data || []))
      .catch(() => setSections([]));
  }, [id]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in inputs) {
      formData.append(key, inputs[key]);
    }
    if (newImage) {
      formData.append("image", newImage);
    }

    axios.post(`${BASE_URL}/api/industries/${id}?_method=PUT`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => navigate("/industries-list"))
      .catch((error) => {
        if (error.response?.data?.errors) {
          const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
          setError(errorMsg);
        } else {
          setError("Unable to update industry.");
        }
      });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: themeColor }}>Edit Industry</h3>
        <Link to="/industries-list" className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Back
        </Link>
      </div>

      <form onSubmit={handleFormSubmit} className="p-4 shadow-sm border rounded bg-white" encType="multipart/form-data">
        <div className="form-group mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" name="title" value={inputs.title} onChange={handleChange} required />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Section</label>
          <select className="form-control" name="section_id" value={inputs.section_id} onChange={handleChange}>
            <option value="">-- Select Section --</option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>{section.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Subtitle</label>
          <textarea className="form-control" name="subtitle" rows="2" value={inputs.subtitle} onChange={handleChange} />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Description 1</label>
          <textarea className="form-control" name="description1" rows="2" value={inputs.description1} onChange={handleChange} />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Description 2</label>
          <textarea className="form-control" name="description2" rows="2" value={inputs.description2} onChange={handleChange} />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Description 3</label>
          <textarea className="form-control" name="description3" rows="2" value={inputs.description3} onChange={handleChange} />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">List</label>
          <textarea className="form-control" name="list" rows="2" value={inputs.list} onChange={handleChange} />
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
          {currentImage && !newImage && (
            <div className="mt-2">
              <p className="mb-1">Current Image:</p>
              <img src={`${BASE_URL}/${currentImage}`} alt="Current" style={{ maxWidth: "200px", border: "1px solid #ddd" }} />
            </div>
          )}
          {newImage && (
            <div className="mt-2">
              <p className="mb-0">New Image Selected: <strong>{newImage.name}</strong></p>
            </div>
          )}
        </div>

        <button className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Update Industry
        </button>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default IndustriesEdit;
