import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../App";

const themeColor = "#2e6ab3";

const SectionList = () => {
  const [section, setSection] = useState([]);

  const loadSection = () => {
    axios.get(BASE_URL + "/api/section")
      .then((response) => response.data)
      .then((response_data) => {
        let section = response_data.data;
        setSection(section);
      });
  };

  useEffect(() => {
    loadSection();
  }, []);

  const handleDelete = (id) => {
    axios.delete(BASE_URL + "/api/section/" + id).then(() => {
      loadSection();
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: themeColor }}>Section List</h3>
        <Link to="/section-create" className="btn" style={{ backgroundColor: themeColor, color: "#fff" }}>
          Create
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped mb-0 table-fixed">
          <thead className="table-header text-white" style={{ backgroundColor: themeColor }}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th style={{width:"50%"}}>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {section.map((section, index) => (
              <tr key={section.id}>
                <td>{index + 1}</td>
                <td>{section.title}</td>
                <td>{section.body}</td>
                <td style={{ width: "200px" }}>
                  <Link to={`/section-edit/${section.id}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(section.id)}
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

export default SectionList;
