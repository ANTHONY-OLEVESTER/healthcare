import React, { useEffect, useRef, useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import "./AccessibilityPanel.css";

function AccessibilityPanel() {
  const { prefs, setTheme, setFontScale, setToggle, reset } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [reading, setReading] = useState(false);
  const synthRef = useRef(window.speechSynthesis || null);

  useEffect(() => {
    return () => {
      if (synthRef.current && synthRef.current.speaking) synthRef.current.cancel();
    };
  }, []);

  const startReadAloud = () => {
    if (!synthRef.current) return;
    const text = document.body?.innerText || "";
    if (!text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 8000));
    utterance.onend = () => setReading(false);
    synthRef.current.cancel();
    synthRef.current.speak(utterance);
    setReading(true);
  };

  const stopReadAloud = () => {
    if (synthRef.current && synthRef.current.speaking) synthRef.current.cancel();
    setReading(false);
  };

  return (
    <div className={`accessibility-panel ${open ? "open" : ""}`}>
      <button
        className="accessibility-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Accessibility settings"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        ♿
      </button>

      {open && (
        <div
          className="accessibility-card"
          role="dialog"
          aria-label="Accessibility controls"
        >
          <div className="accessibility-header">
            <div>
              <h4>Accessibility</h4>
              <p className="accessibility-subtitle">
                Adjust contrast, text, motion, and media.
              </p>
            </div>
            <button className="btn-chip btn-ghost" onClick={reset}>
              Reset
            </button>
          </div>

          {/* COLOR & CONTRAST */}
          <div className="accessibility-section">
            <div className="section-title-row">
              <h5>Color &amp; Contrast</h5>
            </div>
            <div className="chip-row">
              <button
                className={`btn-chip ${prefs.theme === "default" ? "is-active" : ""}`}
                onClick={() => setTheme("default")}
              >
                Default
              </button>
              <button
                className={`btn-chip ${prefs.theme === "high-contrast" ? "is-active" : ""}`}
                onClick={() => setTheme("high-contrast")}
              >
                High Contrast
              </button>
              <button
                className={`btn-chip ${prefs.theme === "colorblind" ? "is-active" : ""}`}
                onClick={() => setTheme("colorblind")}
              >
                Color Blind
              </button>
              <button
                className={`btn-chip ${prefs.monochrome ? "is-active" : ""}`}
                onClick={() => setToggle("monochrome", !prefs.monochrome)}
              >
                Monochrome
              </button>
              <button
                className={`btn-chip ${prefs.lowSaturation ? "is-active" : ""}`}
                onClick={() => setToggle("lowSaturation", !prefs.lowSaturation)}
              >
                Low Saturation
              </button>
            </div>
          </div>

          {/* CONTENT & MOTION */}
          <div className="accessibility-section">
            <div className="section-title-row">
              <h5>Content &amp; Motion</h5>
            </div>
            <div className="chip-row chip-row-wrap">
              <div className="font-scale-control">
                <button
                  className="btn-chip btn-square"
                  onClick={() =>
                    setFontScale(Math.max(0.8, prefs.fontScale - 0.1))
                  }
                >
                  A-
                </button>
                <span className="font-scale-value">
                  {Math.round(prefs.fontScale * 100)}%
                </span>
                <button
                  className="btn-chip btn-square"
                  onClick={() =>
                    setFontScale(Math.min(1.5, prefs.fontScale + 0.1))
                  }
                >
                  A+
                </button>
              </div>

              <button
                className={`btn-chip ${prefs.reducedMotion ? "is-active" : ""}`}
                onClick={() =>
                  setToggle("reducedMotion", !prefs.reducedMotion)
                }
              >
                Stop Animations
              </button>
              <button
                className={`btn-chip ${prefs.highlightFocus ? "is-active" : ""}`}
                onClick={() =>
                  setToggle("highlightFocus", !prefs.highlightFocus)
                }
              >
                Highlight Focus
              </button>
            </div>
          </div>

          {/* IMAGES & MEDIA */}
          <div className="accessibility-section">
            <div className="section-title-row">
              <h5>Images &amp; Media</h5>
            </div>
            <div className="chip-row">
              <button
                className={`btn-chip ${prefs.hideImages ? "is-active" : ""}`}
                onClick={() => setToggle("hideImages", !prefs.hideImages)}
              >
                Hide Images
              </button>
              <button
                className={`btn-chip ${prefs.muteMedia ? "is-active" : ""}`}
                onClick={() => setToggle("muteMedia", !prefs.muteMedia)}
              >
                Mute Media
              </button>
            </div>
          </div>

          {/* READ ALOUD */}
          <div className="accessibility-section">
            <div className="section-title-row">
              <h5>Read Aloud</h5>
            </div>
            <div className="chip-row">
              <button
                className={`btn-primary-full ${reading ? "is-active" : ""}`}
                onClick={reading ? stopReadAloud : startReadAloud}
              >
                {reading ? "Stop Reading" : "Read Page"}
              </button>
            </div>
            <p className="accessibility-caption">
              Uses your browser's speech engine to read visible page text.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityPanel;
