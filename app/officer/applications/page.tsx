import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Officer module"
      title="Application Review"
      description="Review applicant case files, track document compliance, and advance pending applications through each stage."
      features={[
        "Case queue overview",
        "Document review workflow",
        "Decision tracking",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/officer/dashboard"
    />
  );
}