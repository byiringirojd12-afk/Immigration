import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Officer module"
      title="Officer Reports"
      description="Capture daily outcomes, review queue health, and document trends that affect processing efficiency."
      features={[
        "Daily processing summaries",
        "Queue and workload insights",
        "Operational trend tracking",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/officer/dashboard"
    />
  );
}