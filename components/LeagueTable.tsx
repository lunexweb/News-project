"use client";
import { useMemo, useState } from "react";
import type { LeagueTableRow } from "@/types";

export default function LeagueTable({ rows }: { rows: LeagueTableRow[] }) {
  type Col = keyof Pick<LeagueTableRow, "position" | "team" | "played" | "won" | "draw" | "lost" | "goalsFor" | "goalsAgainst" | "goalDifference" | "points">;
  const [sortCol, setSortCol] = useState<Col>("position");
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  function changeSort(col: Col) {
    if (col === sortCol) setDir(dir === "asc" ? "desc" : "asc");
    else {
      setSortCol(col);
      setDir(col === "team" ? "asc" : "desc");
    }
  }

  const sorted = useMemo(() => {
    const arr = [...rows];
    arr.sort((a, b) => {
      const av = a[sortCol] as any;
      const bv = b[sortCol] as any;
      if (typeof av === "string") return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return dir === "asc" ? av - bv : bv - av;
    });
    return arr;
  }, [rows, sortCol, dir]);

  const header = (label: string, col: Col) => (
    <th
      onClick={() => changeSort(col)}
      className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none"
    >
      {label} {sortCol === col ? (dir === "asc" ? "▲" : "▼") : ""}
    </th>
  );

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-black/10 shadow-sm">
      <table className="min-w-full table-fixed">
        <thead className="bg-cfn-gray/60">
          <tr>
            <th onClick={() => changeSort("position")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none w-12">Pos {sortCol === "position" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("team")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none w-1/2">Team {sortCol === "team" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("played")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hidden sm:table-cell w-12">P {sortCol === "played" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("won")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hidden sm:table-cell w-12">W {sortCol === "won" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("draw")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hidden md:table-cell w-12">D {sortCol === "draw" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("lost")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hidden md:table-cell w-12">L {sortCol === "lost" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("goalsFor")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hidden lg:table-cell w-12">GF {sortCol === "goalsFor" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("goalsAgainst")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hidden lg:table-cell w-12">GA {sortCol === "goalsAgainst" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("goalDifference")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hidden xl:table-cell w-12">GD {sortCol === "goalDifference" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => changeSort("points")} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none w-12">Pts {sortCol === "points" ? (dir === "asc" ? "▲" : "▼") : ""}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.team} className="border-t">
              <td className="px-3 py-2 text-sm font-semibold">{r.position}</td>
              <td className="px-3 py-2 text-sm whitespace-normal break-words">{r.team}</td>
              <td className="px-3 py-2 text-sm hidden sm:table-cell">{r.played}</td>
              <td className="px-3 py-2 text-sm hidden sm:table-cell">{r.won}</td>
              <td className="px-3 py-2 text-sm hidden md:table-cell">{r.draw}</td>
              <td className="px-3 py-2 text-sm hidden md:table-cell">{r.lost}</td>
              <td className="px-3 py-2 text-sm hidden lg:table-cell">{r.goalsFor}</td>
              <td className="px-3 py-2 text-sm hidden lg:table-cell">{r.goalsAgainst}</td>
              <td className="px-3 py-2 text-sm hidden xl:table-cell">{r.goalDifference}</td>
              <td className="px-3 py-2 text-sm font-bold">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
