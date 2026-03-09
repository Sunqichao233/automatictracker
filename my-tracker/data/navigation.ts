export type SidebarItem = {
  label: string;
  href: string;
};

export const sidebarItems: SidebarItem[] = [
  { label: "首页", href: "/" },
  { label: "积分活", href: "/points" },
  { label: "记录", href: "/records" },
  { label: "设置", href: "/settings" },
];
