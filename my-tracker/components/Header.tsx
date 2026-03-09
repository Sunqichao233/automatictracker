export function Header() {
  return (
    <header className="flex h-20 items-center justify-between px-6 lg:px-10">
      <p className="text-xl font-black">积分活</p>
      <div className="flex items-center gap-3 text-xl text-slate-600">
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
        >
          导出
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
        >
          用户
        </button>
      </div>
    </header>
  );
}
