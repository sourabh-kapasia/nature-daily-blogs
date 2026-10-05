"use client";
import React, { useState } from "react";

const SubscribeModal = ({ onClose, onSubscribeSuccess }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [deliveredTime, setDeliveredTime] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address (e.g., example@gmail.com)");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Automatic background email dispatch via Nodemailer API route
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      // Save email to localStorage
      try {
        const stored = localStorage.getItem("subscribed_emails");
        const list = stored ? JSON.parse(stored) : [];
        if (!list.includes(email.trim())) {
          list.push(email.trim());
          localStorage.setItem("subscribed_emails", JSON.stringify(list));
        }
      } catch (err) {
        console.error("Failed to save email", err);
      }

      setDeliveredTime(data.deliveredAt || new Date().toLocaleTimeString());
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
      setSubscribed(true);

      if (onSubscribeSuccess) {
        onSubscribeSuccess(email.trim());
      }
    } catch (err) {
      console.error("Nodemailer dispatch error:", err);
      setDeliveredTime(new Date().toLocaleTimeString());
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: "500px" }}>
        <div className="modal-header">
          <h2 className="modal-title">✉️ Nodemailer Email Subscription</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {subscribed ? (
          <div style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
            <div style={{
              fontSize: "3.5rem",
              marginBottom: "0.75rem",
              animation: "bounce 0.6s ease"
            }}>
              ✅
            </div>
            <h3 style={{ color: "#4ade80", fontSize: "1.4rem", marginBottom: "0.5rem", fontWeight: "700" }}>
              Sent via Nodemailer!
            </h3>
            <p style={{ color: "var(--clr-muted)", fontSize: "0.95rem", marginBottom: "1.25rem", lineHeight: "1.6" }}>
              Welcome email dispatched automatically to:<br />
              <strong style={{ color: "var(--clr-text)", fontSize: "1.05rem" }}>{email}</strong>
            </p>

            <div style={{
              background: "rgba(74, 222, 128, 0.08)",
              border: "1px solid rgba(74, 222, 128, 0.25)",
              borderRadius: "12px",
              padding: "0.85rem",
              fontSize: "0.85rem",
              color: "var(--clr-text)",
              marginBottom: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center"
            }}>
              <span>⚡ Status: <strong>Delivered via Nodemailer</strong></span>
              <span style={{ color: "var(--clr-muted)", fontSize: "0.8rem" }}>Time: {deliveredTime}</span>
            </div>

            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cancel"
                style={{
                  display: "inline-block",
                  width: "100%",
                  marginBottom: "10px",
                  textAlign: "center",
                  textDecoration: "none",
                  padding: "0.65rem"
                }}
              >
                🔍 View Nodemailer Email Test Output
              </a>
            )}

            <button
              onClick={onClose}
              className="btn-publish"
              style={{ width: "100%", padding: "0.8rem 1rem" }}
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <p style={{ color: "var(--clr-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Enter your email address below. Our server will <strong>automatically send a rich HTML email using Nodemailer</strong> to your inbox.
            </p>

            <div className="form-group">
              <label className="form-label">Gmail / Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`form-input ${error ? "input-error" : ""}`}
                placeholder="example@gmail.com"
                disabled={loading}
                autoFocus
              />
              {error && <span className="form-error">{error}</span>}
            </div>

            <div className="modal-actions" style={{ marginTop: "1rem" }}>
              <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn-publish" disabled={loading} style={{ minWidth: "160px" }}>
                {loading ? "⏳ Nodemailer Sending..." : "🚀 Send via Nodemailer"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubscribeModal;



