import React, { useEffect, useState } from "react";
import { getNews, createNews, updateNews, deleteNews } from "../../api/news";
import { useAuth } from "../../context/AuthContext";
import { uploadFile } from "../../api/uploads";

function AdminNews() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    link: "",
    image_url: "",
    order: 0,
    is_active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      const data = await getNews();
      setItems(data);
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
        await updateNews(editingId, payload, token);
      } else {
        await createNews(payload, token);
      }
      setForm({ title: "", summary: "", link: "", image_url: "", order: 0, is_active: true });
      setEditingId(null);
      load();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      summary: item.summary || "",
      link: item.link || "",
      image_url: item.image_url || "",
      order: item.order || 0,
      is_active: item.is_active,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news item?")) return;
    try {
      await deleteNews(id, token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1>What's New</h1>
          <p className="text-muted">Manage homepage updates and announcements.</p>
        </div>
      </div>
      {error && <p className="form-error-message">{error}</p>}

      <div className="admin-grid">
        <div className="admin-card">
          <h3>{editingId ? "Edit Item" : "Add Item"}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
            <label>Summary<textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={3} /></label>
            <label>Link<input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} /></label>
            <label>Image URL<input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></label>
            <label>Upload image<input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} /></label>
            {uploading && <p className="text-muted">Uploading...</p>}
            <label>Order<input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></label>
            <label className="inline"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
            <div className="admin-actions">
              <button type="submit" className="btn-primary">{editingId ? "Update" : "Create"}</button>
              {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ title: "", summary: "", link: "", image_url: "", order: 0, is_active: true }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-card">
          <h3>Items</h3>
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
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.order}</td>
                  <td>{item.is_active ? "Active" : "Hidden"}</td>
                  <td className="admin-table-actions">
                    <button className="btn-secondary" onClick={() => startEdit(item)}>Edit</button>
                    <button className="btn-secondary" onClick={() => handleDelete(item.id)}>Delete</button>
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

export default AdminNews;
