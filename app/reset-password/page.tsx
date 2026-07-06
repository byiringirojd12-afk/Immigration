"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusType, setStatusType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setToken(params.get("token") || "");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      setStatusType(res.ok ? "success" : "error");
      setMessage(data.message || "Password reset successful");
      if (res.ok) {
        setTimeout(() => router.push("/login"), 1200);
      }
    } catch {
      setStatusType("error");
      setMessage("Unable to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-color)" }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>Reset Password</h1>
        {message && <div style={{ backgroundColor: statusType === "success" ? "var(--success)" : "var(--error)", color: "white", padding: "0.75rem", borderRadius: "var(--radius)", marginBottom: "1rem" }}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="password">New password</label>
            <input id="password" type="password" className="input-field" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }} disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset password"}
          </button>
        </form>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <Link href="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
