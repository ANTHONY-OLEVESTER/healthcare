import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function HomeHealth() {
  return (
    <div className="page service-page">
      <Helmet>
        <title>Home Health & In-Home Care Services | Roadrunner Healthcare</title>
        <meta
          name="description"
          content="Skilled nursing, physical therapy, and in-home caregiving services in New Mexico. Medicare-certified home health care for recovery and chronic disease management."
        />
      </Helmet>
      <section className="page-header service-header">
        <h1>Home Health & In-Home Care</h1>
        <p className="lead">
          Skilled nursing, therapy, and personal caregiving services to help you
          recover, manage chronic conditions, and live safely at home.
        </p>
      </section>

      <section className="section">
        <h2>What is home health?</h2>
        <p>
          Home health brings medical care and personal support into your home. Whether
          you're recovering from surgery or hospitalization, managing a chronic illness,
          or need help with daily activities, Roadrunner Home Health provides skilled
          professionals who work with your physician to keep you safe, comfortable, and
          independent at home.
        </p>
      </section>

      <section className="section">
        <h2>Our services</h2>

        <div className="service-category">
          <h3>Skilled Nursing</h3>
          <p>
            Registered nurses and licensed practical nurses provide medical care at home,
            including:
          </p>
          <ul>
            <li>Wound care and dressing changes</li>
            <li>Medication management and education</li>
            <li>Chronic disease monitoring (diabetes, heart failure, COPD, etc.)</li>
            <li>IV therapy and infusions</li>
            <li>Catheter and ostomy care</li>
            <li>Post-surgical care</li>
            <li>Vital sign monitoring</li>
            <li>Patient and caregiver education</li>
          </ul>
        </div>

        <div className="service-category">
          <h3>Therapy Services</h3>
          <p>
            Licensed therapists help you regain strength, mobility, and independence:
          </p>
          <ul>
            <li><strong>Physical Therapy (PT)</strong> – Improve mobility, strength, balance, and reduce fall risk</li>
            <li><strong>Occupational Therapy (OT)</strong> – Regain ability to perform daily activities like bathing, dressing, cooking</li>
            <li><strong>Speech Therapy (ST)</strong> – Address swallowing difficulties, speech, and cognitive function</li>
          </ul>
        </div>

        <div className="service-category">
          <h3>In-Home Caregiving</h3>
          <p>
            Personal care aides and caregivers provide non-medical support to help with
            daily living:
          </p>
          <ul>
            <li>Bathing, dressing, grooming</li>
            <li>Meal preparation and feeding assistance</li>
            <li>Light housekeeping and laundry</li>
            <li>Companionship and conversation</li>
            <li>Medication reminders</li>
            <li>Transportation to appointments</li>
            <li>Respite care for family caregivers</li>
          </ul>
        </div>
      </section>

      <section className="section highlight">
        <h2>Who qualifies for home health?</h2>
        <p>
          Medicare-covered home health services are available when:
        </p>
        <ul className="criteria-list">
          <li>You are homebound (difficult or unsafe to leave home without assistance)</li>
          <li>Your physician orders home health services</li>
          <li>You need skilled nursing or therapy (not just personal care)</li>
          <li>Services are provided by a Medicare-certified agency (we are certified)</li>
        </ul>
        <p>
          Private-pay and insurance-based caregiving services are available for patients
          who do not meet Medicare homebound criteria but still need assistance at home.
        </p>
      </section>

      <section className="section">
        <h2>Common conditions we support</h2>
        <div className="grid">
          <div className="card">
            <h4>Post-Hospitalization</h4>
            <p>Recovery from surgery, illness, or injury requiring continued medical care at home.</p>
          </div>
          <div className="card">
            <h4>Chronic Disease Management</h4>
            <p>Diabetes, heart failure, COPD, hypertension, and other ongoing conditions.</p>
          </div>
          <div className="card">
            <h4>Wound Care</h4>
            <p>Surgical wounds, pressure ulcers, diabetic ulcers, and slow-healing wounds.</p>
          </div>
          <div className="card">
            <h4>Fall Prevention</h4>
            <p>Therapy to improve balance, strength, and safety at home.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Insurance & payment</h2>
        <ul>
          <li><strong>Medicare</strong> – Covers skilled nursing and therapy services when medically necessary</li>
          <li><strong>Medicaid</strong> – Covers home health and personal care services</li>
          <li><strong>Private Insurance</strong> – Most plans cover home health; we'll verify your benefits</li>
          <li><strong>Private Pay</strong> – Caregiving and companion services available on an hourly or live-in basis</li>
        </ul>
      </section>

      <section className="section">
        <h2>How to get started</h2>
        <ol className="process-list">
          <li>
            <strong>Referral</strong> – Your physician, hospital, or family can refer you to home health.
          </li>
          <li>
            <strong>Assessment</strong> – A nurse visits your home to assess your needs and create a care plan.
          </li>
          <li>
            <strong>Authorization</strong> – We coordinate with your physician and verify insurance coverage.
          </li>
          <li>
            <strong>Care begins</strong> – Your care team starts visits based on your personalized plan.
          </li>
        </ol>
      </section>

      <section className="section cta-section">
        <h2>Ready to start home health services?</h2>
        <div className="cta-actions">
          <a href="tel:15053214819" className="btn-primary">
            Call 505-321-4819
          </a>
          <Link to="/referrals" className="btn-secondary">
            Submit a Referral
          </Link>
        </div>
        <p className="cta-note">
          Questions? Check our <Link to="/faq">FAQ page</Link> or <Link to="/contact">contact us</Link>.
        </p>
      </section>
    </div>
  );
}

export default HomeHealth;
