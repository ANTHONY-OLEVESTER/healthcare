import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

function Referrals() {
  const [formData, setFormData] = useState({
    // Referral source
    referralSource: "",
    referrerName: "",
    referrerPhone: "",
    referrerEmail: "",
    referrerFacility: "",

    // Patient info
    patientFirstName: "",
    patientLastName: "",
    patientDOB: "",
    patientPhone: "",
    patientAddress: "",
    patientCity: "",
    patientZip: "",

    // Service requested
    serviceType: "",
    urgency: "routine",

    // Additional info
    diagnosis: "",
    currentPhysician: "",
    insurance: "",
    additionalNotes: ""
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.referralSource || !formData.referrerName || !formData.referrerPhone) {
      setError("Please fill in your contact information.");
      return;
    }

    if (!formData.patientFirstName || !formData.patientLastName || !formData.patientAddress) {
      setError("Please fill in the patient's required information.");
      return;
    }

    if (!formData.serviceType) {
      setError("Please select a service type.");
      return;
    }

    if (!formData.diagnosis) {
      setError("Please provide a diagnosis or reason for referral.");
      return;
    }

    try {
      setStatus("submitting");

      // TODO: Replace with real endpoint (Formspree / backend / etc.)
      // Example: await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // });

      console.log("Referral submitted:", formData);

      // Simulate network delay
      await new Promise(res => setTimeout(res, 600));

      setStatus("success");

      // Reset form
      setFormData({
        referralSource: "",
        referrerName: "",
        referrerPhone: "",
        referrerEmail: "",
        referrerFacility: "",
        patientFirstName: "",
        patientLastName: "",
        patientDOB: "",
        patientPhone: "",
        patientAddress: "",
        patientCity: "",
        patientZip: "",
        serviceType: "",
        urgency: "routine",
        diagnosis: "",
        currentPhysician: "",
        insurance: "",
        additionalNotes: ""
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again or call us directly at 505-321-4819.");
    }
  };

  return (
    <div className="page">
      <Helmet>
        <title>Submit a Referral | Roadrunner Healthcare</title>
        <meta
          name="description"
          content="Refer a patient to Roadrunner Healthcare for hospice, home health, or primary care services. Physicians, hospitals, facilities, and families welcome."
        />
      </Helmet>

      <section className="page-header">
        <h1>Submit a Referral</h1>
        <p className="lead">
          Physicians, hospitals, facilities, and families can all refer patients to
          Roadrunner Healthcare. We'll respond within 24 hours.
        </p>
      </section>

      <section className="section">
        <div className="referral-info">
          <h2>Who can refer?</h2>
          <ul>
            <li><strong>Physicians</strong> – Refer your patients for hospice, home health, or primary care</li>
            <li><strong>Hospitals & Facilities</strong> – Coordinate discharge planning and post-acute care</li>
            <li><strong>Families & Patients</strong> – Self-referrals are welcome; we'll coordinate with your physician</li>
          </ul>

          <h3>Prefer to call or fax?</h3>
          <p>
            <strong>Phone:</strong> <a href="tel:15053214819">505-321-4819</a><br />
            <strong>Fax:</strong> 505-898-3630<br />
            <strong>Email:</strong> <a href="mailto:referrals@roadrunnerhealthcare.com">referrals@roadrunnerhealthcare.com</a>
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Referral Form</h2>

        {status === "success" && (
          <div className="form-success-message">
            <strong>Thank you!</strong> Your referral has been received. Our team will contact you within 24 hours.
          </div>
        )}

        <form className="referral-form" onSubmit={handleSubmit} noValidate>

          <fieldset>
            <legend>Referral Source</legend>

            <label>
              I am a:<span className="required">*</span>
              <select name="referralSource" value={formData.referralSource} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="physician">Physician</option>
                <option value="hospital">Hospital / Case Manager</option>
                <option value="facility">Facility / Assisted Living</option>
                <option value="family">Family Member / Patient</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Your Name:<span className="required">*</span>
              <input type="text" name="referrerName" value={formData.referrerName} onChange={handleChange} required />
            </label>

            <label>
              Your Phone:<span className="required">*</span>
              <input type="tel" name="referrerPhone" value={formData.referrerPhone} onChange={handleChange} required />
            </label>

            <label>
              Your Email:
              <input type="email" name="referrerEmail" value={formData.referrerEmail} onChange={handleChange} />
            </label>

            <label>
              Facility / Organization (if applicable):
              <input type="text" name="referrerFacility" value={formData.referrerFacility} onChange={handleChange} />
            </label>
          </fieldset>

          <fieldset>
            <legend>Patient Information</legend>

            <div className="form-row">
              <label>
                First Name:<span className="required">*</span>
                <input type="text" name="patientFirstName" value={formData.patientFirstName} onChange={handleChange} required />
              </label>

              <label>
                Last Name:<span className="required">*</span>
                <input type="text" name="patientLastName" value={formData.patientLastName} onChange={handleChange} required />
              </label>
            </div>

            <div className="form-row">
              <label>
                Date of Birth:
                <input type="date" name="patientDOB" value={formData.patientDOB} onChange={handleChange} />
              </label>

              <label>
                Phone:
                <input type="tel" name="patientPhone" value={formData.patientPhone} onChange={handleChange} />
              </label>
            </div>

            <label>
              Address:<span className="required">*</span>
              <input type="text" name="patientAddress" value={formData.patientAddress} onChange={handleChange} required />
            </label>

            <div className="form-row">
              <label>
                City:<span className="required">*</span>
                <input type="text" name="patientCity" value={formData.patientCity} onChange={handleChange} required />
              </label>

              <label>
                ZIP:<span className="required">*</span>
                <input type="text" name="patientZip" value={formData.patientZip} onChange={handleChange} required />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Service Requested</legend>

            <label>
              Service Type:<span className="required">*</span>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                <option value="">Select a service...</option>
                <option value="hospice">Hospice Care</option>
                <option value="home-health">Home Health (Skilled Nursing / Therapy)</option>
                <option value="caregiving">In-Home Caregiving</option>
                <option value="primary-care">Homebound Primary Care (Access Medical)</option>
                <option value="not-sure">Not Sure / Need Guidance</option>
              </select>
            </label>

            <label>
              Urgency:
              <select name="urgency" value={formData.urgency} onChange={handleChange}>
                <option value="routine">Routine (within 3-5 days)</option>
                <option value="urgent">Urgent (within 24-48 hours)</option>
                <option value="emergent">Emergent (same day)</option>
              </select>
            </label>
          </fieldset>

          <fieldset>
            <legend>Additional Information</legend>

            <label>
              Primary Diagnosis / Reason for Referral:<span className="required">*</span>
              <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} rows="3" required></textarea>
            </label>

            <label>
              Current Physician:
              <input type="text" name="currentPhysician" value={formData.currentPhysician} onChange={handleChange} />
            </label>

            <label>
              Insurance:
              <input type="text" name="insurance" value={formData.insurance} onChange={handleChange} placeholder="e.g., Medicare, Medicaid, Blue Cross" />
            </label>

            <label>
              Additional Notes:
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows="4" placeholder="Any additional information that would be helpful..."></textarea>
            </label>
          </fieldset>

          {error && <div className="form-error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Submit Referral"}
          </button>
        </form>

        <p className="form-note">
          <strong>Note:</strong> This form is for referral inquiries. For medical emergencies, please call 911.
          For urgent clinical questions about existing patients, call our 24/7 line at{" "}
          <a href="tel:15053214819">505-321-4819</a>.
        </p>
      </section>
    </div>
  );
}

export default Referrals;
