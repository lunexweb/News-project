"use client";
import { useMemo, useState } from "react";
import newsData from "@/data/news.json";
import type { NewsArticle } from "@/types";
import DiscoverCard, { type DiscoverItem } from "@/components/DiscoverCard";
import NewsHero from "@/components/NewsHero";
import AdPopup from "@/components/AdPopup";
import SearchBar from "@/components/SearchBar";
import AdStrip from "@/components/AdStrip";

const VIDEO_ITEMS_BASE = [
  { title: "Match Highlights 1", url: "https://youtu.be/zkUmvVzWp2c", source: "YouTube" },
  { title: "Match Highlights 2", url: "https://youtu.be/z7TS2vg0Zdo", source: "YouTube" },
  { title: "Match Highlights 3", url: "https://youtu.be/LFzrA492gdw", source: "YouTube" },
];

export default function NewsPage() {
  const [q, setQ] = useState("");
  const articles = newsData as unknown as NewsArticle[];

  const feed: DiscoverItem[] = useMemo(() => {
    const items: DiscoverItem[] = [];
    const articleItems: DiscoverItem[] = articles.map((a, i) => ({ type: "article", data: a, id: `a-${a.id}`, sponsored: (i+1) % 6 === 0 }));
    const videoItems: DiscoverItem[] = VIDEO_ITEMS_BASE.map((v, i) => ({ type: "video", data: v, id: `v-${i+1}`, sponsored: i === 0 }));

    const insertEvery = 3;
    let v = 0;
    for (let i = 0; i < articleItems.length; i++) {
      items.push(articleItems[i]);
      if ((i + 1) % insertEvery === 0 && v < videoItems.length) {
        items.push(videoItems[v++]);
      }
    }
    while (v < videoItems.length) items.push(videoItems[v++]);

    if (!q.trim()) return items;
    const lower = q.toLowerCase();
    return items.filter((it) =>
      it.type === "article"
        ? it.data.title.toLowerCase().includes(lower) || it.data.excerpt.toLowerCase().includes(lower)
        : it.data.title.toLowerCase().includes(lower)
    );
  }, [articles, q]);

  return (
    <div className="container mx-auto px-4 py-8">
      <AdPopup />
      <NewsHero articles={articles} />
      <div className="mb-6 max-w-3xl mx-auto">
        <SearchBar onChange={setQ} />
      </div>
      <AdStrip />
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Discover</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {feed.map((item, idx) => (
          <DiscoverCard key={item.id} item={item} featured={idx % 7 === 0} />
        ))}
      </div>
    </div>
  );
}

