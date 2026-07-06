import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Applicant module"
      title="Notifications"
      description="Stay updated with application changes, document requests, and appointment updates in one place."
      features={[
        "Unread alert summary",
        "Application and appointment updates",
        "Actionable notifications",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/applicant/dashboard"
    />
  );
}