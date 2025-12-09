import { apiFetch } from "./client";

export function getFAQ(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiFetch(`/faq${query}`);
}

export function createFAQ(payload, token) {
  return apiFetch("/faq", { method: "POST", body: payload, token });
}

export function updateFAQ(id, payload, token) {
  return apiFetch(`/faq/${id}`, { method: "PUT", body: payload, token });
}

export function deleteFAQ(id, token) {
  return apiFetch(`/faq/${id}`, { method: "DELETE", token });
}
