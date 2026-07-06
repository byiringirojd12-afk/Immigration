"use client";

import { signOut } from "next-auth/react";

export default function Header({ user }: { user: any }) {
  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    html.setAttribute("data-theme", current === "dark" ? "light" : "dark");
  };

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Breadcrumbs or page title could go here */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', border: 'none' }}>
          🌓
        </button>
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: '1.25rem', cursor: 'pointer' }}>🔔</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{user?.email}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user?.role}</div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
