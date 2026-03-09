"use client";

import { useMemo, useState } from "react";

type PointProgram = "PayPay" | "d POINT";

type PointRecord = {
  id: string;
  title: string;
  program: PointProgram;
  rule: string;
  yearlyFixedPoints: number;
  pointsDisplay?: string;
  claimed: boolean;
  startYear: number;
  endYear?: number;
  memo?: string;
};

const sidebarItems = ["菜单 A", "菜单 B", "菜单 C", "菜单 D"];
const headerItems = ["导航 1", "导航 2", "导航 3", "导航 4"];

const pointRecords: PointRecord[] = [
  {
    id: "sb-shareholder-paypay",
    title: "SoftBank 股东优待",
    program: "PayPay",
    rule: "满足股东优待条件后每年发放",
    yearlyFixedPoints: 1000,
    claimed: false,
    startYear: 2025,
    memo: "每年发放 1000 PayPay 点数",
  },
  {
    id: "ntt-shareholder-dpoint",
    title: "NTT 株主优待",
    program: "d POINT",
    rule: "持有 2-5 年：1500 d POINT；持有 5 年以上：3000 d POINT",
    yearlyFixedPoints: 1500,
    pointsDisplay: "2-5年 1,500 / 5年以上 3,000",
    claimed: false,
    startYear: 2025,
    memo: "当前按 2-5 年档（1500）计入年度统计",
  },
];

function formatNumber(value: number): string {
  return value.toLocaleString("ja-JP");
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const availableYears = useMemo(() => {
    const allYears = pointRecords.flatMap((record) => {
      const end = record.endYear ?? 2028;
      return Array.from({ length: end - record.startYear + 1 }, (_, idx) => record.startYear + idx);
    });
    return Array.from(new Set(allYears)).sort((a, b) => a - b);
  }, []);

  const activeRecords = useMemo(
    () =>
      pointRecords.filter(
        (record) => selectedYear >= record.startYear && selectedYear <= (record.endYear ?? 9999),
      ),
    [selectedYear],
  );

  const totalAnnualPoints = useMemo(
    () =>
      activeRecords.reduce(
        (sum, record) => (record.claimed ? sum + record.yearlyFixedPoints : sum),
        0,
      ),
    [activeRecords],
  );

  return (
    <div className="min-h-screen bg-[#f3f4f4] text-[#1d2023]">
      <div className="border-t-4 border-t-[#38c7c8]" />
      <div className="flex min-h-[calc(100vh-4px)]">
        <aside className="hidden w-[250px] border-r border-[#ececec] bg-[#f7f7f7] lg:block">
          <div className="px-6 pb-8 pt-5">
            <p className="text-3xl font-black tracking-tight">My Tracker</p>
          </div>
          <nav className="space-y-1 px-4">
            {sidebarItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`block rounded-lg px-3 py-2 text-xl font-semibold ${
                  index === 0 ? "text-[#35c8c8]" : "text-[#2d3135] hover:bg-[#efefef]"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex h-20 items-center justify-between px-6 lg:px-10">
            <p className="text-xl font-black lg:hidden">My Tracker</p>
            <nav className="mx-auto hidden items-center gap-10 lg:flex">
              {headerItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`pb-2 text-xl font-bold ${
                    index === 0
                      ? "border-b-2 border-b-[#35c8c8] text-[#23272b]"
                      : "text-[#23272b] hover:text-black"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="text-xl">☰</div>
          </header>

          <main className="space-y-6 px-6 pb-8 lg:px-10">
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">积分统计</h1>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  年份
                  <select
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(Number(event.target.value))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year} 年
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <article className="rounded-xl bg-[#f7f8f8] p-4">
                  <p className="text-sm text-slate-500">年度总积分（已领取）</p>
                  <p className="mt-2 text-3xl font-black">{formatNumber(totalAnnualPoints)}</p>
                </article>
                <article className="rounded-xl bg-[#f7f8f8] p-4">
                  <p className="text-sm text-slate-500">记录数</p>
                  <p className="mt-2 text-3xl font-black">{activeRecords.length}</p>
                </article>
                <article className="rounded-xl bg-[#f7f8f8] p-4">
                  <p className="text-sm text-slate-500">未领取记录</p>
                  <p className="mt-2 text-3xl font-black">
                    {activeRecords.filter((record) => !record.claimed).length}
                  </p>
                </article>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
              <h2 className="text-xl font-semibold">记录明细（每年固定积分）</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="py-3 pr-4 font-medium">记录</th>
                      <th className="py-3 pr-4 font-medium">积分类型</th>
                      <th className="py-3 pr-4 font-medium">规则</th>
                      <th className="py-3 pr-4 font-medium">每年固定积分</th>
                      <th className="py-3 pr-4 font-medium">计入统计</th>
                      <th className="py-3 pr-4 font-medium">是否领取</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRecords.map((record) => (
                      <tr key={record.id} className="border-b border-slate-100 align-top">
                        <td className="py-4 pr-4">
                          <p className="font-medium text-slate-800">{record.title}</p>
                          {record.memo ? <p className="mt-1 text-xs text-slate-500">{record.memo}</p> : null}
                        </td>
                        <td className="py-4 pr-4">{record.program}</td>
                        <td className="py-4 pr-4">{record.rule}</td>
                        <td className="py-4 pr-4">{record.pointsDisplay ?? formatNumber(record.yearlyFixedPoints)}</td>
                        <td className="py-4 pr-4 font-semibold text-slate-900">
                          {record.claimed ? formatNumber(record.yearlyFixedPoints) : "0"}
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              record.claimed
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {record.claimed ? "已领取" : "未领取"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
