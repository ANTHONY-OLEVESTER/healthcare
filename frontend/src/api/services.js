import { apiFetch } from "./client";

export function getServices() {
  return apiFetch("/services");
}

export function getServiceBySlug(slug) {
  return apiFetch(`/services/${slug}`);
}

export function createService(payload, token) {
  return apiFetch("/services", { method: "POST", body: payload, token });
}

export function updateService(id, payload, token) {
  return apiFetch(`/services/${id}`, { method: "PUT", body: payload, token });
}

export function deleteService(id, token) {
  return apiFetch(`/services/${id}`, { method: "DELETE", token });
}
