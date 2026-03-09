export type PointProgram = "PayPay" | "d POINT";

export type PointRecord = {
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

export const pointRecords: PointRecord[] = [
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

export function formatNumber(value: number): string {
  return value.toLocaleString("ja-JP");
}
