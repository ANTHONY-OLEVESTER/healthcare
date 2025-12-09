import React, { useEffect, useState } from "react";
import { getCareers } from "../api/careers";

function Careers() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getCareers();
        if (!cancelled) setJobs(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page">
      <section className="page-header">
        <h1>Careers at Roadrunner Healthcare</h1>
        <p className="lead">
          Join a compassionate, locally owned team committed to exceptional home-based care.
        </p>
      </section>

      <section className="section">
        <h2>Open positions</h2>
        {error && <p className="form-error-message">{error}</p>}
        {jobs.length === 0 && !error && <p>No open roles listed right now. Check back soon.</p>}
        <div className="positions-list">
          {jobs.map((job) => (
            <div className="position-card" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.department} {job.location ? `• ${job.location}` : ""}</p>
              <p className="text-muted">{job.employment_type}</p>
              {job.description && <p>{job.description}</p>}
            </div>
          ))}
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

      <section className="section cta-section">
        <h2>Ready to join our team?</h2>
        <p>
          Send your resume to <a href="mailto:careers@roadrunnerhealthcare.com" className="email-link">careers@roadrunnerhealthcare.com</a>
          or call us at <a href="tel:15053214819">505-321-4819</a>.
        </p>
        <div className="cta-actions">
          <a href="mailto:careers@roadrunnerhealthcare.com" className="btn-primary">
            Email Your Resume
          </a>
          <a href="tel:15053214819" className="btn-secondary email-link">
            Call 505-321-4819
          </a>
        </div>
      </section>
    </div>
  );
}

export default Careers;
