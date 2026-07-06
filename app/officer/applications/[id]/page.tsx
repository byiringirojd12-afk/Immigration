import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Case Review</h1>
          <p style={{ color: "var(--text-secondary)" }}>Case reference: {params.id}</p>
        </div>
        <Link href="/officer/applications" className="btn btn-outline">
          Back to queue
        </Link>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>Review summary</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
          This case is ready for document and eligibility review. Confirm supporting evidence before advancing it.
        </p>
        <div className="status-badge status-review">Pending Review</div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>Officer checklist</h2>
        <ul style={{ paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <li>Validate the submitted passport and identity records.</li>
          <li>Confirm all required supporting documents are present.</li>
          <li>Record the final decision and notify the applicant promptly.</li>
        </ul>
      </div>
    </div>
  );
}