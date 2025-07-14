import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [counts, setCounts] = useState({
    users: 0,
    industries: 0,
    sections: 0,
    enquiries: 0,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard-counts")
      .then((res) => setCounts(res.data))
      .catch((err) => console.error("Dashboard count error:", err));
  }, []);

  const cards = [
    {
      title: "Users",
      count: counts.users,
      text: "Users in the system",
      color: "#f6c23e",
      icon: "👤",
    },
    {
      title: "Industries",
      count: counts.industries,
      text: "Industries listed",
      color: "#1cc88a",
      icon: "🏭",
    },
    {
      title: "Sections",
      count: counts.sections,
      text: "Sections available",
      color: "#4e73df",
      icon: "📂",
    },
    {
      title: "Enquiries",
      count: counts.enquiries,
      text: "Enquiries received",
      color: "#e74a3b",
      icon: "✉️",
    },
  ];

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-2">👋 Welcome to the Admin Dashboard</h2>
      <p className="text-muted">
        Hello <strong>{user?.name || "Admin"}</strong>, manage your site content from here.
      </p>

      <div className="row g-4 mt-4">
        {cards.map((card, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div
              className="shadow-lg rounded-4 p-4 text-white h-100"
              style={{ backgroundColor: card.color }}
            >
              <div className="d-flex flex-column align-items-center text-center">
                <div style={{ fontSize: "2.5rem" }}>{card.icon}</div>
                <h5 className="mt-2 mb-1 fw-bold">{card.title}</h5>
                <h2 className="fw-bold">{card.count}</h2>
                <p className="mb-0">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
