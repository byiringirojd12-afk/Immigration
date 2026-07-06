import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Applicant module"
      title="Profile Settings"
      description="Keep personal details, contact information, and passport data current for smooth application processing."
      features={[
        "Personal information review",
        "Contact and address updates",
        "Passport and identity details",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/applicant/dashboard"
    />
  );
}