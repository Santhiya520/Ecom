import React from 'react';
import aboutBanner from '../assets/about-banner.jpg';
import cloudAbt from '../assets/cloud-abt.png';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './AboutUs.css'; // Ensure you import the CSS file

import icon1 from '../assets/abt-icon1.png';
import icon2 from '../assets/abt-icon2.png';
import icon3 from '../assets/abt-icon3.png';

const serviceItems = [
  {
    title: "Project Management",
    desc: "We ensure smooth project execution, keeping you informed and involved throughout the development cycle.",
    icon: icon1,
  },
  {
    title: "Quality Assurance",
    desc: "Quality is paramount in today's competitive landscape. Our QA team ensures software reliability.",
    icon: icon2,
  },
  {
    title: "Maintenance And Support",
    desc: "We provide ongoing support to ensure your software remains robust and secure.",
    icon: icon3,
  },
];

const AboutUs = () => {
  return (
    <>
      <Navbar />

      {/* Banner */}
      <div
        className="about-banner"
        style={{ backgroundImage: `url(${aboutBanner})` }}
      >
        <div className="about-banner-content">
          <h1>About Us</h1>
          <p>
            Home <span>&gt;</span> <span>About Us</span>
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="about-container">
        {/* Intro */}
        <div className="about-intro">
          <img src={cloudAbt} alt="Cloud Tech" />
          <div className="about-intro-text">
            <h2>About FidesPath</h2>
            <p>
              Welcome to FidesPath, your trusted partner in consulting services. As a premier consulting firm,
              we specialize in providing unparalleled onshore and offshore consulting solutions. With a commitment
              to excellence and innovation, we help businesses navigate the digital landscape, delivering bespoke
              consulting services tailored to their unique needs.
            </p>
            <p>
              Whether you’re looking to enhance your existing systems or embark on a new journey, FidesPath is here
              to guide you every step of the way. Our team of experienced professionals combines technical expertise
              with strategic insights to drive success for your projects.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div>
          <h3 className="section-title text-start">Unveiling Your Vision :</h3>
          <p className="section-description text-start p-0 m-0" style={{width:"100%"}}>
            Embark on a journey with us as we collaborate closely to grasp the essence of your project’s objectives,
            hurdles, and financial parameters. Our seasoned consultants adeptly translate your vision into a structured roadmap,
            offering meticulous guidance throughout the consulting process.
          </p>
        </div>

        {/* Beyond Code */}
        <div className='mt-5'>
          <h3 className="section-title">Beyond Lines of Code</h3>
          <p className="section-description">
            Our consulting services transcend mere code implementation. We provide comprehensive support across
            the entire spectrum of your project needs, including:
          </p>
<div className="service-grid">
      {serviceItems.map((item, idx) => (
        <div className="service-card" key={idx}>
          <div className="service-col-3">
            <img src={item.icon} alt={item.title} className="service-icon" />
          </div>
          <div className="service-col-9">
            <h4 className="service-title">{item.title}</h4>
            <p className="service-desc">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
        </div>

        {/* Values */}
        <div className="about-values mt-5">
          <h3>FidesPath :</h3>
          <ul>
            <li><span>Trustworthy:</span> We build lasting relationships based on open communication and integrity.</li>
            <li><span>Agile:</span> We adapt to your needs and the ever-changing tech landscape.</li>
            <li><span>Experienced:</span> Our team boasts a proven track record of successful projects.</li>
            <li><span>Cost-Effective:</span> We offer competitive rates without compromising quality.</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="about-cta">
          Ready to embark on your digital journey?
          <span>Contact FidesPath today and let us be your guide to successful software development.</span>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
