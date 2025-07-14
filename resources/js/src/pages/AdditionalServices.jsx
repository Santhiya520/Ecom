import React from "react";
import CloudSolutions from "../assets/cloud-solutions.png";
import Additional from "../assets/additional.jpg";
import DataAnalytics from "../assets/data-analytics.png";
import EnterpriseApplication from "../assets/enterprise-application.png";
import Mobile from "../assets/mobile.png";
import QA from "../assets/qa.png";
import AI from "../assets/ai.png";
import Emerg from "../assets/emerg.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AdditionalServices.css";

const AdditionalServices = () => {
    return (
        <>
            <Navbar />

            {/* Banner */}
            <div
                className="additional-banner"
                style={{ backgroundImage: `url(${Additional})` }}
            >
                <div className="additional-banner-content">
                    <h1>Additional Services</h1>
                    <p>
                        Home <span>&gt;</span> <span>AdditionalServices</span>
                    </p>
                </div>
            </div>

            {/* additional Content */}
            <div className="additional-container">
                <div>
                    <h3 className="section-title text-center">
                        Additional Services
                    </h3>
                    <p
                        className="section-description text-center p-0 m-0"
                        style={{ width: "100%" }}
                    >
                        At Fides Path, we empower businesses with a diverse
                        range of software development expertise. From ideation
                        to implementation and beyond, our skilled teams are
                        equipped to tackle a variety of project types and
                        technological challenges. Here are some of our key areas
                        of specialization:
                    </p>
                </div>
                {/* Intro */}
                <div className="additional-intro mt-5">
                    <img src={CloudSolutions} alt="additional Tech" />
                    <div className="additional-intro-text">
                        <h2>Cloud Solutions</h2>
                        <p>
                            We help businesses leverage the power of cloud
                            computing to achieve enhanced agility, scalability,
                            and cost-effectiveness.
                        </p>
                        <p>
                            Our cloud experts can guide you through cloud
                            migration, Support, infrastructure management, and
                            application development on leading cloud platforms.
                        </p>
                    </div>
                </div>

                {/* Enterprise Security and Governance */}
                <div>
                    <h3 className="section-title text-start">
                        Enterprise Security and Governance
                    </h3>
                    <p
                        className="section-description text-start p-0 m-0"
                        style={{ width: "100%" }}
                    >
                        In today’s ever-evolving digital landscape, safeguarding
                        your critical data and infrastructure is paramount. At
                        FidesPath, we understand the complexities of enterprise
                        security and governance. We go beyond building software;
                        we empower you with solutions that are:
                    </p>

                    <h4 className="section-title text-start mt-3 fw-bold">
                        Secure by Design:
                    </h4>
                    <ul>
                        <li>
                            We integrate security best practices throughout the
                            development lifecycle, minimizing vulnerabilities
                            and mitigating risks.
                        </li>
                        <li>
                            <strong>Security Expertise:</strong> Our team
                            possesses deep knowledge of industry standards,
                            compliance regulations, and secure coding practices.
                        </li>
                    </ul>

                    <h4 className="section-title text-start fw-bold">
                        Governance for Sustainability:
                    </h4>
                    <ul>
                        <li>
                            We establish robust governance frameworks that
                            ensure long-term security posture and compliance.
                        </li>
                    </ul>

                    <h4 className="section-title text-start fw-bold">
                        Our approach includes:
                    </h4>
                    <ul>
                        <li>
                            Defining clear security policies and procedures.
                        </li>
                        <li>
                            Implementing access controls and identity
                            management.
                        </li>
                        <li>
                            Regular monitoring and auditing of security
                            measures.
                        </li>
                        <li>
                            Providing ongoing security awareness training for
                            employees.
                        </li>
                    </ul>

                    <h4 className="section-title text-start mt-4 fw-bold">
                        Tailored Solutions for Your Needs:
                    </h4>
                    <ul>
                        <li>
                            We assess your enterprise’s specific threats,
                            vulnerabilities, and compliance requirements to
                            develop custom security strategies.
                        </li>
                    </ul>

                    <h4 className="section-title text-start fw-bold">
                        Our services encompass:
                    </h4>
                    <ul>
                        <li>
                            Security architecture design and implementation.
                        </li>
                        <li>
                            Vulnerability management and penetration testing.
                        </li>
                        <li>Incident response planning and recovery.</li>
                        <li>Compliance audits and gap assessments.</li>
                    </ul>

                    <h3 className="section-title text-center mt-5">
                        Why Choose FidesPath for Enterprise Security &
                        Governance?
                    </h3>
                    <ul>
                        <li>
                            <strong>Proven Expertise:</strong> Track record of
                            enabling robust security postures and navigating
                            compliance landscapes.
                        </li>
                        <li>
                            <strong>Collaborative Approach:</strong> We work
                            closely with your team, fostering a culture of
                            security awareness and shared responsibility.
                        </li>
                        <li>
                            <strong>Cost-Effective Solutions:</strong> Flexible
                            engagement models and competitive pricing to
                            maximize your security investments.
                        </li>
                        <li>
                            <strong>Future-Proof Approach:</strong> We stay
                            updated on emerging threats to ensure your
                            organization remains resilient.
                        </li>
                    </ul>

                    <p
                        className="section-description text-center p-0 m-0 mt-4"
                        style={{ width: "100%" }}
                    >
                        <strong>
                            FidesPath is your trusted partner in securing your
                            digital journey.
                        </strong>
                        We empower you to build, deploy, and manage your
                        infrastructure with confidence, knowing your data and
                        operations are protected.
                    </p>
                </div>

                <div className="additional-intro mt-5">
                    <img src={DataAnalytics} alt="additional Tech" />
                    <div className="additional-intro-text">
                        <h2>Data Analytics & Business Intelligence</h2>
                        <p>
                            We unlock the power of your data by developing
                            data-driven solutions that provide actionable
                            insights.
                        </p>
                        <p>
                            Our expertise lies in data warehousing, ETL
                            pipelines, data visualization, and building custom
                            analytics dashboards.
                        </p>
                    </div>
                </div>

                <div className="additional-intro mt-5">
                    <div className="additional-intro-text">
                        <h2>Enterprise Application Development</h2>
                        <p>
                            We understand the complexities of building robust
                            and scalable enterprise applications.
                        </p>
                        <p>
                            Our team leverages proven methodologies and
                            industry-leading tools to deliver solutions that
                            integrate seamlessly with your existing IT
                            infrastructure.
                        </p>
                    </div>
                    <img src={EnterpriseApplication} alt="additional Tech" />
                </div>

                <div className="additional-intro mt-5">
                    <img src={Mobile} alt="additional Tech" />
                    <div className="additional-intro-text">
                        <h2>Web & Mobile Development</h2>
                        <p>
                            We craft captivating and user-friendly web
                            applications, tailoring them to your specific needs
                            and target audience.
                        </p>
                        <p>
                            Our mobile development expertise spans across native
                            and hybrid app development for various platforms.
                        </p>
                    </div>
                </div>

                <div className="additional-intro mt-5">
                    <div className="additional-intro-text">
                        <h2>Quality Assurance (QA)</h2>
                        <p>
                            <b>Uncompromising Quality:</b> We believe in
                            rigorous testing methodologies to deliver bug-free,
                            robust software.
                        </p>
                        <p>
                            Our QA experts leverage manual and automated testing
                            techniques to guarantee exceptional quality across
                            all development stages.
                        </p>
                    </div>
                    <img src={QA} alt="additional Tech" />
                </div>

                <div className="additional-intro mt-5">
                    <img src={AI} alt="additional Tech" />
                    <div className="additional-intro-text">
                        <h2>
                            Artificial Intelligence (AI) & Machine Learning
                            (ML):
                        </h2>
                        <p>
                            Unlocking Data-Driven Insights: We empower your
                            software with the power of AI and ML.
                        </p>
                        <p>
                            Our team integrates cutting-edge algorithms to
                            extract meaningful insights, automate tasks, and
                            personalize user experiences.
                        </p>
                    </div>
                </div>

                <div className="additional-intro mt-5">
                    <div className="additional-intro-text">
                        <h2>Emerging Technologies</h2>
                        <p>
                            We stay at the forefront of technological
                            advancements, offering expertise in areas like
                            Artificial Intelligence, Machine Learning,
                            Blockchain, and Internet of Things (IoT).
                        </p>
                        <p>
                            We help businesses explore the potential of these
                            technologies to gain a competitive edge.
                        </p>
                    </div>
                    <img src={Emerg} alt="additional Tech" />
                </div>

                <h4 className="section-title text-start fw-bold">
                        FidesPath excels in
                    </h4>
                    <ul>
                        <li>
                            <b>Custom Software Development:</b> We tailor solutions to your specific business needs and processes.
                        </li>
                        <li>
                            <b>UI/UX Design:</b> We create intuitive and visually appealing user interfaces that enhance user experience.
                        </li>
                        <li>
                            <b>DevOps & Automation:</b> We streamline your development and deployment processes for increased efficiency.
                        </li>
                    </ul>

            </div>

            <Footer />
        </>
    );
};

export default AdditionalServices;
