"use client";

import { useMemo, useState } from "react";

type PointProgram = "PayPay" | "d POINT" | "Ponta" | "Rakuten Point" | "WAON POINT";
type Frequency = "yearly" | "monthly";

type PointRecord = {
  id: string;
  title: string;
  program: PointProgram;
  source: string;
  frequency: Frequency;
  pointsPerGrant: number;
  startYear: number;
  endYear?: number;
  memo?: string;
};

const pointRecords: PointRecord[] = [
  {
    id: "sb-shareholder-paypay",
    title: "SoftBank 股东优待",
    program: "PayPay",
    source: "股东优待",
    frequency: "yearly",
    pointsPerGrant: 1000,
    startYear: 2025,
    memo: "每年发放 1000 PayPay 点数",
  },
  {
    id: "docomo-card-dpoint",
    title: "d卡常规返还",
    program: "d POINT",
    source: "信用卡消费返还",
    frequency: "monthly",
    pointsPerGrant: 800,
    startYear: 2025,
  },
  {
    id: "lawson-ponta",
    title: "Loppi/Ponta 活动",
    program: "Ponta",
    source: "线下活动",
    frequency: "monthly",
    pointsPerGrant: 300,
    startYear: 2026,
  },
  {
    id: "rakuten-market",
    title: "乐天市场 SPU",
    program: "Rakuten Point",
    source: "电商消费返利",
    frequency: "monthly",
    pointsPerGrant: 500,
    startYear: 2025,
  },
  {
    id: "aeon-waon",
    title: "AEON 周末活动",
    program: "WAON POINT",
    source: "商超活动",
    frequency: "yearly",
    pointsPerGrant: 2400,
    startYear: 2026,
  },
];

function annualizedPoints(record: PointRecord): number {
  return record.frequency === "monthly" ? record.pointsPerGrant * 12 : record.pointsPerGrant;
}

function formatNumber(value: number): string {
  return value.toLocaleString("ja-JP");
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [programFilter, setProgramFilter] = useState<"ALL" | PointProgram>("ALL");

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
        const isActive = selectedYear >= record.startYear && selectedYear <= (record.endYear ?? 9999);
        const hitFilter = programFilter === "ALL" ? true : record.program === programFilter;
        return isActive && hitFilter;
      }),
    [programFilter, selectedYear],
  );

  const totalAnnualPoints = useMemo(
    () => activeRecords.reduce((sum, record) => sum + annualizedPoints(record), 0),
    [activeRecords],
  );

  const byProgram = useMemo(() => {
    const grouped = activeRecords.reduce<Record<string, number>>((acc, record) => {
      const key = record.program;
      acc[key] = (acc[key] ?? 0) + annualizedPoints(record);
      return acc;
    }, {});
    return Object.entries(grouped)
      .map(([program, points]) => ({ program, points }))
      .sort((a, b) => b.points - a.points);
  }, [activeRecords]);

  const topProgram = byProgram[0];

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900 sm:px-10">
      <main className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-3xl bg-gradient-to-r from-sky-700 via-cyan-700 to-teal-700 p-8 text-white shadow-lg">
          <p className="text-sm tracking-wide text-cyan-100">Point Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">积分年度仪表盘</h1>
          <p className="mt-3 max-w-2xl text-cyan-100">
            按年度统计 PayPay、d POINT 等积分来源，自动折算全年可得积分并展示类型分布。
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

              <label className="flex items-center gap-2">
                积分类型
                <select
                  value={programFilter}
                  onChange={(event) => setProgramFilter(event.target.value as "ALL" | PointProgram)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none ring-cyan-500 focus:ring-2"
                >
                  <option value="ALL">全部</option>
                  <option value="PayPay">PayPay</option>
                  <option value="d POINT">d POINT</option>
                  <option value="Ponta">Ponta</option>
                  <option value="Rakuten Point">Rakuten Point</option>
                  <option value="WAON POINT">WAON POINT</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">年度总积分</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{formatNumber(totalAnnualPoints)}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">活跃记录数</p>
              <p className="mt-2 text-3xl font-bold text-emerald-600">{activeRecords.length}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">积分类型数</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">{byProgram.length}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">最高占比类型</p>
              <p className="mt-2 text-3xl font-bold text-cyan-700">
                {topProgram ? topProgram.program : "-"}
              </p>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-5">
          <article className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-800">类型分布</h2>
            <div className="mt-5 space-y-4">
              {byProgram.length === 0 ? (
                <p className="text-sm text-slate-500">该年份暂无积分记录。</p>
              ) : (
                byProgram.map((item) => {
                  const ratio = totalAnnualPoints === 0 ? 0 : (item.points / totalAnnualPoints) * 100;
                  return (
                    <div key={item.program} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <p className="font-medium text-slate-800">{item.program}</p>
                        <p className="text-slate-600">
                          {formatNumber(item.points)} 分 ({ratio.toFixed(1)}%)
                        </p>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                          style={{ width: `${ratio}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-3">
            <h2 className="text-xl font-semibold text-slate-800">记录明细（年化）</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="py-3 pr-4 font-medium">记录</th>
                    <th className="py-3 pr-4 font-medium">积分类型</th>
                    <th className="py-3 pr-4 font-medium">来源</th>
                    <th className="py-3 pr-4 font-medium">发放频率</th>
                    <th className="py-3 pr-4 font-medium">每次积分</th>
                    <th className="py-3 pr-4 font-medium">年化积分</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-500">
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
                        <td className="py-4 pr-4">{record.source}</td>
                        <td className="py-4 pr-4">{record.frequency === "monthly" ? "每月" : "每年"}</td>
                        <td className="py-4 pr-4">{formatNumber(record.pointsPerGrant)}</td>
                        <td className="py-4 pr-4 font-semibold text-slate-900">
                          {formatNumber(annualizedPoints(record))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">已录入的积分来源</h2>
          <div className="mt-5 space-y-4">
            {pointRecords.map((record) => (
              <article key={record.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{record.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{record.program}</p>
                  </div>
                  <div className="text-right text-sm text-slate-600">
                    <p>
                      周期：{record.frequency === "monthly" ? "每月" : "每年"} / 每次{" "}
                      {formatNumber(record.pointsPerGrant)} 分
                    </p>
                    <p>
                      生效年份：{record.startYear}
                      {record.endYear ? ` - ${record.endYear}` : " 起"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
