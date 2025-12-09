import React, { useEffect, useState } from "react";
import { getServices, createService, updateService, deleteService } from "../../api/services";
import { useAuth } from "../../context/AuthContext";
import { uploadFile } from "../../api/uploads";

function serializeList(value) {
  if (!value) return [];
  return value.split("\n").map((v) => v.trim()).filter(Boolean);
}

function AdminServices() {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    short_description: "",
    long_description: "",
    hero_title: "",
    hero_subtitle: "",
    hero_image_url: "",
    highlight_points: "",
    gallery_image_urls: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleHeroUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file, token);
      setForm((prev) => ({ ...prev, hero_image_url: res.url }));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file, token);
      setForm((prev) => ({
        ...prev,
        gallery_image_urls: [res.url, ...(prev.gallery_image_urls ? prev.gallery_image_urls.split("\n").filter(Boolean) : [])].join("\n"),
      }));
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
    const payload = {
      name: form.name,
      slug: form.slug,
      short_description: form.short_description,
      long_description: form.long_description,
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      hero_image_url: form.hero_image_url,
      highlight_points: serializeList(form.highlight_points),
      gallery_image_urls: serializeList(form.gallery_image_urls),
      category: form.category,
    };
    try {
      if (editingId) {
        await updateService(editingId, payload, token);
      } else {
        await createService(payload, token);
      }
      setForm({
        name: "",
        slug: "",
        short_description: "",
        long_description: "",
        hero_title: "",
        hero_subtitle: "",
        hero_image_url: "",
        highlight_points: "",
        gallery_image_urls: "",
        category: "",
      });
      setEditingId(null);
      load();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (svc) => {
    setEditingId(svc.id);
    setForm({
      name: svc.name || "",
      slug: svc.slug || "",
      short_description: svc.short_description || "",
      long_description: svc.long_description || "",
      hero_title: svc.hero_title || "",
      hero_subtitle: svc.hero_subtitle || "",
      hero_image_url: svc.hero_image_url || "",
      highlight_points: (svc.highlight_points || []).join("\n"),
      gallery_image_urls: (svc.gallery_image_urls || []).join("\n"),
      category: svc.category || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id, token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1>Services</h1>
          <p className="text-muted">Manage service content, hero imagery, and highlights.</p>
        </div>
      </div>
      {error && <p className="form-error-message">{error}</p>}

      <div className="admin-grid">
        <div className="admin-card">
          <h3>{editingId ? "Edit Service" : "Add Service"}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
            <label>Slug<input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required /></label>
            <label>Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
            <label>Short description<textarea value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} /></label>
            <label>Long description<textarea value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} rows={4} /></label>
            <label>Hero title<input value={form.hero_title} onChange={(e) => setForm({ ...form, hero_title: e.target.value })} /></label>
            <label>Hero subtitle<textarea value={form.hero_subtitle} onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })} rows={2} /></label>
            <label>Hero image URL<input value={form.hero_image_url} onChange={(e) => setForm({ ...form, hero_image_url: e.target.value })} /></label>
            <label>Upload hero image<input type="file" accept="image/*" onChange={handleHeroUpload} disabled={uploading} /></label>
            <label>Highlight points (one per line)<textarea value={form.highlight_points} onChange={(e) => setForm({ ...form, highlight_points: e.target.value })} rows={3} /></label>
            <label>Gallery image URLs (one per line)<textarea value={form.gallery_image_urls} onChange={(e) => setForm({ ...form, gallery_image_urls: e.target.value })} rows={3} /></label>
            <label>Upload gallery image<input type="file" accept="image/*" onChange={handleGalleryUpload} disabled={uploading} /></label>
            <div className="admin-actions">
              <button type="submit" className="btn-primary">{editingId ? "Update" : "Create"}</button>
              {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ name: "", slug: "", short_description: "", long_description: "", hero_title: "", hero_subtitle: "", hero_image_url: "", highlight_points: "", gallery_image_urls: "", category: "" }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-card">
          <h3>Existing Services</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id}>
                  <td>{svc.name}</td>
                  <td>{svc.slug}</td>
                  <td>{svc.category || "-"}</td>
                  <td className="admin-table-actions">
                    <button className="btn-secondary" onClick={() => startEdit(svc)}>Edit</button>
                    <button className="btn-secondary" onClick={() => handleDelete(svc.id)}>Delete</button>
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

export default AdminServices;
