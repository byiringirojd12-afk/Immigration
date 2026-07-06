import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Appointment Scheduling"
      description="Coordinate interviews, biometrics, and document pickup windows with applicants and officers."
      features={[
        "Calendar-based scheduling",
        "Officer assignment workflow",
        "Status updates and reminders",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}