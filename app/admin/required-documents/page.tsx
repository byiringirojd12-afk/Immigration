import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Required Documents"
      description="Define mandatory evidence for each visa type and keep requirements aligned with policy updates."
      features={[
        "Visa-specific document rules",
        "Mandatory vs optional checks",
        "Policy alignment workflows",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}