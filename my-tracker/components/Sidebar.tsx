type SidebarProps = {
  items: string[];
};

export function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="hidden w-[250px] border-r border-[#ececec] bg-[#f7f7f7] lg:block">
      <div className="px-6 pb-8 pt-5">
        <p className="text-3xl font-black tracking-tight">My Tracker</p>
      </div>
      <nav className="space-y-1 px-4">
        {items.map((item, index) => (
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
  );
}
