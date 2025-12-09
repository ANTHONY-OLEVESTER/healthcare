import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest, getCurrentUser } from "../api/auth";

const AuthContext = createContext(null);
const TOKEN_KEY = "roadrunner_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchUser() {
      if (!token) return;
      try {
        const me = await getCurrentUser(token);
        if (!cancelled) {
          setUser(me);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setUser(null);
          setToken(null);
          localStorage.removeItem(TOKEN_KEY);
          setLoading(false);
        }
      }
    }
    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = async (email, password) => {
    setError(null);
    const result = await loginRequest(email, password);
    setToken(result.access_token);
    localStorage.setItem(TOKEN_KEY, result.access_token);
    const me = await getCurrentUser(result.access_token);
    setUser(me);
    return me;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = { user, token, login, logout, loading, error, setError };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
