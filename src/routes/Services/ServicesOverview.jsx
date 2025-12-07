import React from "react";
import { Link } from "react-router-dom";
import { galleryImages } from "../../content/galleryImages";

function ServicesOverview() {
  const hospiceImage = galleryImages[2];
  const homeHealthImage = galleryImages[3];
  const primaryImage = galleryImages[1];
  const heroImage = galleryImages[0];

  return (
    <div className="page">
      <section
        className="page-header page-header--image"
        style={heroImage ? { backgroundImage: `url(${heroImage.src})` } : undefined}
      >
        <h1>Our Services</h1>
        <p className="lead">
          Roadrunner Healthcare provides a full continuum of in-home services - from primary care for
          homebound patients, to skilled home health, to hospice care and family support.
        </p>
      </section>

      <section className="section">
        <div className="services-grid">
          <div className="service-card">
            {hospiceImage && (
              <div
                className="service-media"
                style={{ backgroundImage: `url(${hospiceImage.src})` }}
                role="img"
                aria-label={hospiceImage.title}
              />
            )}
            <div className="service-card-header">
              <div className="service-icon">*</div>
              <h2>Hospice Care</h2>
            </div>
            <p className="service-description">
              Specialized end-of-life care focused on comfort, dignity, and support for both patients and families.
            </p>
            <ul className="service-features">
              <li>Pain and symptom management</li>
              <li>24/7 on-call nursing support</li>
              <li>Emotional, spiritual, and bereavement care</li>
              <li>Medical equipment and supplies at home</li>
              <li>Care coordination with your physician</li>
              <li>Family education and support</li>
            </ul>
            <Link to="/services/hospice" className="btn-secondary">
              View hospice services
            </Link>
          </div>

          <div className="service-card">
            {homeHealthImage && (
              <div
                className="service-media"
                style={{ backgroundImage: `url(${homeHealthImage.src})` }}
                role="img"
                aria-label={homeHealthImage.title}
              />
            )}
            <div className="service-card-header">
              <div className="service-icon">*</div>
              <h2>Home Health & In-Home Care</h2>
            </div>
            <p className="service-description">
              Skilled nursing, therapy, and caregiving services to help patients recover, manage chronic conditions,
              and remain safely at home.
            </p>
            <ul className="service-features">
              <li>Skilled nursing visits</li>
              <li>Physical, occupational, and speech therapy</li>
              <li>Personal care, bathing, meal prep, companionship</li>
              <li>Medication management and disease education</li>
              <li>Wound care and IV therapy</li>
              <li>Post-surgical and post-hospital care</li>
            </ul>
            <Link to="/services/home-health" className="btn-secondary">
              View home health services
            </Link>
          </div>

          <div className="service-card">
            {primaryImage && (
              <div
                className="service-media"
                style={{ backgroundImage: `url(${primaryImage.src})` }}
                role="img"
                aria-label={primaryImage.title}
              />
            )}
            <div className="service-card-header">
              <div className="service-icon">*</div>
              <h2>Homebound Primary Care</h2>
            </div>
            <p className="service-description">
              Physician-led primary care for homebound and assisted-living patients, including in-home and telehealth
              visits through Access Medical.
            </p>
            <ul className="service-features">
              <li>Geriatric primary care in the home</li>
              <li>Chronic disease management</li>
              <li>Medication review and management</li>
              <li>Telehealth options</li>
              <li>Care coordination with specialists</li>
              <li>Assisted living and group home visits</li>
            </ul>
            <Link to="/services/medical-care" className="btn-secondary">
              View primary care services
            </Link>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <h2>Not sure which service you need?</h2>
        <p>
          The lines between home health, hospice, and primary care can be confusing. Our team is happy to discuss your
          situation and help you understand your options.
        </p>
        <p>
          Visit our <Link to="/faq">FAQ page</Link> for common questions, or call us at{" "}
          <a href="tel:15053214819">505-321-4819</a>.
        </p>
      </section>

      <section className="section">
        <h2>Who can refer?</h2>
        <p>
          Anyone can refer a patient to our services - physicians, hospitals, facilities, family members, or patients
          themselves.
        </p>
        <div className="grid">
          <div className="card">
            <h3>For Physicians & Facilities</h3>
            <p>
              We work closely with referring providers to ensure seamless transitions and ongoing coordination of care.
            </p>
            <Link to="/referrals" className="link">Send a referral</Link>
          </div>
          <div className="card">
            <h3>For Families & Patients</h3>
            <p>
              If you or a loved one needs care, you can contact us directly. We'll verify eligibility and coordinate with
              your physician.
            </p>
            <Link to="/contact" className="link">Contact us</Link>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <h2>Ready to learn more?</h2>
        <div className="cta-actions">
          <a href="tel:15053214819" className="btn-primary">
            Call 505-321-4819
          </a>
          <Link to="/referrals" className="btn-secondary">
            Send a Referral
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ServicesOverview;
