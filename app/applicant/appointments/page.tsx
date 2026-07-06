import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Applicant module"
      title="Appointments"
      description="Review interview and biometric appointments, update availability, and keep track of upcoming visits."
      features={[
        "Upcoming appointment list",
        "Status and location details",
        "Appointment reminders",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/applicant/dashboard"
    />
  );
}