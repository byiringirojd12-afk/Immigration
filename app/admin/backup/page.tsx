import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Backup & Recovery"
      description="Protect the system with scheduled backup jobs, restore checkpoints, and recovery readiness reports."
      features={[
        "Scheduled database backups",
        "Restore point history",
        "Disaster recovery readiness",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}