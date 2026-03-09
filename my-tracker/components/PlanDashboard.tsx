"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { planData, PlanKey, planTabs } from "@/data/plans";

type PlanDashboardProps = {
  plan: PlanKey;
};

export function PlanDashboard({ plan }: PlanDashboardProps) {
  const data = planData[plan];
  const [docs, setDocs] = useState<Record<string, { name: string; url: string } | null>>({});

  const currentTab = useMemo(() => planTabs.find((tab) => tab.key === plan), [plan]);

  function onUpload(columnId: string, file: File | null) {
    if (!file) return;

    setDocs((prev) => {
      const prevDoc = prev[columnId];
      if (prevDoc) URL.revokeObjectURL(prevDoc.url);
      return { ...prev, [columnId]: { name: file.name, url: URL.createObjectURL(file) } };
    });
  }

  useEffect(() => {
    return () => {
      Object.values(docs).forEach((doc) => {
        if (doc) URL.revokeObjectURL(doc.url);
      });
    };
  }, [docs]);

  return (
    <main className="space-y-6 px-6 pb-8 lg:px-10">
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4">
        <nav className="flex flex-wrap gap-2">
          {planTabs.map((tab) => (
            <Link
              key={tab.key}
              href={tab.href}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                tab.key === currentTab?.key
                  ? "bg-[#35c8c8] text-white"
                  : "bg-[#f2f4f4] text-slate-700 hover:bg-[#e9eded]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {data.columns.map((column) => {
          const doc = docs[column.id];
          return (
            <article key={column.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{column.title}</h2>
                <div className="flex items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50">
                    上传攻略
                    <input
                      type="file"
                      className="hidden"
                      onChange={(event) => onUpload(column.id, event.target.files?.[0] ?? null)}
                    />
                  </label>
                  <a
                    href={doc?.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-md px-2 py-1 text-xs ${
                      doc
                        ? "bg-[#35c8c8] text-white hover:brightness-95"
                        : "pointer-events-none bg-slate-200 text-slate-500"
                    }`}
                  >
                    查看攻略
                  </a>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">当前文件：{doc ? doc.name : "未上传"}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {column.items.map((item) => (
                <li key={item} className="rounded-lg bg-[#f6f8f8] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          );
        })}
      </section>
    </main>
  );
}
