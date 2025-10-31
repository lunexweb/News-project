"use client";
import { useMemo, useState } from "react";
import type { TopScorer } from "@/types";

export default function TopScorers({ scorers }: { scorers: TopScorer[] }) {
  const leagues = useMemo(() => Array.from(new Set(scorers.map((s) => s.league))), [scorers]);
  const [activeLeague, setActiveLeague] = useState<string>(leagues[0] ?? "");
  const [sortBy, setSortBy] = useState<"goals" | "assists">("goals");

  const filtered = useMemo(() => scorers.filter((s) => s.league === activeLeague), [scorers, activeLeague]);
  const sorted = useMemo(() => [...filtered].sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number)), [filtered, sortBy]);

  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2">
          {leagues.map((l) => (
            <button
              key={l}
              onClick={() => setActiveLeague(l)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                activeLeague === l ? "bg-cfn-red text-white border-cfn-red" : "bg-white border-black/10"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setSortBy("goals")}
            className={`px-2 py-1 rounded border ${sortBy === "goals" ? "bg-cfn-red text-white border-cfn-red" : "border-black/10"}`}
          >
            <span className="hidden sm:inline">Goals</span>
            <span className="sm:hidden">G</span>
          </button>
          <button
            onClick={() => setSortBy("assists")}
            className={`px-2 py-1 rounded border ${sortBy === "assists" ? "bg-cfn-red text-white border-cfn-red" : "border-black/10"}`}
          >
            <span className="hidden sm:inline">Assists</span>
            <span className="sm:hidden">A</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="bg-cfn-gray/60">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase w-2/5">Player</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase w-2/5">Team</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase w-12">G</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase w-12">A</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase w-14 hidden sm:table-cell">Matches</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.player} className="border-t">
                <td className="px-3 py-2 text-sm font-semibold whitespace-normal break-words">{p.player}</td>
                <td className="px-3 py-2 text-sm whitespace-normal break-words">{p.team}</td>
                <td className="px-3 py-2 text-sm">{p.goals}</td>
                <td className="px-3 py-2 text-sm">{p.assists}</td>
                <td className="px-3 py-2 text-sm hidden sm:table-cell">{p.matches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
