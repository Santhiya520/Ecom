import React, { useState, useEffect } from "react";
import Mnagment from "../assets/mnag-ment.png";
import Managed from "../assets/managed.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../App";
import "./Industries.css";

const Industries = () => {
    const [sections, setSections] = useState([]);
    const [industries, setIndustries] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/section`)
            .then((res) => setSections(res.data.data || []))
            .catch(() => setSections([]));

        axios
            .get(`${BASE_URL}/api/industries`)
            .then((res) => setIndustries(res.data.data || []))
            .catch(() => setIndustries([]));
    }, []);

    const industriesBySection = (sectionId) =>
        industries.filter((ind) => ind.section_id === sectionId);

    return (
        <>
            <Navbar />

            {/* Banner */}
            <div
                className="manage-banner"
                style={{ backgroundImage: `url(${Managed})` }}
            >
                <div className="manage-banner-content">
                    <h1>Industries</h1>
                    <p>
                        Home <span>&gt;</span> <span>Industries</span>
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="manage-container">
                <div>
                    <h3 className="section-title text-start">
                        FidesPath: Your Industry‑Tailored Consulting Partner
                    </h3>
                    <p
                        className="section-description text-start p-0 m-0"
                        style={{ width: "100%" }}
                    >
                        While FidesPath offers expertise across a spectrum of
                        consulting domains, we further specialize by
                        concentrating on specific industries.
                    </p>
                </div>

                {/* Dynamic Sections */}
                {sections.map((section, index) => {
                    const related = industriesBySection(section.id);
                    if (related.length === 0) return null;

                    return (
                        <div key={section.id} className="manage-section mt-5">
                            <h3 className="section-title text-start">
                                {section.title}
                            </h3>
                            <p className="section-description text-start">
                                {section.body}
                            </p>

                            {related.map((ind, indIndex) => (
                                <div
                                    key={ind.id}
                                    className={`manage-intro mb-5 ${
                                        indIndex % 2 === 1
                                            ? "flex-row-reverse"
                                            : ""
                                    }`}
                                >
                                    <img
                                    src={`${BASE_URL}/${ind.image}`}
                                    alt={ind.title}
                                    className="manage-img"
                                    />
                                    <div className="manage-intro-text">
                                        <h3 className="section-title text-start">
                                            {ind.title}
                                        </h3>
                                        {ind.subtitle && <p>{ind.subtitle}</p>}
                                        {ind.description1 && (
                                            <p>{ind.description1}</p>
                                        )}
                                        {ind.description2 && (
                                            <p>{ind.description2}</p>
                                        )}
                                        {ind.description3 && (
                                            <p>{ind.description3}</p>
                                        )}
                                        {ind.list && (
                                            <ol>
                                                {ind.list
                                                    .split("\n")
                                                    .map((li, i) => (
                                                        <li key={i}>{li}</li>
                                                    ))}
                                            </ol>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Insert additional content after the first section only */}
                            {index === 0 && (
                                <div className="additional-note mt-4 mb-5">
                                    <p className="section-description">
                                        Beyond these core industries, Fides Path
                                        readily adapts its expertise to your
                                        specific needs. No matter your industry,
                                        we can provide tailored solutions that
                                        address your unique challenges and
                                        unlock your full potential.
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
                <div className="additional-note mt-4 mb-5">
                    <p className="section-description">
                        FidesPath is your trusted partner in achieving your
                        consulting objectives. With our specialized industry
                        focus, distinctive value proposition, and dedication to
                        excellence, we empower you to develop tailored solutions
                        that foster business growth and prosperity.
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Industries;
