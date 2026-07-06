import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="User Administration"
      description="Manage staff accounts, applicant profiles, access status, and basic account maintenance from one console."
      features={[
        "User account management",
        "Role and status updates",
        "Account review workflow",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}