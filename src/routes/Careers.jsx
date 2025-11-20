import React from "react";
import { Link } from "react-router-dom";

function Careers() {
  return (
    <div className="page">
      <section className="page-header">
        <h1>Careers at Roadrunner Healthcare</h1>
        <p className="lead">
          Join a compassionate, locally owned team committed to exceptional home-based care.
        </p>
      </section>

      <section className="section">
        <h2>Why work with us?</h2>
        <div className="grid">
          <div className="card">
            <h3>Locally Owned</h3>
            <p>
              We're not a corporate chain. We're a family and nurse-owned organization
              rooted in the communities we serve.
            </p>
          </div>
          <div className="card">
            <h3>Comprehensive Services</h3>
            <p>
              Work across hospice, home health, and primary care – gaining diverse
              experience while staying with one organization.
            </p>
          </div>
          <div className="card">
            <h3>Meaningful Work</h3>
            <p>
              Make a real difference in patients' lives every day, providing care
              that truly matters.
            </p>
          </div>
          <div className="card">
            <h3>Supportive Team</h3>
            <p>
              Join a collaborative, experienced team that values your expertise
              and supports your growth.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Open positions</h2>
        <p>
          We're always looking for talented, compassionate professionals to join our team.
          Current and frequent openings include:
        </p>

        <div className="positions-list">
          <div className="position-card">
            <h3>Registered Nurses (RN)</h3>
            <p>Hospice, home health, and case management roles</p>
            <ul>
              <li>Competitive pay and benefits</li>
              <li>Flexible scheduling options</li>
              <li>Clinical support and continuing education</li>
              <li>Mileage reimbursement</li>
            </ul>
          </div>

          <div className="position-card">
            <h3>Licensed Practical Nurses (LPN)</h3>
            <p>Skilled nursing visits and patient care</p>
            <ul>
              <li>Work independently with team support</li>
              <li>Meaningful patient relationships</li>
              <li>Opportunities for growth</li>
            </ul>
          </div>

          <div className="position-card">
            <h3>Physical, Occupational & Speech Therapists</h3>
            <p>PT, OT, and ST roles in home health</p>
            <ul>
              <li>Flexible caseloads</li>
              <li>Per-visit or salaried options</li>
              <li>Clinical autonomy</li>
            </ul>
          </div>

          <div className="position-card">
            <h3>Certified Nursing Assistants (CNA) & Home Health Aides</h3>
            <p>Personal care and companionship</p>
            <ul>
              <li>Part-time and full-time positions</li>
              <li>Hourly and live-in options</li>
              <li>Training and support provided</li>
            </ul>
          </div>

          <div className="position-card">
            <h3>Social Workers (MSW, LCSW)</h3>
            <p>Hospice and home health support</p>
            <ul>
              <li>Provide counseling and resources to patients and families</li>
              <li>Collaborate with interdisciplinary teams</li>
            </ul>
          </div>

          <div className="position-card">
            <h3>Administrative & Support Staff</h3>
            <p>Scheduling, intake, billing, and coordination roles</p>
            <ul>
              <li>Office-based positions in Corrales</li>
              <li>Support the clinical team</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <h2>What we're looking for</h2>
        <ul>
          <li>Compassionate, patient-centered professionals</li>
          <li>Strong communication and collaboration skills</li>
          <li>Current New Mexico licensure or certification (where applicable)</li>
          <li>Reliable transportation and valid driver's license</li>
          <li>Commitment to quality care and continuous improvement</li>
        </ul>
      </section>

      <section className="section">
        <h2>Benefits</h2>
        <ul className="benefits-list">
          <li>Competitive salary and hourly rates</li>
          <li>Health, dental, and vision insurance (full-time positions)</li>
          <li>Paid time off and holidays</li>
          <li>Mileage reimbursement</li>
          <li>Continuing education support</li>
          <li>401(k) retirement plan</li>
          <li>Flexible scheduling options</li>
        </ul>
      </section>

      <section className="section cta-section">
        <h2>Ready to join our team?</h2>
        <p>
          We'd love to hear from you. Send your resume and a brief introduction to{" "}
          <a href="mailto:careers@roadrunnerhealthcare.com">careers@roadrunnerhealthcare.com</a>,
          or call us at <a href="tel:15053214819">505-321-4819</a>.
        </p>
        <div className="cta-actions">
          <a href="mailto:careers@roadrunnerhealthcare.com" className="btn-primary">
            Email Your Resume
          </a>
          <a href="tel:15053214819" className="btn-secondary">
            Call 505-321-4819
          </a>
        </div>
      </section>
    </div>
  );
}

export default Careers;
