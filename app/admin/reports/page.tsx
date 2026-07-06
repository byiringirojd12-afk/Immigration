import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Operational Reports"
      description="Generate processing summaries, staffing insights, and trend reports for leadership and compliance review."
      features={[
        "Processing performance metrics",
        "Export-ready reports",
        "Compliance and staffing summaries",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}