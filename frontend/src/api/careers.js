import { apiFetch } from "./client";

export function getCareers() {
  return apiFetch("/careers");
}

export function getCareerById(id) {
  return apiFetch(`/careers/${id}`);
}

export function createCareer(payload, token) {
  return apiFetch("/careers", { method: "POST", body: payload, token });
}

export function updateCareer(id, payload, token) {
  return apiFetch(`/careers/${id}`, { method: "PUT", body: payload, token });
}

export function deleteCareer(id, token) {
  return apiFetch(`/careers/${id}`, { method: "DELETE", token });
}
