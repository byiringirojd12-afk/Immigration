import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Payment Oversight"
      description="Review payment statuses, transaction history, and completed fee collections for visa applications."
      features={[
        "Transaction monitoring",
        "Payment status filtering",
        "Revenue summaries",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}