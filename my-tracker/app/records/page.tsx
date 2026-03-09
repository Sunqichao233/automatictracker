import { AppShell } from "@/components/AppShell";

export default function RecordsPage() {
  return (
    <AppShell title="记录">
      <main className="px-6 pb-8 lg:px-10">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <h1 className="text-2xl font-bold">记录</h1>
          <p className="mt-2 text-slate-600">这里后续可以放你的积分领取记录和日志。</p>
        </section>
      </main>
    </AppShell>
  );
}
