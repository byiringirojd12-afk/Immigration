import Link from "next/link";

interface ModuleStateProps {
  title: string;
  description: string;
  features: string[];
  eyebrow?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function ModuleState({
  title,
  description,
  features,
  eyebrow = "Module status",
  actionLabel = "Back to dashboard",
  actionHref = "/",
}: ModuleStateProps) {
  return (
    <div className="card module-card">
      <div className="module-eyebrow">{eyebrow}</div>
      <h1 className="module-title">{title}</h1>
      <p className="module-description">{description}</p>

      <div className="feature-list">
        {features.map((feature) => (
          <div key={feature} className="feature-pill">
            ✓ {feature}
          </div>
        ))}
      </div>

      <div className="module-actions">
        <Link href={actionHref} className="btn btn-primary">
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}
