import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const { user, logout, loading } = useAuth();

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="page">
      <section className="page-header">
        <h1>Admin Dashboard</h1>
        <p className="lead">Manage navigation, services, FAQ, and careers.</p>
      </section>
      <section className="section">
        <p>Welcome, {user.full_name || user.email}.</p>
        <button className="btn-secondary" onClick={logout}>Logout</button>
      </section>
    </div>
  );
}

export default AdminDashboard;
