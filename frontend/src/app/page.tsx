"use client";

import { useEffect, useMemo, useState } from "react";
import type { Todo, TodoStatus } from "./../lib/api";
import { createTodo, deleteTodo, fetchTodos, markDone } from "./../lib/api";

const STATUSES: Array<{ label: string; value: TodoStatus | "ALL"; }> = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

export default function HomePage() {
  const [status, setStatus] = useState<TodoStatus | "ALL">("ALL");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const statusFilter = useMemo(
    () => (status === "ALL" ? undefined : status),
    [status],
  );

  async function load() {
    setLoading(true);
    try {
      const data = await fetchTodos(statusFilter);
      setTodos(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    await createTodo({ title: t, description: description.trim() || undefined });
    setTitle("");
    setDescription("");
    await load();
  }

  async function onMarkDone(id: string) {
    await markDone(id);
    await load();
  }

  async function onDelete(id: string) {
    await deleteTodo(id);
    await load();
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.85)] backdrop-blur-lg md:gap-10 md:p-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Todo dashboard
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
              Ship your tasks, not your stress.
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Nest.js + MySQL backend, Next.js frontend. Filter, capture, and close the loop on your work.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 md:px-4 md:py-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Status filter
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setStatus(s.value as TodoStatus | "ALL")}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ${
                    status === s.value
                      ? "border-sky-400 bg-sky-500/20 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]"
                      : "border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.2fr)] md:items-start">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm md:p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                New todo
              </h2>
              <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                {todos.length} total
              </span>
            </div>

            <form className="mt-1 space-y-3" onSubmit={onCreate}>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Title<span className="text-rose-400"> *</span>
                </label>
                <input
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-400 focus:bg-slate-900 focus:ring-2 focus:ring-sky-500/40"
                  placeholder="Define the outcome, not the activity."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Description<span className="text-slate-500"> · optional</span>
                </label>
                <textarea
                  className="min-h-[80px] w-full resize-y rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-400 focus:bg-slate-900 focus:ring-2 focus:ring-sky-500/40"
                  placeholder="Add context, links, or checklists."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-slate-500">
                  Press <span className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-200">Enter</span>{" "}
                  to capture. Keep tasks atomic.
                </p>
                <button
                  className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-medium text-slate-950 shadow-[0_14px_30px_rgba(56,189,248,0.45)] transition hover:bg-sky-400 hover:shadow-[0_18px_45px_rgba(56,189,248,0.65)] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
                  type="submit"
                  disabled={!title.trim()}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                  Add todo
                </button>
              </div>
            </form>
          </div>

          <section className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm md:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Pipeline
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {status === "ALL" ? "Showing every task." : `Filtered by "${status.toLowerCase().replace("_", " ")}".`}
                </p>
              </div>
              {loading && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-300">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-sky-400" />
                  Loading
                </span>
              )}
            </div>

            <ul className="mt-1 flex max-h-[420px] flex-col gap-3 overflow-y-auto pr-1 text-sm">
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-3.5 shadow-sm transition hover:border-sky-500/60 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="line-clamp-1 font-medium text-slate-50">
                          {t.title}
                        </div>
                      </div>

                      {t.description && (
                        <div className="line-clamp-2 text-xs text-slate-400">
                          {t.description}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] ${
                            t.status === "DONE"
                              ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40"
                              : t.status === "IN_PROGRESS"
                                ? "bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/40"
                                : "bg-slate-700/40 text-slate-200 ring-1 ring-slate-500/40"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              t.status === "DONE"
                                ? "bg-emerald-400"
                                : t.status === "IN_PROGRESS"
                                  ? "bg-amber-300"
                                  : "bg-slate-300"
                            }`}
                          />
                          {t.status.replace("_", " ")}
                        </span>

                        <span className="text-[10px] text-slate-500">
                          Created {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <button
                        className="inline-flex items-center justify-center rounded-full border border-emerald-500/70 bg-emerald-500/15 px-3 py-1.5 text-[11px] font-medium text-emerald-100 transition hover:bg-emerald-400/30 disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-400"
                        onClick={() => onMarkDone(t.id)}
                        disabled={t.status === "DONE"}
                      >
                        Done
                      </button>
                      <button
                        className="inline-flex items-center justify-center rounded-full border border-rose-500/60 bg-rose-500/10 px-3 py-1.5 text-[11px] font-medium text-rose-100 opacity-70 transition hover:bg-rose-500/25 hover:opacity-100"
                        onClick={() => onDelete(t.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              {!loading && todos.length === 0 && (
                <li className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/60 px-6 py-8 text-center text-xs text-slate-400">
                  <p className="mb-1.5 font-medium text-slate-300">
                    No todos in this view yet.
                  </p>
                  <p className="max-w-xs text-[11px] text-slate-500">
                    Capture the next thing on your mind, or change the filter to see other stages of your work.
                  </p>
                </li>
              )}
            </ul>
          </section>
        </section>
      </div>
    </main>
  );
}
