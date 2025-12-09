import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function NotFound() {
  return (
    <div className="page not-found">
      <Helmet>
        <title>Page Not Found | Roadrunner Healthcare</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="page-header">
        <h1>Page not found</h1>
        <p className="lead">
          The page you're looking for may have moved or no longer exists.
        </p>
      </section>

      <section className="section">
        <p>
          Go back to the <Link to="/">home page</Link> or explore our services:
        </p>

        <div className="grid">
          <div className="card">
            <h3>Hospice Care</h3>
            <p>End-of-life comfort and family support</p>
            <Link to="/services/hospice" className="link">View hospice services →</Link>
          </div>

          <div className="card">
            <h3>Home Health</h3>
            <p>Skilled nursing and in-home care</p>
            <Link to="/services/home-health" className="link">View home health →</Link>
          </div>

          <div className="card">
            <h3>Primary Care</h3>
            <p>Homebound medical care</p>
            <Link to="/services/medical-care" className="link">View primary care →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <p>
          Need help? <Link to="/contact">Contact us</Link> or call{" "}
          <a href="tel:15053214819">505-321-4819</a>.
        </p>
      </section>
    </div>
  );
}

export default NotFound;
