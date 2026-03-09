"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarItem } from "@/data/navigation";

type SidebarProps = {
  items: SidebarItem[];
};

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[250px] border-r border-[#ececec] bg-[#f7f7f7] lg:block">
      <div className="px-6 pb-8 pt-5">
        <p className="text-3xl font-black tracking-tight">My Tracker</p>
      </div>
      <nav className="space-y-1 px-4">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-xl font-semibold ${
                active ? "text-[#35c8c8]" : "text-[#2d3135] hover:bg-[#efefef]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
