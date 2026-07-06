import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Officer module"
      title="Appointment Management"
      description="Coordinate interviews, monitor attendance, and keep appointment outcomes organized for better follow-up."
      features={[
        "Scheduled visit tracking",
        "Attendance outcomes",
        "Follow-up reminders",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/officer/dashboard"
    />
  );
}