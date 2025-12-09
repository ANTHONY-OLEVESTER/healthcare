import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted">Welcome, {user?.full_name || user?.email}.</p>
        </div>
      </div>
      <div className="admin-grid">
        <div className="admin-card">
          <h3>Navigation</h3>
          <p>Manage header links and service dropdown items.</p>
          <Link className="btn-primary" to="/admin/nav">Go to Navigation</Link>
        </div>
        <div className="admin-card">
          <h3>Services</h3>
          <p>Update service copy, imagery, and highlights.</p>
          <Link className="btn-primary" to="/admin/services">Go to Services</Link>
        </div>
        <div className="admin-card">
          <h3>FAQ</h3>
          <p>Control FAQ questions, answers, and categories.</p>
          <Link className="btn-primary" to="/admin/faq">Go to FAQ</Link>
        </div>
        <div className="admin-card">
          <h3>Careers</h3>
          <p>Manage job postings shown on the careers page.</p>
          <Link className="btn-primary" to="/admin/careers">Go to Careers</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
