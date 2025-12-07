import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { galleryImages } from "../content/galleryImages";

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!galleryImages.length) return undefined;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    if (!galleryImages.length) return;
    const total = galleryImages.length;
    const nextIndex = (index + total) % total;
    setActiveSlide(nextIndex);
  };

  const heroBackground = galleryImages[0]?.src;

  return (
    <div className="page home">
      <Helmet>
        <title>Roadrunner Healthcare | Hospice, Home Health & Primary Care in New Mexico</title>
        <meta
          name="description"
          content="Locally owned New Mexico healthcare providing compassionate hospice care, skilled home health services, and homebound primary care. Serving Albuquerque, Corrales, and surrounding areas."
        />
      </Helmet>

      <section
        className="hero"
        style={heroBackground ? { backgroundImage: `url(${heroBackground})` } : undefined}
      >
        <div className="hero-content">
          <h1>Comprehensive care at home - hospice, home health, and primary care.</h1>
          <p className="hero-subtitle">
            Roadrunner Healthcare is a locally owned, nurse and family-run organization
            serving New Mexico with compassionate hospice care, skilled home health,
            and homebound primary medical services.
          </p>

          <div className="hero-actions">
            <a href="tel:15053214819" className="btn-primary">
              Call 505-321-4819
            </a>
            <Link to="/referrals" className="btn-secondary">
              Send a Referral
            </Link>
          </div>

          <p className="hero-note">
            Not sure which service you need?{" "}
            <Link to="/services">See all services</Link>.
          </p>
        </div>
      </section>

      <section className="section services-grid">
        <h2>Our core services</h2>
        <div className="grid">
          <div className="card">
            <div className="card-icon">*</div>
            <h3>Hospice Care</h3>
            <p>
              Comfort-focused end-of-life care for patients and families - 24/7 support,
              symptom management, and emotional and spiritual care.
            </p>
            <Link to="/services/hospice" className="link">
              Learn more
            </Link>
          </div>

          <div className="card">
            <div className="card-icon">*</div>
            <h3>Home Health & In-Home Care</h3>
            <p>
              Skilled nursing, therapy, and caregiving in the comfort of home - supporting
              recovery, independence, and daily living.
            </p>
            <Link to="/services/home-health" className="link">
              Learn more
            </Link>
          </div>

          <div className="card">
            <div className="card-icon">*</div>
            <h3>Homebound Primary Care</h3>
            <p>
              Access Medical provides geriatric primary care for homebound patients,
              assisted living residents, and group homes - including in-home and telehealth visits.
            </p>
            <Link to="/services/medical-care" className="link">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div className="highlight-header">
          <h2>Health care that feels like family</h2>
          <p>
            We live and work in the communities we serve. Our team walks alongside
            patients and families through serious illness, recovery at home, and
            long-term primary care - coordinating with your physicians, hospitals,
            and facilities every step of the way.
          </p>
        </div>

        <div className="highlight-content">
          <div className="highlight-text">
            <div className="highlight-features">
              <div className="feature">
                <strong>Locally Owned</strong>
                <span>Nurse and family-run in New Mexico</span>
              </div>
              <div className="feature">
                <strong>24/7 Support</strong>
                <span>Always available when you need us</span>
              </div>
              <div className="feature">
                <strong>Coordinated Care</strong>
                <span>Working with your existing providers</span>
              </div>
            </div>
          </div>

          <div className="highlight-slider" aria-label="Care moments from the Roadrunner team">
            <div className="slider-window">
              {galleryImages.map((slide, index) => (
                <article
                  key={slide.src}
                  className={`slide ${index === activeSlide ? "active" : ""}`}
                  style={{ backgroundImage: `url(${slide.src})` }}
                >
                  <div className="slide-content">
                    <p className="slide-tag">{slide.location}</p>
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                    <p className="slide-credit">{slide.credit}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="slider-controls">
              <button type="button" onClick={() => goToSlide(activeSlide - 1)} aria-label="Previous slide">
                {"<"}
              </button>
              <div className="slider-dots" role="tablist" aria-label="Slide selector">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`slider-dot ${index === activeSlide ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-pressed={index === activeSlide}
                  />
                ))}
              </div>
              <button type="button" onClick={() => goToSlide(activeSlide + 1)} aria-label="Next slide">
                {">"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <h2>Ready to get started?</h2>
        <p>Contact us today to learn how we can support you or your loved one.</p>
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

export default Home;
