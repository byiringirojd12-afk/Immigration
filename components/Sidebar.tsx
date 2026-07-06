"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItems } from "@/lib/rbac";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const navItems = getNavItems(role);

  return (
    <aside className="sidebar">
      <div style={{ padding: '0 1.5rem', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
        IMS {role === 'ADMIN' ? 'Admin' : role === 'OFFICER' ? 'Officer' : 'Portal'}
      </div>
      <nav>
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`sidebar-link ${pathname.startsWith(item.href) ? 'active' : ''}`}
          >
            <span style={{ marginRight: '1rem', fontSize: '1.25rem' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
