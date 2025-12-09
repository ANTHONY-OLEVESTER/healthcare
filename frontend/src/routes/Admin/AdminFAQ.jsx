import React, { useEffect, useState } from "react";
import { getFAQ, createFAQ, updateFAQ, deleteFAQ } from "../../api/faq";
import { useAuth } from "../../context/AuthContext";

function AdminFAQ() {
  const { token } = useAuth();
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "", category: "", order: 0, is_active: true });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const data = await getFAQ();
      setFaqs(data);
    } catch (err) {
      setError(err.message);
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
        await updateFAQ(editingId, payload, token);
      } else {
        await createFAQ(payload, token);
      }
      setForm({ question: "", answer: "", category: "", order: 0, is_active: true });
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
      question: item.question,
      answer: item.answer,
      category: item.category || "",
      order: item.order || 0,
      is_active: item.is_active,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await deleteFAQ(id, token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1>FAQs</h1>
          <p className="text-muted">Manage questions, answers, categories, and ordering.</p>
        </div>
      </div>
      {error && <p className="form-error-message">{error}</p>}

      <div className="admin-grid">
        <div className="admin-card">
          <h3>{editingId ? "Edit FAQ" : "Add FAQ"}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>Question<input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required /></label>
            <label>Answer<textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={3} required /></label>
            <label>Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
            <label>Order<input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></label>
            <label className="inline">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              Active
            </label>
            <div className="admin-actions">
              <button type="submit" className="btn-primary">{editingId ? "Update" : "Create"}</button>
              {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ question: "", answer: "", category: "", order: 0, is_active: true }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-card">
          <h3>Existing FAQs</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Category</th>
                <th>Order</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id}>
                  <td>{faq.question}</td>
                  <td>{faq.category || "-"}</td>
                  <td>{faq.order}</td>
                  <td>{faq.is_active ? "Active" : "Hidden"}</td>
                  <td className="admin-table-actions">
                    <button className="btn-secondary" onClick={() => startEdit(faq)}>Edit</button>
                    <button className="btn-secondary" onClick={() => handleDelete(faq.id)}>Delete</button>
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

export default AdminFAQ;
