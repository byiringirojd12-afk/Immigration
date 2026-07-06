"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "If an account exists, a reset link has been sent");
    } catch {
      setMessage("Unable to process password reset request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-color)" }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>Forgot Password</h1>
        <p style={{ marginBottom: "1rem", textAlign: "center" }}>Enter your email and we will help you reset it.</p>
        {message && <div style={{ backgroundColor: "var(--success)", color: "white", padding: "0.75rem", borderRadius: "var(--radius)", marginBottom: "1rem" }}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input id="email" type="email" className="input-field" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset link"}
          </button>
        </form>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <Link href="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
