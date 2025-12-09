import { apiFetch } from "./client";

export function getNavTree() {
  return apiFetch("/nav");
}

export function createNavItem(payload, token) {
  return apiFetch("/nav", { method: "POST", body: payload, token });
}

export function updateNavItem(id, payload, token) {
  return apiFetch(`/nav/${id}`, { method: "PUT", body: payload, token });
}

export function deleteNavItem(id, token) {
  return apiFetch(`/nav/${id}`, { method: "DELETE", token });
}
