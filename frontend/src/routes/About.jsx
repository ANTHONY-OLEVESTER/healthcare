import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { galleryImages } from "../content/galleryImages";

function About() {
  const aboutImages = galleryImages.slice(1, 4);

  return (
    <div className="page">
      <Helmet>
        <title>About Us | Roadrunner Healthcare</title>
        <meta
          name="description"
          content="Learn about Roadrunner Healthcare - a locally owned, nurse and family-run healthcare organization providing hospice, home health, and primary care throughout New Mexico."
        />
      </Helmet>
      <section className="page-header">
        <h1>About Roadrunner Healthcare</h1>
        <p className="lead">
          A locally owned, nurse and family-run healthcare organization serving New Mexico
          with compassion, expertise, and a commitment to keeping patients at home.
        </p>
      </section>

      <section className="section">
        <h2>Our Story</h2>
        <p>
          Roadrunner Healthcare was founded in Corrales, New Mexico, with a simple mission:
          to provide exceptional home-based care that allows patients to remain in the comfort
          and dignity of their own homes throughout all stages of health and illness.
        </p>
        <p>
          What began as a commitment to hospice care has grown into a comprehensive healthcare
          organization offering hospice, home health, skilled nursing, in-home caregiving, and
          primary care services for homebound patients.
        </p>

        <div className="image-grid">
          {aboutImages.map((img) => (
            <figure key={img.src} className="image-card">
              <img src={img.src} alt={img.title} loading="lazy" />
              <figcaption>
                <strong>{img.title}</strong>
                <span>{img.description}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section highlight">
        <h2>Our Mission</h2>
        <p>
          To deliver compassionate, patient-centered care in the home - meeting patients and
          families where they are, supporting independence, comfort, and quality of life through
          every stage of health.
        </p>
      </section>

      <section className="section">
        <h2>Our Values</h2>
        <div className="grid">
          <div className="card">
            <h3>Compassion</h3>
            <p>
              We treat every patient and family with empathy, respect, and the dignity they deserve.
            </p>
          </div>
          <div className="card">
            <h3>Excellence</h3>
            <p>
              Our team of skilled nurses, therapists, caregivers, and physicians are committed
              to the highest standards of clinical care.
            </p>
          </div>
          <div className="card">
            <h3>Coordination</h3>
            <p>
              We work seamlessly with your existing doctors, hospitals, and specialists to
              ensure continuity and quality.
            </p>
          </div>
          <div className="card">
            <h3>Community</h3>
            <p>
              As a locally owned organization, we live and work in the communities we serve.
              Your neighbors are our neighbors.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Service Area</h2>
        <p>
          We proudly serve patients and families throughout the greater Albuquerque area,
          including Corrales, Rio Rancho, and surrounding communities in New Mexico.
        </p>
        <p>
          If you're unsure whether we serve your area, please{" "}
          <Link to="/contact">contact us</Link> - we'll do our best to help.
        </p>
      </section>

      <section className="section">
        <h2>Our Services</h2>
        <p>
          Roadrunner Healthcare brings together three essential home-based care services:
        </p>
        <ul className="services-list">
          <li>
            <strong>Hospice Care</strong> - End-of-life comfort, symptom management,
            and family support through Roadrunner Hospice.
          </li>
          <li>
            <strong>Home Health & In-Home Care</strong> - Skilled nursing, therapy,
            and personal caregiving through Roadrunner Home Health.
          </li>
          <li>
            <strong>Homebound Primary Care</strong> - Geriatric primary care visits
            for homebound and assisted living patients through Access Medical.
          </li>
        </ul>
        <Link to="/services" className="btn-secondary">
          Explore all services
        </Link>
      </section>

      <section className="section cta-section">
        <h2>Questions about our services?</h2>
        <p>We're here to help. Call us or send a message anytime.</p>
        <div className="cta-actions">
          <a href="tel:15053214819" className="btn-primary">
            Call 505-321-4819
          </a>
          <Link to="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
