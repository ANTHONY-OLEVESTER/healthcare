import { apiFetch } from "./client";

export function getNews() {
  return apiFetch("/news");
}

export function createNews(payload, token) {
  return apiFetch("/news", { method: "POST", body: payload, token });
}

export function updateNews(id, payload, token) {
  return apiFetch(`/news/${id}`, { method: "PUT", body: payload, token });
}

export function deleteNews(id, token) {
  return apiFetch(`/news/${id}`, { method: "DELETE", token });
}
