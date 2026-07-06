import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Audit Trail"
      description="Track user actions, role changes, document reviews, and system updates with a searchable activity history."
      features={[
        "Action-by-action logging",
        "User and role attribution",
        "Export-ready review history",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}