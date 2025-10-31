"use client";
import news from "@/data/news.json";
import type { NewsArticle } from "@/types";
import { useMemo } from "react";

export default function NewsTicker() {
  const items = useMemo(() => (news as unknown as NewsArticle[]).map(a => a.title), []);
  const content = items.concat(items).join(" • ");
  return (
    <div className="w-full bg-yellow-300 text-black overflow-hidden border-b border-black/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-2">
          <span className="text-xs font-black uppercase tracking-widest bg-black text-yellow-300 px-2 py-0.5 rounded">Breaking</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="whitespace-nowrap animate-[ticker_30s_linear_infinite] text-sm font-semibold">
              {content}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
