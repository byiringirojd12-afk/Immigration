import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function OfficerDashboard() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;

  const officer = await prisma.officer.findUnique({
    where: { userId }
  });

  const pendingApps = await prisma.visaApplication.count({
    where: { status: { in: ['SUBMITTED', 'UNDER_REVIEW', 'DOCUMENTS_REQUESTED'] } }
  });

  const myAssignedApps = officer ? await prisma.visaApplication.count({
    where: { assignedOfficerId: officer.id }
  }) : 0;

  const upcomingInterviews = officer ? await prisma.appointment.count({
    where: { officerId: officer.id, status: 'SCHEDULED', type: 'INTERVIEW' }
  }) : 0;

  const applicationsQueue = await prisma.visaApplication.findMany({
    where: { status: { in: ['SUBMITTED', 'UNDER_REVIEW'] } },
    include: { applicant: true, visaType: true, destinationCountry: true },
    orderBy: { submittedAt: 'asc' },
    take: 10
  });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Officer Dashboard
      </h1>

      <div className="grid grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Global Pending</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>
            {pendingApps}
          </div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>My Assigned Cases</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            {myAssignedApps}
          </div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Upcoming Interviews</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--info)' }}>
            {upcomingInterviews}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '3rem 0 1.5rem 0' }}>Applications Queue (Oldest First)</h2>
      
      {applicationsQueue.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>There are no applications pending review.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Applicant</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Destination</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Visa Type</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Submitted</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicationsQueue.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {app.applicant.firstName} {app.applicant.lastName}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {app.destinationCountry.flagEmoji} {app.destinationCountry.name}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>{app.visaType.name}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`status-badge status-${app.status.toLowerCase().replace('_', '-')}`}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <a href={`/officer/applications/${app.id}`} className="btn btn-primary" style={{ padding: '0.25rem 0.75rem' }}>Review</a>
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
