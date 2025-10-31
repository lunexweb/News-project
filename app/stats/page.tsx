"use client";
import { useMemo, useState } from "react";
import statsData from "@/data/stats.json";
import LeagueTable from "@/components/LeagueTable";
import TopScorers from "@/components/TopScorers";
import FixturesList from "@/components/FixturesList";
import StatsTabs from "@/components/StatsTabs";

export default function StatsPage() {
  const leaguesMap = (statsData as any).leagueTables as Record<string, any[]>;
  const leagueKeys = Object.keys(leaguesMap);
  const leagueLabels: { key: string; label: string }[] = useMemo(
    () => leagueKeys.map((k) => ({ key: k, label: k.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
    [leagueKeys]
  );
  const [activeLeague, setActiveLeague] = useState<string>(leagueKeys[0] ?? "");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Stats</h1>

      {/* League selector */}
      <div className="mb-6">
        <StatsTabs leagues={leagueLabels} active={activeLeague} onChange={setActiveLeague} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-3">League Table</h2>
          <div className="overflow-x-auto">
            <LeagueTable rows={leaguesMap[activeLeague] as any} />
          </div>
        </div>

        {/* Top scorers */}
        <div>
          <h2 className="text-xl font-bold mb-3">Top Scorers</h2>
          <TopScorers scorers={(statsData as any).topScorers} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">Fixtures & Results</h2>
        <div className="overflow-x-auto">
          <FixturesList fixtures={(statsData as any).fixtures} />
        </div>
      </div>
    </div>
  );
}

