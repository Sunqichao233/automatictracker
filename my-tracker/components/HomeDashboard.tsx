"use client";

import { useState } from "react";
import { highlights, todayTodos } from "@/data/home";

export function HomeDashboard() {
  const [todos, setTodos] = useState(todayTodos);

  function toggleTodo(id: string) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  return (
    <main className="px-6 pb-8 lg:px-10">
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">推特留言精选</h1>
            <span className="text-xs text-slate-500">可替换为你的精选内容</span>
          </div>
          <div className="space-y-4">
            {highlights.map((item) => (
              <div key={item.id} className="rounded-xl bg-[#f7f8f8] p-4">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold text-slate-800">{item.author}</p>
                  <p className="text-slate-500">{item.handle}</p>
                </div>
                <p className="mt-2 text-base leading-7 text-slate-700">{item.content}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">今天的待办事项</h2>
            <span className="text-xs text-slate-500">
              已完成 {todos.filter((todo) => todo.done).length}/{todos.length}
            </span>
          </div>
          <div className="space-y-3">
            {todos.map((todo) => (
              <label
                key={todo.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#f7f8f8] p-4"
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  className="size-4 accent-[#35c8c8]"
                />
                <span className={`${todo.done ? "text-slate-400 line-through" : "text-slate-800"}`}>
                  {todo.title}
                </span>
              </label>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
