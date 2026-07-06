import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Role Management"
      description="Assign permissions and role-based access to keep operations secure and aligned with team responsibilities."
      features={[
        "Role-based access control",
        "Permission assignment",
        "Security reviews",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}