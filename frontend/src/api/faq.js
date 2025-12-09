import { apiFetch } from "./client";

export function getFAQ(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiFetch(`/faq${query}`);
}
