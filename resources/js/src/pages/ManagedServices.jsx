import React from "react";
import Mnagment from "../assets/mnag-ment.png";
import Managed from "../assets/managed.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ManagedServices.css"; // Ensure you import the CSS file

const ManagedServices = () => {
    return (
        <>
            <Navbar />

            {/* Banner */}
            <div
                className="manage-banner"
                style={{ backgroundImage: `url(${Managed})` }}
            >
                <div className="manage-banner-content">
                    <h1>Managed Services</h1>
                    <p>
                        Home <span>&gt;</span> <span>ManagedServices</span>
                    </p>
                </div>
            </div>

            {/* manage Content */}
            <div className="manage-container">
                {/* Intro */}
                <div className="manage-intro">
                    <img src={Mnagment} alt="manage Tech" />
                    <div className="manage-intro-text">
                        <h2>Managed Services</h2>
                        <p>
                            Outsource the management of your IT infrastructure
                            and operations to our team of experienced
                            professionals. Our managed services consulting
                            offerings encompass a wide range of services,
                            including proactive monitoring, maintenance,
                            troubleshooting, and support.
                        </p>
                        <p>
                            With our proactive approach and round-the-clock
                            support, we ensure the reliability, security, and
                            performance of your IT systems, allowing you to
                            focus on your core business objectives.
                        </p>
                    </div>
                </div>

                {/* Vision */}
                <div>
                    <h3 className="section-title text-start">
                        Managed Infrastructure Services
                    </h3>
                    <p
                        className="section-description text-start p-0 m-0"
                        style={{ width: "100%" }}
                    >
                        Keeping your IT infrastructure running smoothly requires
                        proactive management and monitoring, and that's where
                        our managed services come in.
                    </p>
                    <p
                        className="section-description text-start p-0 m-0 mt-2"
                        style={{ width: "100%" }}
                    >
                        Our team of skilled technicians provides round-the-clock
                        monitoring, maintenance, and support to ensure the
                        stability, performance, and security of your
                        infrastructure.
                    </p>
                    <p
                        className="section-description text-start p-0 m-0"
                        style={{ width: "100%" }}
                    >
                        Whether you need help troubleshooting technical issues,
                        applying software patches, or implementing security
                        updates, we've got you covered.
                    </p>
                </div>

                <div>
                    <h3 className="section-title text-start mt-5">
                        Security and Compliance
                    </h3>
                    <p
                        className="section-description text-start p-0 m-0"
                        style={{ width: "100%" }}
                    >
                        Security is paramount in today's digital landscape, and
                        our security experts are here to help you safeguard your
                        critical assets and sensitive data.
                    </p>
                    <p
                        className="section-description text-start p-0 m-0 mt-2"
                        style={{ width: "100%" }}
                    >
                        We'll conduct comprehensive security assessments to
                        identify vulnerabilities and develop tailored security
                        strategies to mitigate risks and protect your
                        organization against cyber threats.
                    </p>
                    <p
                        className="section-description text-start p-0 m-0 mt-2"
                        style={{ width: "100%" }}
                    >
                        Additionally, we'll ensure that your infrastructure
                        remains compliant with relevant regulations and industry
                        standards, giving you peace of mind knowing that your
                        data is safe and secure.
                    </p>
                </div>

                <div>
                    <h3 className="section-title text-start mt-5">
                        Disaster Recovery and Business Continuity
                    </h3>
                    <p
                        className="section-description text-start p-0 m-0"
                        style={{ width: "100%" }}
                    >
                        No organization is immune to disasters, but with
                        FidesPath's disaster recovery and business continuity
                        solutions, you can minimize downtime and ensure
                        continuity of operations in the face of unexpected
                        disruptions.
                    </p>
                    <p
                        className="section-description text-start p-0 m-0 mt-2"
                        style={{ width: "100%" }}
                    >
                        We'll work with you to develop robust disaster recovery
                        plans, implement resilient backup and replication
                        solutions, and conduct regular testing and drills to
                        validate the effectiveness of your contingency measures.
                    </p>
                </div>

                <div className="mt-5">
                    <h3 className="section-title text-center">
                        Choose FidesPath for Comprehensive Cloud and Managed
                        Services
                    </h3>
                    <p
                        className="section-description text-center p-0 m-0"
                        style={{ width: "100%" }}
                    >
                        With FidesPath as your trusted partner, you can leverage
                        our expertise across the entire cloud and managed
                        services spectrum to drive innovation, optimize
                        performance, and enhance the resilience of your IT
                        infrastructure. Whether you're a small business or a
                        large enterprise, we'll work tirelessly to understand
                        your unique challenges and deliver tailored solutions
                        that exceed your expectations. Trust FidesPath to be
                        your guide on the path to reliable and scalable IT
                        solutions.
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ManagedServices;
