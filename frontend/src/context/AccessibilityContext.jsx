import React, { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext(null);
const STORAGE_KEY = "rr_accessibility";

const DEFAULT_PREFS = {
  theme: "default",
  fontScale: 1,
  reducedMotion: false,
  hideImages: false,
  highlightFocus: false,
  monochrome: false,
  lowSaturation: false,
  muteMedia: false,
};

export function AccessibilityProvider({ children }) {
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_PREFS, ...JSON.parse(saved) } : DEFAULT_PREFS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));

    const body = document.body;
    body.classList.remove(
      "theme-default",
      "theme-high-contrast",
      "theme-colorblind",
      "pref-reduced-motion",
      "pref-hide-images",
      "pref-highlight-focus",
      "pref-monochrome",
      "pref-low-saturation"
    );
    body.classList.add(`theme-${prefs.theme}`);
    if (prefs.reducedMotion) body.classList.add("pref-reduced-motion");
    if (prefs.hideImages) body.classList.add("pref-hide-images");
    if (prefs.highlightFocus) body.classList.add("pref-highlight-focus");
    if (prefs.monochrome) body.classList.add("pref-monochrome");
    if (prefs.lowSaturation) body.classList.add("pref-low-saturation");

    body.style.fontSize = `${16 * prefs.fontScale}px`;

    // Mute/unmute media elements
    document.querySelectorAll("video, audio").forEach((el) => {
      el.muted = prefs.muteMedia;
      el.autoplay = !prefs.muteMedia;
    });
  }, [prefs]);

  const setTheme = (theme) => setPrefs((p) => ({ ...p, theme }));
  const setFontScale = (scale) => setPrefs((p) => ({ ...p, fontScale: scale }));
  const setToggle = (key, value) => setPrefs((p) => ({ ...p, [key]: value }));
  const reset = () => setPrefs(DEFAULT_PREFS);

  return (
    <AccessibilityContext.Provider value={{ prefs, setTheme, setFontScale, setToggle, reset }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
