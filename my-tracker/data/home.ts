export type Highlight = {
  id: string;
  author: string;
  handle: string;
  content: string;
};

export type TodoItem = {
  id: string;
  title: string;
  done: boolean;
};

export const highlights: Highlight[] = [
  {
    id: "h1",
    author: "硅谷王川 Chuan",
    handle: "@Svwang1",
    content: `更多人应当关心“慢变量”这个概念。这个概念和“强制函数”有相关之处。

它的核心理念是，你只要按照正确的框架做事，定期有真实稳固但非常微小的进步（所以称为慢变量），积累足够长时间，自然会产生质的飞跃。

“慢变量”最不讨喜的地方是缺乏即时反馈，无法产生立竿见影的绩效，所以很难被大众实践，也很难被周围的人认同。

但正是因为很难被大众实践，大家都想去找立竿见影的捷径，所以专注实践“慢变量”积累的人在其专注的路线上反而很长时间没有竞争，日常看似很枯燥和孤独，但其实压力很小，比较放松，直到有一天突破临界点，对潜在竞争者形成碾压优势。

而专注“快变量”的人每天都有各种刺激的反馈，看似很热闹，但其实竞争非常激烈，树敌甚多，基础松垮。最后往往是大家一起热闹的折腾了大半天，筋疲力竭，多败俱伤的结局。然后回到原点继续追求下一个快变量。`,
  },
];

export const todayTodos: TodoItem[] = [
  { id: "t1", title: "确认 SoftBank 股东优待领取状态", done: false },
  { id: "t2", title: "核对 NTT 持有年限档位（2-5年/5年以上）", done: false },
  { id: "t3", title: "补录本月到账的 d POINT", done: true },
  { id: "t4", title: "更新积分活页面说明文案", done: false },
];
