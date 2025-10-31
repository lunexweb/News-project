"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthed } from "@/utils/auth";
import LogoutButton from "@/components/LogoutButton";
import MetricCard from "@/components/MetricCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import PastSponsors from "@/components/PastSponsors";
import ContentPerformance from "@/components/ContentPerformance";
import ContentManagementView from "@/components/ContentManagementView";

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<"overview" | "content" | "sponsors">("overview");

  useEffect(() => {
    if (!isAuthed()) router.replace("/login");
    else setReady(true);
  }, [router]);

  if (!ready) return null;

  const weeklyViews = [12500, 15800, 14200, 18900, 21000, 19500, 22300];
  const weeklyEngagement = [3200, 4100, 3800, 5200, 5800, 5100, 6200];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">CEO Dashboard</h1>
          <p className="text-gray-600 mt-1">Complete overview of CFN performance and analytics</p>
        </div>
        <LogoutButton />
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={()=>setView("overview")} className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${view==="overview"?"bg-cfn-red text-white border-cfn-red":"bg-white border-black/10 hover:border-cfn-red"}`}>Overview</button>
        <button onClick={()=>setView("content")} className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${view==="content"?"bg-cfn-red text-white border-cfn-red":"bg-white border-black/10 hover:border-cfn-red"}`}>Content Management</button>
        <button onClick={()=>setView("sponsors")} className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${view==="sponsors"?"bg-cfn-red text-white border-cfn-red":"bg-white border-black/10 hover:border-cfn-red"}`}>Sponsors</button>
      </div>

      {view === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Page Views" value="1.2M" change={{ value: 12.5, isPositive: true }} icon="📊" />
            <MetricCard title="Active Users" value="45.2K" change={{ value: 8.3, isPositive: true }} icon="👥" />
            <MetricCard title="Revenue (MTD)" value="R225K" change={{ value: 15.2, isPositive: true }} icon="💰" />
            <MetricCard title="Engagement Rate" value="4.8%" change={{ value: 2.1, isPositive: true }} icon="💬" />
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnalyticsChart data={weeklyViews} label="Weekly Page Views" />
            <AnalyticsChart data={weeklyEngagement} label="Weekly Engagement" type="pie" />
          </div>

          {/* Bottom Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <ContentPerformance />
            <PastSponsors />
          </div>
        </div>
      )}

      {view === "content" && (
        <ContentManagementView />
      )}

      {view === "sponsors" && (
        <div className="space-y-6">
          <PastSponsors />
        </div>
      )}
    </div>
  );
}
