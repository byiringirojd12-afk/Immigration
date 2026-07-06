import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Fetch admin stats
  const totalUsers = await prisma.user.count();
  const totalApps = await prisma.visaApplication.count();
  const totalCountries = await prisma.country.count();
  const totalPayments = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: 'COMPLETED' }
  });

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, email: true, role: true, createdAt: true, isActive: true }
  });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        System Administration
      </h1>

      <div className="grid grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Users</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            {totalUsers}
          </div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Applications</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--info)' }}>
            {totalApps}
          </div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Countries DB</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>
            {totalCountries}
          </div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Revenue</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>
            ${totalPayments._sum.amount || 0}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '3rem 0 1.5rem 0' }}>Recent Signups</h2>
      
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Email</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Role</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Joined</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>{user.email}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`status-badge ${user.role === 'ADMIN' ? 'status-rejected' : user.role === 'OFFICER' ? 'status-review' : 'status-submitted'}`}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`status-badge ${user.isActive ? 'status-approved' : 'status-draft'}`}>
                    {user.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <a href={`/admin/users/${user.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
