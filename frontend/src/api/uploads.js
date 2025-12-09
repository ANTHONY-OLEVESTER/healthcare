import { apiFetch } from "./client";

export function uploadFile(file, token) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${API_BASE_URL}/uploads`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.detail || res.statusText);
    }
    return data;
  });
}
