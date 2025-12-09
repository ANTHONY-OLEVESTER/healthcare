import React, { useEffect, useState } from "react";
import { getSlides, createSlide, updateSlide, deleteSlide } from "../../api/slides";
import { useAuth } from "../../context/AuthContext";
import { uploadFile } from "../../api/uploads";

function AdminSlides() {
  const { token } = useAuth();
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    cta_label: "",
    cta_url: "",
    order: 0,
    is_active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      const data = await getSlides();
      setSlides(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file, token);
      setForm((prev) => ({ ...prev, image_url: res.url }));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editingId) {
        await updateSlide(editingId, payload, token);
      } else {
        await createSlide(payload, token);
      }
      setForm({ title: "", subtitle: "", image_url: "", cta_label: "", cta_url: "", order: 0, is_active: true });
      setEditingId(null);
      load();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (slide) => {
    setEditingId(slide.id);
    setForm({
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      image_url: slide.image_url || "",
      cta_label: slide.cta_label || "",
      cta_url: slide.cta_url || "",
      order: slide.order || 0,
      is_active: slide.is_active,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slide?")) return;
    try {
      await deleteSlide(id, token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1>Homepage Slides</h1>
          <p className="text-muted">Manage hero/slider images and CTAs.</p>
        </div>
      </div>
      {error && <p className="form-error-message">{error}</p>}

      <div className="admin-grid">
        <div className="admin-card">
          <h3>{editingId ? "Edit Slide" : "Add Slide"}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
            <label>Subtitle<textarea value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} rows={2} /></label>
            <label>Image URL<input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required /></label>
            <label>Upload image<input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} /></label>
            {uploading && <p className="text-muted">Uploading...</p>}
            <label>CTA Label<input value={form.cta_label} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} /></label>
            <label>CTA URL<input value={form.cta_url} onChange={(e) => setForm({ ...form, cta_url: e.target.value })} /></label>
            <label>Order<input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></label>
            <label className="inline"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
            <div className="admin-actions">
              <button type="submit" className="btn-primary">{editingId ? "Update" : "Create"}</button>
              {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ title: "", subtitle: "", image_url: "", cta_label: "", cta_url: "", order: 0, is_active: true }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-card">
          <h3>Slides</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Order</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide) => (
                <tr key={slide.id}>
                  <td>{slide.title}</td>
                  <td>{slide.order}</td>
                  <td>{slide.is_active ? "Active" : "Hidden"}</td>
                  <td className="admin-table-actions">
                    <button className="btn-secondary" onClick={() => startEdit(slide)}>Edit</button>
                    <button className="btn-secondary" onClick={() => handleDelete(slide.id)}>Delete</button>
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

export default AdminSlides;
