"use client";
import { useState } from "react";
import NewsManager from "@/components/NewsManager";
import HighlightsManager from "@/components/HighlightsManager";

export default function ContentManagementView() {
  const [tab, setTab] = useState<"news" | "highlights">("news");
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setTab("news")} className={`px-3 py-2 rounded-full text-sm font-semibold border ${tab==="news"?"bg-cfn-red text-white border-cfn-red":"bg-white border-black/10"}`}>News</button>
        <button onClick={()=>setTab("highlights")} className={`px-3 py-2 rounded-full text-sm font-semibold border ${tab==="highlights"?"bg-cfn-red text-white border-cfn-red":"bg-white border-black/10"}`}>Highlights</button>
      </div>
      {tab === "news" ? <NewsManager /> : <HighlightsManager />}
    </div>
  );
}

