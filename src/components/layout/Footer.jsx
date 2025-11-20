import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-column">
          <h4>Roadrunner Healthcare</h4>
          <p>Home health, hospice, and primary care that feels like family.</p>
          <p className="footer-tagline">Serving New Mexico with compassion and excellence.</p>
        </div>

        <div className="footer-column">
          <h5>Services</h5>
          <ul>
            <li><Link to="/services/hospice">Hospice Care</Link></li>
            <li><Link to="/services/home-health">Home Health</Link></li>
            <li><Link to="/services/medical-care">Primary Care</Link></li>
            <li><Link to="/referrals">Referrals</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Company</h5>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Contact</h5>
          <p>Corrales, New Mexico</p>
          <p>Phone: <a href="tel:15053214819">505-321-4819</a></p>
          <p>Fax: 505-898-3630</p>
          <p className="footer-hours">24/7 On-Call Support Available</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {currentYear} Roadrunner Healthcare. All rights reserved.</span>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span className="separator">|</span>
          <Link to="/hipaa">HIPAA Notice</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
