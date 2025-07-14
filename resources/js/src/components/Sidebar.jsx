import React from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/user-list", label: "Users" },
    { to: "/section-list", label: "Sections" },
    { to: "/industries-list", label: "Industries" },
    { to: "/enquiries", label: "Enquiry List" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">Fides Path</div>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
      </div>

      <nav className="nav-links admin-links">
        {navItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            className="nav-link admin-link"
            onClick={toggleSidebar}
          >
            {item.label}
          </Link>
        ))}
        <a onClick={handleLogout} className="nav-link admin-link logout">
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
