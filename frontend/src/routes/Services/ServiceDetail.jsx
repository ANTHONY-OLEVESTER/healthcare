import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceBySlug } from "../../api/services";
import { galleryImages } from "../../content/galleryImages";

function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getServiceBySlug(slug);
        if (!cancelled) setService(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <div className="page service-page"><p>Loading service...</p></div>;
  if (error) return <div className="page service-page"><p>{error}</p></div>;
  if (!service) return <div className="page service-page"><p>Service not found.</p></div>;

  const heroImage = service.hero_image_url || galleryImages[0]?.src;
  const gallery = service.gallery_image_urls || [];

  return (
    <div className="page service-page">
      <section
        className="page-header service-header service-hero"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        <h1>{service.hero_title || service.name}</h1>
        {service.hero_subtitle && <p className="lead">{service.hero_subtitle}</p>}
      </section>

      <section className="section">
        <h2>{service.name}</h2>
        <p>{service.long_description || service.short_description}</p>

        {service.highlight_points?.length > 0 && (
          <ul className="service-features">
            {service.highlight_points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        )}

        {gallery.length > 0 && (
          <div className="service-photo-grid">
            {gallery.map((url) => (
              <figure key={url} className="service-photo">
                <img src={url} alt={service.name} loading="lazy" />
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ServiceDetail;
