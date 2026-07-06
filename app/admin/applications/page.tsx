import ModuleState from '@/components/ModuleState';

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin operations"
      title="Applications workspace"
      description="This area is ready for visa applications, case review, and status management with a more structured experience for staff."
      features={["Case queue", "Review workflow", "Status updates"]}
      actionLabel="Return to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}