"use client";

import { useMemo, useState } from "react";

type PointProgram = "PayPay" | "d POINT" | "Ponta" | "Rakuten Point" | "WAON POINT";

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
      pointRecords.filter((record) => {
        return selectedYear >= record.startYear && selectedYear <= (record.endYear ?? 9999);
      }),
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

  const onlyRecord = activeRecords[0];

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900 sm:px-10">
      <main className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-3xl bg-gradient-to-r from-sky-700 via-cyan-700 to-teal-700 p-8 text-white shadow-lg">
          <p className="text-sm tracking-wide text-cyan-100">Point Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">积分年度仪表盘</h1>
          <p className="mt-3 max-w-2xl text-cyan-100">
            按年度统计 PayPay、d POINT 等积分规则，自动折算全年可得积分。
          </p>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
            <h2 className="text-xl font-semibold text-slate-800">筛选</h2>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2">
                年份
                <select
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(Number(event.target.value))}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none ring-cyan-500 focus:ring-2"
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year} 年
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">年度总积分</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{formatNumber(totalAnnualPoints)}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">活跃记录数</p>
              <p className="mt-2 text-3xl font-bold text-emerald-600">{activeRecords.length}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">积分类型</p>
              <p className="mt-2 text-3xl font-bold text-cyan-700">
                {onlyRecord ? onlyRecord.program : "-"}
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">记录明细（每年固定积分）</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
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
                  {activeRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-slate-500">
                        该筛选条件下没有记录
                      </td>
                    </tr>
                  ) : (
                    activeRecords.map((record) => (
                      <tr key={record.id} className="border-b border-slate-100 align-top">
                        <td className="py-4 pr-4">
                          <p className="font-medium text-slate-800">{record.title}</p>
                          {record.memo ? <p className="mt-1 text-xs text-slate-500">{record.memo}</p> : null}
                        </td>
                        <td className="py-4 pr-4">{record.program}</td>
                        <td className="py-4 pr-4">{record.rule}</td>
                        <td className="py-4 pr-4">
                          {record.pointsDisplay ?? formatNumber(record.yearlyFixedPoints)}
                        </td>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
        </section>
      </main>
    </div>
  );
}
