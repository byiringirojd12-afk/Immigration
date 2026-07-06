"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItems } from "@/lib/rbac";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const navItems = getNavItems(role);

  return (
    <aside className="sidebar">
      <div style={{ padding: '0 1.5rem', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
        IMS {role === 'ADMIN' ? 'Admin' : role === 'OFFICER' ? 'Officer' : 'Portal'}
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`sidebar-link ${pathname.startsWith(item.href) ? 'active' : ''}`}
          >
            <span style={{ marginRight: '0.9rem', fontSize: '1.1rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
