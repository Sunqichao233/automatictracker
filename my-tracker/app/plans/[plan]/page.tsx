import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PlanDashboard } from "@/components/PlanDashboard";
import { planTabs, type PlanKey } from "@/data/plans";

type PlanPageProps = {
  params: Promise<{ plan: string }>;
};

export default async function PlanPage({ params }: PlanPageProps) {
  const { plan } = await params;
  const isValid = planTabs.some((tab) => tab.key === plan);

  if (!isValid) {
    notFound();
  }

  return (
    <AppShell title="计划">
      <PlanDashboard plan={plan as PlanKey} />
    </AppShell>
  );
}
