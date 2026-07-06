import ModuleState from '@/components/ModuleState';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <ModuleState
      eyebrow="User detail"
      title={`Viewing record ${params.id}`}
      description="This detail screen is structured for profile review, role management, and account actions in a future expansion."
      features={["Identity overview", "Permission checks", "Account history"]}
      actionLabel="Back to users"
      actionHref="/admin/users"
    />
  );
}