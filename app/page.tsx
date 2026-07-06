import Link from "next/link";

const highlights = [
  {
    icon: "📄",
    title: "Simple submission",
    text: "Submit your visa request, upload documents, and follow each step from one secure dashboard.",
  },
  {
    icon: "🔒",
    title: "Protected information",
    text: "Your personal data stays encrypted and only accessible through your private account.",
  },
  {
    icon: "⚡",
    title: "Fast updates",
    text: "Receive status alerts and appointment reminders as your case progresses.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ display: "flex", flexDirection: "column" }}>
      <header className="navbar" style={{ padding: "1rem clamp(1rem, 4vw, 3rem)" }}>
        <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--primary)" }}>IMS Portal</div>
        <nav style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/login" className="btn btn-outline">Login</Link>
          <Link href="/register" className="btn btn-primary">Apply Now</Link>
        </nav>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(2rem, 5vw, 4rem) 1rem", textAlign: "center" }}>
        <div style={{ maxWidth: "720px" }}>
          <div className="module-eyebrow">Trusted immigration support</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginBottom: "1rem", fontWeight: 800, lineHeight: 1.15 }}>
            Apply, track, and manage your immigration journey with confidence.
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary)", marginBottom: "1.75rem", lineHeight: 1.7 }}>
            Our portal gives visitors and applicants a clear path to create an account, submit visa requests,
            and receive timely updates without confusion.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn btn-primary" style={{ padding: "0.8rem 1.4rem", fontSize: "1rem" }}>
              Start Visa Application
            </Link>
            <Link href="/login" className="btn btn-outline" style={{ padding: "0.8rem 1.4rem", fontSize: "1rem" }}>
              Track Application
            </Link>
          </div>
        </div>

        <div className="info-grid" style={{ marginTop: "3rem", width: "100%", maxWidth: "1000px", textAlign: "left" }}>
          {highlights.map((item) => (
            <div key={item.title} className="card">
              <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>{item.icon}</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>{item.title}</h3>
              <p style={{ color: "var(--text-secondary)", margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ padding: "1.5rem 1rem", textAlign: "center", borderTop: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Immigration Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
