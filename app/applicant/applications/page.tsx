"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ApplicationRecord {
  id: string;
  status: string;
  createdAt: string;
  purpose: string | null;
  visaType: { name: string };
  destinationCountry: { name: string; flagEmoji: string };
}

export default function Page() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      const response = await fetch("/api/applications");
      if (response.ok) {
        setApplications(await response.json());
      }
      setLoading(false);
    };

    loadApplications();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.35rem" }}>My Applications</h1>
          <p style={{ color: "var(--text-secondary)" }}>Track drafts, submissions, and progress in one place.</p>
        </div>
        <Link href="/applicant/applications/new" className="btn btn-primary">
          Start New Application
        </Link>
      </div>

      {loading ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem 1rem" }}>Loading your applications...</div>
      ) : applications.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No applications yet</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>Start your first visa request and we’ll guide you through the next steps.</p>
          <Link href="/applicant/applications/new" className="btn btn-primary">
            Create application
          </Link>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "var(--bg-color)", borderBottom: "1px solid var(--border-color)" }}>
              <tr>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 500 }}>Destination</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 500 }}>Visa type</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 500 }}>Purpose</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 500 }}>Status</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 500 }}>Created</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 500 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    {application.destinationCountry.flagEmoji} {application.destinationCountry.name}
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>{application.visaType.name}</td>
                  <td style={{ padding: "1rem 1.5rem" }}>{application.purpose || "—"}</td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span className={`status-badge status-${application.status.toLowerCase().replace("_", "-")}`}>
                      {application.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>{new Date(application.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <Link href={`/applicant/applications/${application.id}`} className="btn btn-outline" style={{ padding: "0.25rem 0.75rem" }}>
                      View
                    </Link>
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