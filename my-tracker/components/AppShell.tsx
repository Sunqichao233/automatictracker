import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { sidebarItems } from "@/data/navigation";

type AppShellProps = {
  title: string;
  children: ReactNode;
};

export function AppShell({ title, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f3f4f4] text-[#1d2023]">
      <div className="border-t-4 border-t-[#38c7c8]" />
      <div className="flex min-h-[calc(100vh-4px)]">
        <Sidebar items={sidebarItems} />

        <div className="flex flex-1 flex-col">
          <Header title={title} />
          {children}
        </div>
      </div>
    </div>
  );
}
