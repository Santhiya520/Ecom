import React from "react";
import { Link,NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo-fidespath.png";

const Navbar = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <i className="bi bi-geo-alt"></i>
            815 Brazos St, Austin, TX – 78701 | Hyderabad, Telangana, India – 500048
          </div>
          <div className="topbar-right">
            <i className="bi bi-envelope"></i>
            contactus@fidespath.com
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top transparent-navbar">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="FidesPath Logo" className="logo-img me-2" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about-us" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  About Us
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()}
                >
                  Services
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/cloud-services">Cloud Service</Link></li>
                  <li><Link className="dropdown-item" to="/managed-services">Managed Service</Link></li>
                  <li><Link className="dropdown-item" to="/additional-services">Additional Service</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/industries" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  Industries
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact-us" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
