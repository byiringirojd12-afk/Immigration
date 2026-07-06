import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Applicant module"
      title="Document Center"
      description="Upload supporting files, track upload status, and keep every required document ready for review."
      features={[
        "Document upload workflow",
        "Verification status tracking",
        "File history overview",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/applicant/dashboard"
    />
  );
}