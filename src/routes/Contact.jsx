import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would submit to your backend or email service
    console.log("Contact form submitted:", formData);
    alert("Thank you for your message. We'll respond within 24 hours.");
  };

  return (
    <div className="page contact-page">
      <section className="page-header">
        <h1>Contact Us</h1>
        <p className="lead">
          We're here to answer your questions and help you get the care you need.
        </p>
      </section>

      <section className="section contact-info-section">
        <div className="contact-grid">
          <div className="contact-card">
            <h2>Main Office</h2>
            <p>
              <strong>Roadrunner Healthcare</strong><br />
              Corrales, New Mexico
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:15053214819">505-321-4819</a><br />
              <strong>Fax:</strong> 505-898-3630
            </p>
            <p className="contact-hours">
              Office Hours: Monday – Friday, 8:00 AM – 5:00 PM<br />
              <strong>24/7 On-Call Support Available</strong>
            </p>
          </div>

          <div className="contact-card">
            <h2>Hospice Care</h2>
            <p>
              <strong>Roadrunner Hospice</strong>
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:15053214819">505-321-4819</a><br />
              <strong>24/7 On-Call:</strong> <a href="tel:15053214819">505-321-4819</a>
            </p>
          </div>

          <div className="contact-card">
            <h2>Home Health</h2>
            <p>
              <strong>Roadrunner Home Health</strong>
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:15053214819">505-321-4819</a><br />
              <strong>Fax:</strong> 505-898-3630
            </p>
          </div>

          <div className="contact-card">
            <h2>Primary Care</h2>
            <p>
              <strong>Access Medical</strong>
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:15053214819">505-321-4819</a><br />
              <strong>Email:</strong> <a href="mailto:info@accessmedicalnm.care">info@accessmedicalnm.care</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <p>
            Have a question or need more information? Fill out the form below and
            we'll get back to you within 24 hours.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <div className="form-row">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Subject:
              <select name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="">Select a subject...</option>
                <option value="general">General Question</option>
                <option value="hospice">Hospice Services</option>
                <option value="home-health">Home Health Services</option>
                <option value="primary-care">Primary Care (Access Medical)</option>
                <option value="referral">Referral Inquiry</option>
                <option value="careers">Careers</option>
                <option value="billing">Billing Question</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </label>

            <button type="submit" className="btn-primary">Send Message</button>
          </form>

          <p className="form-note">
            <strong>For medical emergencies, call 911.</strong><br />
            For urgent clinical questions about existing patients, call our 24/7 line at{" "}
            <a href="tel:15053214819">505-321-4819</a>.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Service Area</h2>
        <p>
          We proudly serve patients and families throughout the greater Albuquerque area, including:
        </p>
        <ul className="service-areas">
          <li>Corrales</li>
          <li>Albuquerque</li>
          <li>Rio Rancho</li>
          <li>Bernalillo</li>
          <li>Placitas</li>
          <li>And surrounding communities</li>
        </ul>
        <p>
          If you're unsure whether we serve your area, please call us – we'll do our best to help.
        </p>
      </section>
    </div>
  );
}

export default Contact;
