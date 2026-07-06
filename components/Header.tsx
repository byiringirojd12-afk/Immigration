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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Immigration Portal</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', border: 'none' }}>
          🌓
        </button>
        <div style={{ fontSize: '1rem', cursor: 'pointer' }}>🔔</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <div style={{ textAlign: 'right', minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{user?.email}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user?.role}</div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="btn btn-outline" style={{ padding: '0.25rem 0.7rem' }}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
