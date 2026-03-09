import { AppShell } from "@/components/AppShell";

export default function SettingsPage() {
  return (
    <AppShell title="设置">
      <main className="px-6 pb-8 lg:px-10">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <h1 className="text-2xl font-bold">设置</h1>
          <p className="mt-2 text-slate-600">这里后续可以配置提醒、默认年份和账户信息。</p>
        </section>
      </main>
    </AppShell>
  );
}
