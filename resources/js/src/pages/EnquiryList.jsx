import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";

const themeColor = "#2e6ab3";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/enquiries`)
      .then((res) => setEnquiries(res.data.data))
      .catch(() => alert("Failed to load enquiries"));
  }, []);

  return (
    <div className="container py-4">
      {/* Embedded CSS */}
      <style>{`
        .enquiry-table thead th {
          background-color: ${themeColor};
          color: #fff;
        }
        .enquiry-table tbody tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: themeColor }}>Enquiry List</h3>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-nowrap mb-0 enquiry-table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((enquiry, index) => (
                <tr key={enquiry.id}>
                  <td>{index + 1}</td>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phone}</td>
                  <td style={{width:"50%"}}>{enquiry.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryList;
