"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CountryOption {
  id: string;
  name: string;
  flagEmoji: string;
}

interface VisaTypeOption {
  id: string;
  name: string;
  description: string | null;
}

export default function Page() {
  const router = useRouter();
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [visaTypes, setVisaTypes] = useState<VisaTypeOption[]>([]);
  const [form, setForm] = useState({
    visaTypeId: "",
    destinationCountryId: "",
    countryOfResidenceId: "",
    travelDate: "",
    returnDate: "",
    purpose: "",
    additionalNotes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      const [countryResponse, visaResponse] = await Promise.all([
        fetch("/api/countries"),
        fetch("/api/visa-types"),
      ]);

      if (countryResponse.ok) setCountries(await countryResponse.json());
      if (visaResponse.ok) setVisaTypes(await visaResponse.json());
    };

    loadOptions();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setMessage(payload.error || "We could not create the application right now.");
      setSubmitting(false);
      return;
    }

    router.push("/applicant/applications");
  };

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.35rem" }}>Start a New Application</h1>
        <p style={{ color: "var(--text-secondary)" }}>Create a visa request and save it as a draft for review.</p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ display: "grid", gap: "1rem", boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>Visa type</label>
          <select
            required
            value={form.visaTypeId}
            onChange={(event) => setForm({ ...form, visaTypeId: event.target.value })}
            style={{ width: "100%", padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}
          >
            <option value="">Select a visa type</option>
            {visaTypes.map((visaType) => (
              <option key={visaType.id} value={visaType.id}>{visaType.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>Country you currently live in</label>
            <select
              value={form.countryOfResidenceId}
              onChange={(event) => setForm({ ...form, countryOfResidenceId: event.target.value })}
              style={{ width: "100%", padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}
            >
              <option value="">Select your current country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.flagEmoji} {country.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>Country you want to travel to</label>
            <select
              required
              value={form.destinationCountryId}
              onChange={(event) => setForm({ ...form, destinationCountryId: event.target.value })}
              style={{ width: "100%", padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.flagEmoji} {country.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>Travel date</label>
            <input
              type="date"
              value={form.travelDate}
              onChange={(event) => setForm({ ...form, travelDate: event.target.value })}
              style={{ width: "100%", padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>Return date</label>
            <input
              type="date"
              value={form.returnDate}
              onChange={(event) => setForm({ ...form, returnDate: event.target.value })}
              style={{ width: "100%", padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>Purpose of travel</label>
          <textarea
            required
            rows={4}
            value={form.purpose}
            onChange={(event) => setForm({ ...form, purpose: event.target.value })}
            placeholder="Explain why you are applying for this visa"
            style={{ width: "100%", padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>Additional notes</label>
          <textarea
            rows={3}
            value={form.additionalNotes}
            onChange={(event) => setForm({ ...form, additionalNotes: event.target.value })}
            placeholder="Share any additional context"
            style={{ width: "100%", padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}
          />
        </div>

        {message ? <div className="status-badge status-rejected" style={{ width: "fit-content" }}>{message}</div> : null}

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Creating..." : "Create application"}
          </button>
          <a href="/applicant/applications" className="btn btn-outline">Cancel</a>
        </div>
      </form>
    </div>
  );
}