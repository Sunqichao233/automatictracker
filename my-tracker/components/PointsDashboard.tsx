"use client";

import { useMemo, useState } from "react";
import { formatNumber, pointRecords } from "@/data/points";

export function PointsDashboard() {
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
  );
}
