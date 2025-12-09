import { apiFetch } from "./client";

export function getNavTree() {
  return apiFetch("/nav");
}
