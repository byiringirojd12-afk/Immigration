"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ApplicationData {
  id: string;
  status: string;
  purpose: string | null;
  createdAt: string;
  submittedAt: string | null;
  visaType: { name: string };
  destinationCountry: { name: string; flagEmoji: string };
  documents: Array<{ id: string; fileName: string; status: string }>;
  payments: Array<{ id: string; status: string; amount: number }>;
  appointments: Array<{ id: string; type: string; status: string }>;
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadApplication = async () => {
      const response = await fetch(`/api/applications/${params.id}`);
      if (response.ok) {
        setApplication(await response.json());
      }
    };

    if (params.id) {
      loadApplication();
    }
  }, [params.id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setMessage(null);
    const response = await fetch(`/api/applications/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "submit" }),
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setMessage(payload.error || "Unable to submit the application right now.");
      setSubmitting(false);
      return;
    }

    setApplication(payload);
    setMessage("Application submitted successfully.");
    setSubmitting(false);
  };

  if (!application) {
    return <div className="card">Loading application details...</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.35rem" }}>Application Details</h1>
          <p style={{ color: "var(--text-secondary)" }}>Reference: {application.id}</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting || application.status === "SUBMITTED"}>
            {submitting ? "Submitting..." : application.status === "SUBMITTED" ? "Submitted" : "Submit for review"}
          </button>
          <Link href="/applicant/applications" className="btn btn-outline">
            Back to applications
          </Link>
        </div>
      </div>

      {message ? <div className="status-badge status-approved" style={{ marginBottom: "1rem", width: "fit-content" }}>{message}</div> : null}

      <div className="card" style={{ marginBottom: "1rem", boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>Overview</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
          <div><strong>Visa type:</strong> {application.visaType.name}</div>
          <div><strong>Destination:</strong> {application.destinationCountry.flagEmoji} {application.destinationCountry.name}</div>
          <div><strong>Status:</strong> {application.status}</div>
          <div><strong>Purpose:</strong> {application.purpose || "—"}</div>
          <div><strong>Created:</strong> {new Date(application.createdAt).toLocaleDateString()}</div>
          <div><strong>Submitted:</strong> {application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : "Not submitted yet"}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>What happens next</h2>
        <ul style={{ paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <li>Upload the required documents for this application.</li>
          <li>Track appointment scheduling and payment status here.</li>
          <li>Submit the application once all required information is ready.</li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>Documents & updates</h2>
        <p style={{ color: "var(--text-secondary)" }}>
          {application.documents.length} document(s) attached • {application.payments.length} payment record(s) • {application.appointments.length} appointment(s)
        </p>
      </div>
    </div>
  );
}