import React, { useEffect, useState } from "react";
import { getNavTree, createNavItem, updateNavItem, deleteNavItem } from "../../api/nav";
import { useAuth } from "../../context/AuthContext";

function flatten(tree) {
  const result = [];
  function walk(nodes, parentLabel = null) {
    nodes.forEach((node) => {
      result.push({ ...node, parentLabel });
      if (node.children?.length) walk(node.children, node.label);
    });
  }
  walk(tree);
  return result;
}

function AdminNav() {
  const { token } = useAuth();
  const [navItems, setNavItems] = useState([]);
  const [form, setForm] = useState({ label: "", path: "", order: 0, parent_id: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const data = await getNavTree();
      setNavItems(flatten(data));
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
      const payload = {
        label: form.label,
        path: form.path,
        order: Number(form.order) || 0,
        parent_id: form.parent_id ? Number(form.parent_id) : null,
        is_visible: true,
      };
      if (editingId) {
        await updateNavItem(editingId, payload, token);
      } else {
        await createNavItem(payload, token);
      }
      setForm({ label: "", path: "", order: 0, parent_id: "" });
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
      label: item.label,
      path: item.path,
      order: item.order,
      parent_id: item.parent_id || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this nav item?")) return;
    try {
      await deleteNavItem(id, token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1>Navigation</h1>
          <p className="text-muted">Manage header links and dropdown items.</p>
        </div>
      </div>

      {error && <p className="form-error-message">{error}</p>}

      <div className="admin-grid">
        <div className="admin-card">
          <h3>{editingId ? "Edit Nav Item" : "Add Nav Item"}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>
              Label
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
            </label>
            <label>
              Path
              <input value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })} required />
            </label>
            <label>
              Order
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
            </label>
            <label>
              Parent
              <select value={form.parent_id} onChange={(e) => setForm({ ...form, parent_id: e.target.value })}>
                <option value="">(none)</option>
                {navItems.filter((n) => !n.parent_id).map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </label>
            <div className="admin-actions">
              <button type="submit" className="btn-primary">{editingId ? "Update" : "Create"}</button>
              {editingId && (
                <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ label: "", path: "", order: 0, parent_id: "" }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-card">
          <h3>Current Items</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Path</th>
                <th>Parent</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {navItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.label}</td>
                  <td>{item.path}</td>
                  <td>{item.parentLabel || "-"}</td>
                  <td>{item.order}</td>
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

export default AdminNav;
