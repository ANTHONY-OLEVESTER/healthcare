import { apiFetch } from "./client";

export function getSlides() {
  return apiFetch("/slides");
}

export function createSlide(payload, token) {
  return apiFetch("/slides", { method: "POST", body: payload, token });
}

export function updateSlide(id, payload, token) {
  return apiFetch(`/slides/${id}`, { method: "PUT", body: payload, token });
}

export function deleteSlide(id, token) {
  return apiFetch(`/slides/${id}`, { method: "DELETE", token });
}
