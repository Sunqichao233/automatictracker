import { AppShell } from "@/components/AppShell";
import { HomeDashboard } from "@/components/HomeDashboard";

export default function Home() {
  return (
    <AppShell title="首页">
      <HomeDashboard />
    </AppShell>
  );
}
