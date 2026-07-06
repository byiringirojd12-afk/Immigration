import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Notification Center"
      description="Send system-wide alerts, application updates, and operational notices to staff and applicants."
      features={[
        "Broadcast announcements",
        "Role-based alerting",
        "Delivery tracking",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}