import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <strong>RR CMS</strong>
          <span className="admin-user">{user?.email}</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <div className="admin-nav-group-label">Home CMS</div>
          <NavLink to="/admin/slides">Slides</NavLink>
          <NavLink to="/admin/news">What's New</NavLink>
          <div className="admin-nav-group-label">Services CMS</div>
          <NavLink to="/admin/nav">Navigation</NavLink>
          <NavLink to="/admin/services">Services</NavLink>
          <div className="admin-nav-group-label">Content CMS</div>
          <NavLink to="/admin/faq">FAQ</NavLink>
          <NavLink to="/admin/careers">Careers</NavLink>
        </nav>
        <button className="btn-secondary admin-logout" onClick={logout}>Logout</button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
