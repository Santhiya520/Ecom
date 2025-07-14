import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../App";
import axios from "axios";

const themeColor = "#2e6ab3";

const IndustriesList = () => {
  const [industries, setIndustries] = useState([]);

  const loadIndustries = () => {
    axios
      .get(BASE_URL + "/api/industries")
      .then((response) => response.data)
      .then((response_data) => {
        setIndustries(response_data.data);
      });
  };

  useEffect(() => {
    loadIndustries();
  }, []);

  const handleDelete = (id) => {
    axios.delete(BASE_URL + "/api/industries/" + id).then(() => {
      loadIndustries();
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: themeColor }}>Industries List</h3>
        <Link to="/industries-create" className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Create
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped mb-0">
          <thead className="table-header text-white" style={{ backgroundColor: themeColor }}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Subtitle</th>
              <th>Description 1</th>
              <th>Description 2</th>
              <th>List</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {industries.map((industry, index) => (
              <tr key={industry.id}>
                <td>{index + 1}</td>
                <td>{industry.title}</td>
                <td>
                  {industry.image && (
                    <img
                      src={`${BASE_URL}/${industry.image}`}
                      alt={industry.title}
                      width="100"
                      height="80"
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  )}
                </td>
                <td>{industry.subtitle || "-"}</td>
                <td>{industry.description1 || "-"}</td>
                <td>{industry.description2 || "-"}</td>
                <td>{industry.list || "-"}</td>
                <td style={{ width: "200px" }}>
                  <Link to={`/industries-edit/${industry.id}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(industry.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndustriesList;
