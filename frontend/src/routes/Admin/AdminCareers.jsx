import React, { useEffect, useState } from "react";
import { getCareers, createCareer, updateCareer, deleteCareer } from "../../api/careers";
import { useAuth } from "../../context/AuthContext";

function AdminCareers() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    department: "",
    employment_type: "",
    description: "",
    is_active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const data = await getCareers();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCareer(editingId, form, token);
      } else {
        await createCareer(form, token);
      }
      setForm({
        title: "",
        location: "",
        department: "",
        employment_type: "",
        description: "",
        is_active: true,
      });
      setEditingId(null);
      load();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (job) => {
    setEditingId(job.id);
    setForm({
      title: job.title || "",
      location: job.location || "",
      department: job.department || "",
      employment_type: job.employment_type || "",
      description: job.description || "",
      is_active: job.is_active,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await deleteCareer(id, token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1>Careers</h1>
          <p className="text-muted">Manage job postings displayed on the careers page.</p>
        </div>
      </div>
      {error && <p className="form-error-message">{error}</p>}

      <div className="admin-grid">
        <div className="admin-card">
          <h3>{editingId ? "Edit Job" : "Add Job"}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
            <label>Location<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
            <label>Department<input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></label>
            <label>Employment type<input value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })} /></label>
            <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} /></label>
            <label className="inline">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              Active
            </label>
            <div className="admin-actions">
              <button type="submit" className="btn-primary">{editingId ? "Update" : "Create"}</button>
              {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ title: "", location: "", department: "", employment_type: "", description: "", is_active: true }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-card">
          <h3>Job Listings</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Department</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.location || "-"}</td>
                  <td>{job.department || "-"}</td>
                  <td>{job.employment_type || "-"}</td>
                  <td>{job.is_active ? "Active" : "Hidden"}</td>
                  <td className="admin-table-actions">
                    <button className="btn-secondary" onClick={() => startEdit(job)}>Edit</button>
                    <button className="btn-secondary" onClick={() => handleDelete(job.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCareers;
