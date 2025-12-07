import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { galleryImages } from "../../content/galleryImages";

function MedicalCare() {
  const heroImage = galleryImages[1];
  const careImages = [galleryImages[0], galleryImages[3]].filter(Boolean);

  return (
    <div className="page service-page">
      <Helmet>
        <title>Homebound Primary Care Services | Access Medical | Roadrunner Healthcare</title>
        <meta
          name="description"
          content="Geriatric primary care for homebound patients, assisted living residents, and group homes in New Mexico. In-home physician visits and telehealth appointments."
        />
      </Helmet>

      <section
        className="page-header service-header service-hero"
        style={heroImage ? { backgroundImage: `url(${heroImage.src})` } : undefined}
      >
        <h1>Homebound Primary Care</h1>
        <p className="lead">
          Physician-led primary care for homebound patients, assisted living residents, and group homes - brought
          directly to you through Access Medical.
        </p>
      </section>

      <section className="section">
        <h2>What is Access Medical?</h2>
        <p>
          Access Medical, part of Roadrunner Healthcare, provides geriatric primary care for patients who have difficulty
          traveling to a doctor's office. Our physicians and nurse practitioners conduct in-home visits, assisted living
          facility visits, and telehealth appointments - ensuring you receive continuous, coordinated primary care
          without leaving home.
        </p>
        <p>
          This is not urgent care or a one-time visit. We become your ongoing primary care provider, managing chronic
          conditions, medications, and coordinating with specialists.
        </p>

        {careImages.length > 0 && (
          <div className="service-photo-grid">
            {careImages.map((img) => (
              <figure key={img.src} className="service-photo">
                <img src={img.src} alt={img.title} loading="lazy" />
                <figcaption>
                  <strong>{img.title}</strong>
                  <span>{img.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>Services we provide</h2>
        <div className="grid">
          <div className="card">
            <h3>In-Home Primary Care</h3>
            <ul>
              <li>Comprehensive physical exams</li>
              <li>Chronic disease management</li>
              <li>Medication review and management</li>
              <li>Routine lab work and diagnostics</li>
              <li>Preventive care and screenings</li>
            </ul>
          </div>
          <div className="card">
            <h3>Assisted Living & Group Home Visits</h3>
            <ul>
              <li>Regular visits at your facility</li>
              <li>Coordination with facility staff</li>
              <li>Medication oversight</li>
              <li>Family communication and updates</li>
            </ul>
          </div>
          <div className="card">
            <h3>Telehealth Appointments</h3>
            <ul>
              <li>Video visits for follow-ups</li>
              <li>Medication adjustments</li>
              <li>Symptom monitoring</li>
              <li>Lab result reviews</li>
            </ul>
          </div>
          <div className="card">
            <h3>Care Coordination</h3>
            <ul>
              <li>Referrals to specialists</li>
              <li>Hospital and ER follow-up</li>
              <li>Communication with home health or hospice</li>
              <li>Family and caregiver education</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <h2>Who is this for?</h2>
        <p>Access Medical is ideal for patients who:</p>
        <ul className="criteria-list">
          <li>Are homebound or have significant difficulty traveling to appointments</li>
          <li>Reside in assisted living facilities or group homes</li>
          <li>Have multiple chronic conditions requiring ongoing management</li>
          <li>Need a primary care physician who understands geriatric care</li>
          <li>Prefer the convenience and comfort of care at home</li>
        </ul>
      </section>

      <section className="section">
        <h2>Conditions we manage</h2>
        <p>
          Our physicians have extensive experience managing complex medical conditions in homebound and elderly patients,
          including:
        </p>
        <div className="conditions-grid">
          <ul>
            <li>Diabetes</li>
            <li>Heart failure</li>
            <li>COPD and respiratory disease</li>
            <li>Hypertension</li>
            <li>Dementia and Alzheimer's</li>
            <li>Arthritis and mobility issues</li>
          </ul>
          <ul>
            <li>Chronic kidney disease</li>
            <li>Parkinson's disease</li>
            <li>Stroke recovery</li>
            <li>Depression and anxiety</li>
            <li>Medication management</li>
            <li>Post-hospitalization care</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>How we work with other services</h2>
        <p>Access Medical coordinates seamlessly with other Roadrunner Healthcare services:</p>
        <ul>
          <li>
            <strong>Home Health</strong> - Your Access Medical physician can order skilled nursing or therapy, and we
            stay in close communication with your home health team.
          </li>
          <li>
            <strong>Hospice</strong> - If your condition progresses, we can discuss hospice options and coordinate a
            smooth transition to comfort-focused care.
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Insurance & payment</h2>
        <p>
          Access Medical accepts Medicare, Medicaid, and most private insurance plans. We'll verify your coverage and
          work with your insurance to ensure you receive the care you need.
        </p>
        <p>There is typically no out-of-pocket cost for Medicare patients receiving in-home primary care visits.</p>
      </section>

      <section className="section">
        <h2>How to get started</h2>
        <ol className="process-list">
          <li>
            <strong>Contact us</strong> - Call or complete a referral form to request Access Medical services.
          </li>
          <li>
            <strong>Enrollment</strong> - We verify insurance, gather medical history, and schedule your first visit.
          </li>
          <li>
            <strong>Initial visit</strong> - A physician or nurse practitioner conducts a comprehensive evaluation at
            your home or facility.
          </li>
          <li>
            <strong>Ongoing care</strong> - We schedule regular visits based on your needs and remain available for
            urgent concerns.
          </li>
        </ol>
      </section>

      <section className="section cta-section">
        <h2>Questions about homebound primary care?</h2>
        <p>Our team is here to help you understand how Access Medical can support your health.</p>
        <div className="cta-actions">
          <a href="tel:15053214819" className="btn-primary">
            Call 505-321-4819
          </a>
          <Link to="/referrals" className="btn-secondary">
            Submit a Referral
          </Link>
        </div>
        <p className="cta-note">
          Need more information? Visit our <Link to="/faq">FAQ page</Link> or <Link to="/contact">contact us directly</Link>.
        </p>
      </section>
    </div>
  );
}

export default MedicalCare;
