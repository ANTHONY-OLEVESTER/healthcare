import { apiFetch } from "./client";

export async function login(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function getCurrentUser(token) {
  return apiFetch("/users/me", { token });
}
