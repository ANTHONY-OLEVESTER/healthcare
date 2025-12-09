import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { galleryImages } from "../../content/galleryImages";
import { getNavTree } from "../../api/nav";
import { getServices } from "../../api/services";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [navError, setNavError] = useState(null);

  const fallbackNav = [
    { id: "home", label: "Home", path: "/", order: 1, children: [] },
    { id: "about", label: "About", path: "/about", order: 2, children: [] },
    {
      id: "services",
      label: "Services",
      path: "/services",
      order: 3,
      children: [
        { id: "hospice", label: "Hospice Care", path: "/services/hospice", order: 1, children: [] },
        { id: "home-health", label: "Home Health", path: "/services/home-health", order: 2, children: [] },
        { id: "primary-care", label: "Primary Care", path: "/services/medical-care", order: 3, children: [] },
      ],
    },
    { id: "referrals", label: "Referrals", path: "/referrals", order: 4, children: [] },
    { id: "careers", label: "Careers", path: "/careers", order: 5, children: [] },
    { id: "faq", label: "FAQ", path: "/faq", order: 6, children: [] },
    { id: "contact", label: "Contact", path: "/contact", order: 7, children: [] },
  ];

  useEffect(() => {
    let cancelled = false;
    async function loadNav() {
      try {
        const [navData, services] = await Promise.all([getNavTree(), getServices().catch(() => [])]);
        if (!cancelled) {
          setNavItems(navData?.length ? navData : fallbackNav);
          setServiceList(services || []);
        }
      } catch (err) {
        if (!cancelled) {
          setNavItems(fallbackNav);
          setNavError(err.message);
        }
      }
    }
    loadNav();
    return () => {
      cancelled = true;
    };
  }, []);

  const getServiceThumb = (path) => {
    const slug = path.split("/").filter(Boolean).pop();
    const match = serviceList.find((svc) => svc.slug === slug);
    return match?.hero_image_url || match?.gallery_image_urls?.[0] || galleryImages.find((img) => img.title?.toLowerCase().includes(slug || ""))?.src || galleryImages[0]?.src;
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <NavLink to="/">
            <img
              src="https://roadrunnerhhc.com/wp-content/uploads/2022/12/cropped-cropped-RoadRunnerHospice_web_Logo-150x75.png"
              alt="Roadrunner Healthcare"
              className="logo-img"
            />
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
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            if (!hasChildren) {
              return (
                <NavLink key={item.id || item.path} to={item.path} end={item.path === "/"} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </NavLink>
              );
            }
            return (
              <div
                key={item.id || item.path}
                className="nav-dropdown"
                onMouseEnter={() => setOpenDropdownId(item.id || item.path)}
                onMouseLeave={() => setOpenDropdownId(null)}
              >
                <NavLink to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </NavLink>
                <div className={`nav-dropdown-menu ${openDropdownId === (item.id || item.path) ? 'open' : ''}`}>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.id || child.path}
                      to={child.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="nav-dropdown-link"
                    >
                      <span
                        className="nav-thumb"
                        style={{ backgroundImage: `url(${getServiceThumb(child.path)})` }}
                        aria-hidden="true"
                      />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
          {navError && <span className="text-muted" style={{ fontSize: "0.85rem" }}>Offline menu</span>}
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
