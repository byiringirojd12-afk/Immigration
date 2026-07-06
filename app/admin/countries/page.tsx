import ModuleState from "@/components/ModuleState";

export default function Page() {
  return (
    <ModuleState
      eyebrow="Admin module"
      title="Country Management"
      description="Maintain destination country profiles, visa availability rules, and regional processing details."
      features={[
        "Country profile management",
        "Visa availability controls",
        "Regional requirement mapping",
      ]}
      actionLabel="Back to dashboard"
      actionHref="/admin/dashboard"
    />
  );
}