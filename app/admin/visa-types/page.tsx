import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Visa Type Catalog"
      description="Manage visa categories, processing timelines, fees, and the document rules tied to each type."
      features={[
        "Visa category setup",
        "Fee and timeline controls",
        "Document rule pairing",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}