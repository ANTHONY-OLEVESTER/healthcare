import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./ChatWidget.css";


const SYS_PROMPT = `
You are a concise care guide for Roadrunner Healthcare.
- Focus on hospice, home health, homebound primary care, referrals, contact, and careers.
- Keep replies short and friendly. Offer one clear next step or link.
- If unsure, offer to connect to a human (call 505-321-4819 or contact page).
- Never hallucinate services; use provided intents when relevant.
`;

const INTENT_OPTIONS = [
  { label: "I need care for myself or a loved one", message: "I want to learn about care options for myself or a loved one." },
  { label: "I'm a provider with a referral", message: "I'm a healthcare provider looking to refer a patient." },
  { label: "I'm looking for a job", message: "I want to learn about careers and open roles." },
  { label: "General question", message: "I have a general question about your services." },
];

function ChatWidget() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "system", content: SYS_PROMPT }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const visibleMessages = messages.filter((m) => m.role !== "system");

  const sendMessage = async (text) => {
    const content = text || input.trim();
    if (!content) return;
    const userMsg = { role: "user", content };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1"}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ messages: nextMessages }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || res.statusText);
      setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className={`chat-widget ${open ? "open" : ""}`}>
      <button className="chat-toggle" onClick={() => setOpen(!open)} aria-label="Open chat assistant">
        💬
      </button>

      {open && (
        <div className="chat-card" role="dialog" aria-label="Chat assistant">
          <div className="chat-header">
            <div>
              <strong>Priya Caregiver</strong>
              <div className="text-muted">Ask for help or to be connected</div>
            </div>
            <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="chat-body">
            {visibleMessages.length === 0 && (
              <div className="placeholder-text">
                Hi there! I can guide you to hospice, home health, primary care, referrals, or careers. Pick an option or ask anything.
              </div>
            )}

            {visibleMessages.map((msg, i) => (
              <div key={i} className={`bubble ${msg.role}`}>
                {renderMessage(msg.content)}
              </div>
            ))}

            {error && <div className="bubble error">{error}</div>}
          </div>

          <div className="chat-intents">
            {INTENT_OPTIONS.map((opt) => (
              <button key={opt.label} onClick={() => sendMessage(opt.message)} className="intent-btn">
                {opt.label}
              </button>
            ))}
          </div>

          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              aria-label="Chat message"
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </form>

          <div className="chat-footer">
            Need a human? Call <a href="tel:15053214819">505-321-4819</a> or <a href="/contact">contact us</a>.
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;

function renderMessage(text) {
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  const base = typeof window !== "undefined" ? window.location.origin : "";

  const resolveHref = (href) => {
    if (href.startsWith("/")) {
      return `${base}${href}`;
    }
    return href;
  };

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a key={`${match.index}-${match[2]}`} href={resolveHref(match[2])} className="chat-link">
        {match[1]}
      </a>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}
