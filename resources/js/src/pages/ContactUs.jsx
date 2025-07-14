import React, { useState } from "react";
import axios from "axios";
import Contact from "../assets/contact.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ContactUs.css";

const BASE_URL = "https://totalwebsolutions.co.in";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/contact`, formData);

            setResponseMessage(response.data.message);
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            console.error(error);
            setResponseMessage("Submission failed. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="cloud-banner" style={{ backgroundImage: `url(${Contact})` }}>
                <div className="cloud-banner-content">
                    <h1>Contact Us</h1>
                    <p>Home <span>&gt;</span> <span>ContactUs</span></p>
                </div>
            </div>

            <div className="contact-wrapper m-5 p-5">
                <div className="contact-left">
                    <h2>How can we help you?</h2>
                    <p>Your support fuels my ability to assist and innovate. Together, we shape a brighter future through collaboration</p>
                    <div className="contact-info">
                        <div>
                            <span role="img" aria-label="map">📍</span>
                            <strong>US Address:</strong><br />
                            815 Brazos St, Austin, TX - 78701
                        </div>
                        <div>
                            <span role="img" aria-label="map">📍</span>
                            <strong>India Address:</strong><br />
                            Hyderabad, Telangana - 500048
                        </div>
                        <div>
                            <span role="img" aria-label="mail">✉️</span>
                            <strong>E-mail:</strong><br />
                            contactus@fidespath.com
                        </div>
                    </div>
                </div>

                <div className="contact-right">
                    <h3>Give Us a Message</h3>
                    <p className="subtitle">Embrace the journey of growth, for every step forward is a triumph in itself</p>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="input-row">
                            <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                            <input type="text" name="phone" placeholder="Phone (Optional)" value={formData.phone} onChange={handleChange} />
                        </div>
                        <textarea name="message" placeholder="Message" required value={formData.message} onChange={handleChange}></textarea>
                        <button type="submit" className="submit-btn">SUBMIT POST</button>
                        {responseMessage && <p className="response">{responseMessage}</p>}
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ContactUs;
