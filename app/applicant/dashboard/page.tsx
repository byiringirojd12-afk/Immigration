import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ApplicantDashboard() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;

  // Fetch applicant data
  const applicant = await prisma.applicant.findUnique({
    where: { userId },
    include: {
      applications: {
        include: { visaType: true, destinationCountry: true },
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  });

  if (!applicant) return <div>Applicant profile not found.</div>;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Welcome back, {applicant.firstName || session?.user?.email}!
      </h1>

      <div className="grid grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Applications</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            {applicant.applications.length}
          </div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Pending Review</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>
            {applicant.applications.filter(a => ['SUBMITTED', 'UNDER_REVIEW'].includes(a.status)).length}
          </div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Action Required</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--error)' }}>
            {applicant.applications.filter(a => ['DOCUMENTS_REQUESTED', 'INTERVIEW_SCHEDULED'].includes(a.status)).length}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '3rem 0 1.5rem 0' }}>Recent Applications</h2>
      
      {applicant.applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>You haven&apos;t submitted any visa applications yet.</p>
          <a href="/applicant/applications/new" className="btn btn-primary">Start New Application</a>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Destination</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Visa Type</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicant.applications.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>{app.id.substring(0, 8)}...</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {app.destinationCountry.flagEmoji} {app.destinationCountry.name}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>{app.visaType.name}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`status-badge status-${app.status.toLowerCase().replace('_', '-')}`}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <a href={`/applicant/applications/${app.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
