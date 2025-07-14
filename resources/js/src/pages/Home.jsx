import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import cloudImg from "../assets/cloud.png";
import aboutImg from "../assets/abt1.png";
import shapeImg from "../assets/h4_about_img_shape.png";
import salesforceImg from "../assets/salesforce.jpg";
import qualityImg from "../assets/quality.jpg";
import cloudServiceImg from "../assets/cloud-solution.png";
import managedServicesImg from "../assets/managed-services.png";

import financialImg from "../assets/financial-services.png";
import healthcareImg from "../assets/healthcare.png";
import retailImg from "../assets/retail.png";
import manufacturingImg from "../assets/manufacturing.png";
import mediaImg from "../assets/media.png";

import expertImage from '../assets/expert1.png';
import shapeBg from '../assets/consulting_shape1.png';

import "./Home.css";

const industries = [
  { title: "Retail & E-commerce", img: retailImg, description: "We help businesses create engaging and personalized shopping experiences" },
  { title: "Healthcare", img: healthcareImg, description:"We are committed to improving healthcare outcomes through innovative" },
  { title: "Manufacturing & Logistics", img: manufacturingImg, description: "We streamline your operations with robust software solutions designed" },
  { title: "Media & Entertainment", img: mediaImg, description: "We understand the dynamic nature of the media and entertainment" },
  { title: "Financial Services", img: financialImg, description: "We understand the complex regulatory landscape and security requirements" }
];


const Home = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;
    const scrollStep = 1;
    const slideInterval = setInterval(() => {
      if (slider) {
        scrollAmount += scrollStep;
        if (scrollAmount >= slider.scrollWidth / 2) {
          scrollAmount = 0;
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += scrollStep;
        }
      }
    }, 20); // Smooth scroll speed

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <img src={cloudImg} alt="Cloud" className="hero-img" />
        <div className="hero-content text-white">
          <div className="container">
            <h6 className="text-warning">WELCOME TO FIDESPATH</h6>
            <h1 className="fw-bold text-primary">
              Customized Consulting Solutions,<br />
              Delivered Seamlessly By FidesPath
            </h1>
            <p className="mt-3 text-dark fs-5">
              Welcome To FidesPath, Your Trusted Partner In Consulting Services.<br />
              As A Premier Consulting Firm, We Specialize In Providing Unparalleled<br />
              Consulting Solutions.
            </p>
            <button className="btn btn-primary mt-3">READ MORE →</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 position-relative z-2">
              <img src={aboutImg} alt="About FidesPath" className="img-fluid" />
              <img
                src={shapeImg}
                alt="Decoration Shape"
                className="about-shape floating-shape"
              />
            </div>
            <div className="col-md-6 position-relative z-2">
              <h2>Your Route to Reliable Onshore and Offshore Consulting Services</h2>
              <p>
                Welcome to FidesPath, your trusted advisor in consulting solutions. As a premier
                consulting firm, we specialize in offering unmatched onshore and offshore consulting services.
              </p>
              <p>
                With a dedication to excellence and innovative approaches, we assist businesses in
                navigating complex challenges, delivering customized solutions tailored to their specific needs.
              </p>
              <p>
                Whether you're aiming to optimize your current strategies or embark on new consulting
                ventures, FidesPath is here to support you at every stage.
              </p>
              <p>
                Our team of seasoned professionals blends technical proficiency with strategic insights
                to ensure success for your consulting projects.
              </p>
              <button className="btn btn-primary mt-2">READ MORE →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Solutions Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="text-primary fw-bold">
            Comprehensive Consulting Solutions<br />
            for Business Success
          </h2>
          <p className="text-muted mt-3 mb-5">
            At FidesPath, we offer extensive consulting services tailored to empower businesses across various domains.
            From conceptualization to execution and beyond, our proficient teams are equipped to address a multitude of project
            requirements and technological challenges. Below are some of the primary areas where we excel:
          </p>
          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img src={salesforceImg} className="card-img-top" alt="Salesforce" />
                <div className="card-body">
                  <h5 className="card-title">Salesforce</h5>
                  <p className="card-text">
                    Harness the power of Salesforce with our expert consulting services.
                    Whether you’re looking to implement.
                  </p>
                  <button className="btn btn-primary">READ MORE →</button>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img src={qualityImg} className="card-img-top" alt="Quality Assurance" />
                <div className="card-body">
                  <h5 className="card-title">Quality Assurance</h5>
                  <p className="card-text">
                    Quality is paramount in today’s competitive landscape. Our quality assurance consulting services.
                  </p>
                  <button className="btn btn-primary">READ MORE →</button>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img src={cloudServiceImg} className="card-img-top" alt="Cloud Services" />
                <div className="card-body">
                  <h5 className="card-title">Cloud Services</h5>
                  <p className="card-text">
                    Unlock the full potential of cloud technology with our comprehensive consulting services.
                  </p>
                  <button className="btn btn-primary">READ MORE →</button>
                </div>
              </div>
            </div>
            {/* Card 4 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img src={managedServicesImg} className="card-img-top" alt="Managed Services" />
                <div className="card-body">
                  <h5 className="card-title">Managed Services</h5>
                  <p className="card-text">
                    Outsource the management of your IT infrastructure and operations to our team of experienced professionals.
                  </p>
                  <button className="btn btn-primary">READ MORE →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Slider */}
      <section className="container industry-slider-section py-5 bg-white">
        <div className="container text-center mb-4">
          <h2 className="text-primary fw-bold">Your Industry-Specific Software Partner</h2>
          <p className="text-muted">While FidesPath possesses expertise across various software development domains,
we also delve deeper by focusing on specific industries.</p>
        </div>
        <div className="slider-container" ref={sliderRef}>
          <div className="slider-track">
            {[...industries, ...industries].map((industry, idx) => (
              <div className="industry-card" key={idx}>
                <img src={industry.img} alt={industry.title} />
                <h5>{industry.title}</h5>
                <p>{industry.description}</p>
                <button className="btn btn-primary">READ MORE →</button>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center pt-5">Engage with Us, Let's Create Together! <button className="btn btn-primary ms-3">REACH OUT TO US →</button></p>
      </section>

        <section className="expertise-section py-5 bg-secondary w-100">
            <h2 className="text-white text-center fw-bold p-5 m-3">
            Connect with us today and let's create something amazing together! Your feedback matters – reach out to us now..
            </h2>
            <h3 className="text-center"><button className="btn btn-primary ms-3">REACH OUT AND LET'S CONNECT →</button></h3>
        </section>

        <section className="expertise-section">
        <div className="expertise-container">
            <div className="expertise-text" style={{backgroundImage: `linear-gradient(rgba(46, 106, 179, 0.5), rgba(46, 106, 179, 0.5)), url(${shapeBg})`}}>
            <div className="text-content">
                <h2>Building with Expertise</h2>
                <p className="text-white">
                Whether you require a dedicated onshore team, a seamlessly integrated offshore solution,
                or a hybrid model, FidesPath delivers. We leverage our global network of skilled developers
                to assemble the perfect team for your project, ensuring the highest quality standards and efficient execution.
                </p>
            </div>
            </div>

            <div className="expertise-image">
            <img src={expertImage} alt="Expert team"/>
            </div>
        </div>
        </section>
<Footer />

    </>
  );
};

export default Home;
