"use client";
import { useMemo, useState } from "react";
import type { Fixture } from "@/types";
import { formatDate } from "@/utils/date";

export default function FixturesList({ fixtures }: { fixtures: Fixture[] }) {
  const leagues = useMemo(() => Array.from(new Set(fixtures.map((f) => f.league))), [fixtures]);
  const [league, setLeague] = useState<string>(leagues[0] ?? "");
  const [status, setStatus] = useState<Fixture["status"] | "all">("all");

  const filtered = useMemo(() => {
    return fixtures.filter((f) => (league ? f.league === league : true) && (status === "all" ? true : f.status === status));
  }, [fixtures, league, status]);

  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-4">
      <div className="flex flex-wrap gap-2 items-center justify-between mb-3">
        <div className="flex gap-2">
          {leagues.map((l) => (
            <button
              key={l}
              onClick={() => setLeague(l)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                league === l ? "bg-cfn-red text-white border-cfn-red" : "bg-white border-black/10"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-2 text-sm">
          {(["all", "upcoming", "live", "finished"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-2 py-1 rounded border capitalize ${status === s ? "bg-cfn-red text-white border-cfn-red" : "border-black/10"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <ul className="divide-y">
        {filtered.map((f) => (
          <li key={f.id} className="py-3 flex items-center justify-between text-sm">
            <div>
              <span className="font-semibold">{f.home}</span>
              <span className="mx-2">vs</span>
              <span className="font-semibold">{f.away}</span>
              <span className="ml-3 text-gray-500">{formatDate(f.date)}</span>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2 py-0.5 rounded text-xs mr-3 capitalize ${
                f.status === "finished" ? "bg-gray-200" : f.status === "live" ? "bg-green-200" : "bg-yellow-200"
              }`}>
                {f.status}
              </span>
              {f.status === "finished" && f.score ? (
                <span className="font-bold">{f.score.home} - {f.score.away}</span>
              ) : (
                <span className="text-gray-600">{f.time ?? "TBA"}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
