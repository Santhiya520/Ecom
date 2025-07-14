import React from "react";
import "./Footer.css"; // Import the CSS
import logo from "../assets/white-logo-fidespath.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Description */}
        <div className="footer-section">
          <img src={logo} alt="FidesPath Logo" className="footer-logo-img me-2" />
          <p className="text-white">Welcome to FidesPath – Your Path to Reliable Cloud and Managed Services</p>
        </div>

        {/* Address */}
        <div className="footer-section">
          <h3 className="footer-heading">Address</h3>
          <p className="text-white"><strong>US Address :</strong></p>
          <p className="text-white">📍 815 Brazos St, Austin, TX – 78701</p>
          <p className="text-white"><strong>India Address :</strong></p>
          <p className="text-white">📍 Hyderabad, Telangana – 500048</p>
        </div>

        {/* Top Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Top Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Industries</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Google Map */}
        <div className="footer-section">
          <h3 className="footer-heading">Location</h3>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.241949784909!2d-97.74134252440244!3d30.2707215748049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b50a5c5460d3%3A0x2e19d5ef7094a2bb!2s815%20Brazos%20St%2C%20Austin%2C%20TX%2078701%2C%20USA!5e0!3m2!1sen!2sin!4v1684223659747!5m2!1sen!2sin"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        © 2025 <strong>FidesPath</strong> All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
