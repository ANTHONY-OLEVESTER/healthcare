import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Hospice() {
  return (
    <div className="page service-page">
      <Helmet>
        <title>Hospice Care Services | Roadrunner Healthcare</title>
        <meta
          name="description"
          content="Compassionate hospice care in New Mexico. 24/7 support, pain and symptom management, emotional and spiritual care for patients and families. Serving Albuquerque and Corrales."
        />
      </Helmet>
      <section className="page-header service-header">
        <h1>Hospice Care</h1>
        <p className="lead">
          Comfort-focused care for patients with serious, life-limiting illness –
          and compassionate support for the families who love them.
        </p>
      </section>

      <section className="section">
        <h2>What is hospice?</h2>
        <p>
          Hospice at Roadrunner Healthcare focuses on comfort, dignity, and quality
          of life for patients facing serious illness. Our goal is not to cure the
          disease, but to manage symptoms, ease suffering, and support both patients
          and families through every step of the journey.
        </p>
        <p>
          Hospice is not about giving up – it's about living as fully and comfortably
          as possible, with expert medical support and compassionate care at home.
        </p>
      </section>

      <section className="section">
        <h2>What hospice provides</h2>
        <div className="grid">
          <div className="card">
            <h3>Medical Care</h3>
            <ul>
              <li>Expert pain and symptom management</li>
              <li>Regular nurse visits</li>
              <li>24/7 on-call nursing support</li>
              <li>Physician oversight and care planning</li>
            </ul>
          </div>
          <div className="card">
            <h3>Equipment & Supplies</h3>
            <ul>
              <li>Hospital bed, wheelchair, walker</li>
              <li>Oxygen and respiratory equipment</li>
              <li>Medications related to hospice diagnosis</li>
              <li>Incontinence supplies</li>
            </ul>
          </div>
          <div className="card">
            <h3>Emotional & Spiritual Support</h3>
            <ul>
              <li>Social work services</li>
              <li>Chaplain and spiritual care</li>
              <li>Counseling and emotional support</li>
              <li>Bereavement services for families after loss</li>
            </ul>
          </div>
          <div className="card">
            <h3>Family Support</h3>
            <ul>
              <li>Education on what to expect</li>
              <li>Caregiver training and guidance</li>
              <li>Respite care when needed</li>
              <li>Grief and bereavement counseling</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <h2>Who is on the care team?</h2>
        <p>
          Every hospice patient is supported by an interdisciplinary team including:
        </p>
        <ul className="team-list">
          <li><strong>Registered Nurses</strong> – Coordinate care, manage symptoms, educate families</li>
          <li><strong>Hospice Physician</strong> – Oversees medical care and comfort management</li>
          <li><strong>Social Worker</strong> – Provides counseling, resources, and emotional support</li>
          <li><strong>Chaplain</strong> – Offers spiritual care and support (optional, all faiths welcome)</li>
          <li><strong>Home Health Aides</strong> – Assist with bathing, dressing, personal care</li>
          <li><strong>Bereavement Coordinator</strong> – Supports families after loss</li>
        </ul>
      </section>

      <section className="section">
        <h2>When to consider hospice</h2>
        <p>
          Hospice may be appropriate when a patient has a serious illness and:
        </p>
        <ul className="criteria-list">
          <li>Treatment is no longer working or the patient chooses to stop curative treatment</li>
          <li>Frequent hospitalizations or ER visits</li>
          <li>Uncontrolled symptoms such as pain, shortness of breath, or fatigue</li>
          <li>Progressive decline in function, mobility, or weight loss</li>
          <li>The focus is shifting from cure to comfort and quality of life</li>
        </ul>
        <p>
          <strong>Important:</strong> Patients do not have to be "actively dying" to receive
          hospice care. Earlier referrals allow our team to provide better symptom control
          and more support for families.
        </p>
      </section>

      <section className="section">
        <h2>Insurance & eligibility</h2>
        <p>
          Hospice is a Medicare benefit covered 100% by Medicare, Medicaid, and most
          private insurances. Patients are eligible when:
        </p>
        <ul>
          <li>A physician certifies a life-limiting illness (typically 6 months or less if the disease runs its normal course)</li>
          <li>The patient chooses comfort-focused care over curative treatment</li>
          <li>The patient can receive care at home (or in a facility where they reside)</li>
        </ul>
        <p>
          There is no cost to patients or families for hospice services, medications,
          equipment, or supplies related to the hospice diagnosis.
        </p>
      </section>

      <section className="section">
        <h2>How to get started</h2>
        <p>
          Anyone can refer a patient to hospice – families, physicians, hospitals, or facilities.
          Here's what happens next:
        </p>
        <ol className="process-list">
          <li>
            <strong>Initial contact</strong> – Call us or submit a referral. We'll discuss
            the patient's situation and determine if hospice is appropriate.
          </li>
          <li>
            <strong>Physician coordination</strong> – We coordinate with the patient's doctor
            to review eligibility and obtain certification.
          </li>
          <li>
            <strong>Admission</strong> – A nurse meets with the patient and family to explain
            hospice, complete paperwork, and create a personalized care plan.
          </li>
          <li>
            <strong>Care begins</strong> – Your hospice team starts visits, delivers equipment,
            and provides 24/7 on-call support.
          </li>
        </ol>
      </section>

      <section className="section cta-section">
        <h2>Questions about hospice care?</h2>
        <p>
          Our team is available 24/7 to talk through your situation and answer questions.
        </p>
        <div className="cta-actions">
          <a href="tel:15053214819" className="btn-primary">
            Call 505-321-4819
          </a>
          <Link to="/referrals" className="btn-secondary">
            Submit a Referral
          </Link>
        </div>
        <p className="cta-note">
          Have general questions first? Visit our <Link to="/faq">FAQ page</Link>.
        </p>
      </section>
    </div>
  );
}

export default Hospice;
