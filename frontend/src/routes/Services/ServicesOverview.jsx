import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { galleryImages } from "../../content/galleryImages";
import { getServices } from "../../api/services";

function ServicesOverview() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getServices();
        if (!cancelled) setServices(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const heroImage = services[0]?.hero_image_url || galleryImages[0]?.src;

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
        {error && <p className="form-error-message">{error}</p>}
        <div className="services-grid">
          {services.map((service) => {
            const media = service.hero_image_url || service.gallery_image_urls?.[0] || galleryImages[1]?.src;
            return (
              <div className="service-card" key={service.id}>
                {media && (
                  <div
                    className="service-media"
                    style={{ backgroundImage: `url(${media})` }}
                    role="img"
                    aria-label={service.name}
                  />
                )}
                <div className="service-card-header">
                  <div className="service-icon">*</div>
                  <h2>{service.name}</h2>
                </div>
                <p className="service-description">{service.short_description}</p>
                {service.highlight_points?.length > 0 && (
                  <ul className="service-features">
                    {service.highlight_points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
                <Link to={`/services/${service.slug}`} className="btn-secondary">
                  View {service.name}
                </Link>
              </div>
            );
          })}
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
