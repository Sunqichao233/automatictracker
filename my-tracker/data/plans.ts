export type PlanKey = "month" | "year" | "future";

type PlanData = {
  title: string;
  columns: { id: string; title: string; items: string[] }[];
};

export const planTabs: { key: PlanKey; label: string; href: string }[] = [
  { key: "month", label: "月计划", href: "/plans/month" },
  { key: "year", label: "年计划", href: "/plans/year" },
  { key: "future", label: "未来计划", href: "/plans/future" },
];

export const planData: Record<PlanKey, PlanData> = {
  month: {
    title: "月计划 Dashboard",
    columns: [
      {
        id: "month-focus",
        title: "本月重点任务",
        items: ["完成积分领取流程复盘", "更新网站计划页面交互", "整理推特留言归档规则"],
      },
      {
        id: "month-review",
        title: "本月复盘检查",
        items: ["每周五更新进度", "检查未领取原因", "记录优化点并形成下月模板"],
      },
      {
        id: "month-dependency",
        title: "协同与依赖",
        items: ["确认数据来源账号权限", "对接提醒机制", "准备月末总结素材"],
      },
    ],
  },
  year: {
    title: "年计划 Dashboard",
    columns: [
      {
        id: "year-milestone",
        title: "年度里程碑",
        items: ["Q1 完成数据结构标准化", "Q2 上线自动提醒", "Q3 打通导出报告", "Q4 年度复盘与迭代"],
      },
      {
        id: "year-skill",
        title: "关键能力建设",
        items: ["计划拆解机制", "规则引擎可配置化", "数据看板稳定性提升"],
      },
      {
        id: "year-risk",
        title: "风险清单",
        items: ["规则变动导致失效", "执行节奏中断", "数据记录不完整"],
      },
    ],
  },
  future: {
    title: "未来计划 Dashboard",
    columns: [
      {
        id: "future-project",
        title: "未来项目池",
        items: ["多平台积分规则采集", "跨年策略推荐", "个人知识库联动"],
      },
      {
        id: "future-resource",
        title: "资源规划",
        items: ["时间预算按季度分配", "学习预算按主题配置", "长期合作资源储备"],
      },
      {
        id: "future-exit",
        title: "退出与转向条件",
        items: ["收益不达标连续两个季度", "维护成本高于收益阈值", "出现更高价值方向"],
      },
    ],
  },
};
