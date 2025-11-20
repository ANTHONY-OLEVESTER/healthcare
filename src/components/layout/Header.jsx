import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <NavLink to="/">
            <span className="logo-mark">RR</span>
            <span className="logo-text">
              Roadrunner <strong>Healthcare</strong>
            </span>
          </NavLink>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
            About
          </NavLink>
          <div
            className="nav-dropdown"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>
              Services
            </NavLink>
            <div className={`nav-dropdown-menu ${servicesDropdownOpen ? 'open' : ''}`}>
              <NavLink to="/services/hospice" onClick={() => setMobileMenuOpen(false)}>
                Hospice Care
              </NavLink>
              <NavLink to="/services/home-health" onClick={() => setMobileMenuOpen(false)}>
                Home Health
              </NavLink>
              <NavLink to="/services/medical-care" onClick={() => setMobileMenuOpen(false)}>
                Primary Care
              </NavLink>
            </div>
          </div>
          <NavLink to="/referrals" onClick={() => setMobileMenuOpen(false)}>
            Referrals
          </NavLink>
          <NavLink to="/careers" onClick={() => setMobileMenuOpen(false)}>
            Careers
          </NavLink>
          <NavLink to="/faq" onClick={() => setMobileMenuOpen(false)}>
            FAQ
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </NavLink>
        </nav>

        <div className="header-cta">
          <a href="tel:15053214819" className="btn-primary">
            Call 505-321-4819
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
