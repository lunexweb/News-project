"use client";
import { useMemo, useState } from "react";
import type { NewsArticle } from "@/types";

export interface FilterState {
  q: string;
  team: string;
  from: string;
  to: string;
}

export default function NewsFilters({
  articles,
  onChange,
}: {
  articles: NewsArticle[];
  onChange: (state: FilterState) => void;
}) {
  const [state, setState] = useState<FilterState>({ q: "", team: "", from: "", to: "" });

  const teams = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.teamTags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [articles]);

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    const next = { ...state, [key]: value } as FilterState;
    setState(next);
    onChange(next);
  }

  return (
    <div className="grid md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-black/10 shadow-sm">
      <input
        type="text"
        placeholder="Search news..."
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
        value={state.q}
        onChange={(e) => update("q", e.target.value)}
      />
      <select
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
        value={state.team}
        onChange={(e) => update("team", e.target.value)}
      >
        <option value="">All teams</option>
        {teams.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <input
        type="date"
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
        value={state.from}
        onChange={(e) => update("from", e.target.value)}
      />
      <input
        type="date"
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
        value={state.to}
        onChange={(e) => update("to", e.target.value)}
      />
    </div>
  );
}
