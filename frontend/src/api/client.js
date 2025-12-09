const defaultBase =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" ? `${window.location.origin.replace(/:\d+$/, ":8000")}/api/v1` : "http://127.0.0.1:8000/api/v1");
const API_BASE_URL = defaultBase;

export async function apiFetch(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = data?.detail || response.statusText;
    throw new Error(message);
  }

  return data;
}

export { API_BASE_URL };
