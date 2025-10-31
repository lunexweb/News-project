"use client";
import { useMemo } from "react";
import newsData from "@/data/news.json";
import type { NewsArticle } from "@/types";
import { formatNumber } from "@/utils/number";

export default function ContentPerformance() {
  const articles = newsData as unknown as NewsArticle[];

  const stats = useMemo(() => {
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);
    const topPerformer = articles.reduce((top, a) => (a.views > (top?.views || 0) ? a : top), articles[0] as NewsArticle | undefined);
    return { totalViews, totalLikes, topPerformer, count: articles.length };
  }, [articles]);

  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
      <h3 className="text-lg font-bold mb-4">Content Performance</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-600">Total Articles</p>
          <p className="text-2xl font-bold">{stats.count}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Total Views</p>
          <p className="text-2xl font-bold">{formatNumber(stats.totalViews)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Total Engagement</p>
          <p className="text-2xl font-bold">{formatNumber(stats.totalLikes)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Avg. Views/Article</p>
          <p className="text-2xl font-bold">{formatNumber(Math.floor(stats.totalViews / stats.count || 0))}</p>
        </div>
      </div>
      {stats.topPerformer && (
        <div className="border-t pt-4">
          <p className="text-xs text-gray-600 mb-1">Top Performer</p>
          <p className="font-semibold text-sm">{stats.topPerformer.title}</p>
          <p className="text-xs text-gray-600">{formatNumber(stats.topPerformer.views)} views</p>
        </div>
      )}
    </div>
  );
}

