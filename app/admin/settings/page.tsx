import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="System Settings"
      description="Adjust platform configuration, notification preferences, and operational limits from one place."
      features={[
        "Platform configuration",
        "Session and upload settings",
        "Feature toggles",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}