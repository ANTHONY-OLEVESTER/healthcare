import { apiFetch } from "./client";

export function getCareers() {
  return apiFetch("/careers");
}

export function getCareerById(id) {
  return apiFetch(`/careers/${id}`);
}
