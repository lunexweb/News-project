"use client";
import { useEffect, useState } from "react";
import baseData from "@/data/highlights.json";
import type { Highlight } from "@/types";

const KEY = "cfn-highlights";

export default function HighlightsManager() {
  const [items, setItems] = useState<Highlight[]>([]);
  const [title, setTitle] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const local = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (local) setItems(JSON.parse(local));
    else setItems(baseData as unknown as Highlight[]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  function addHighlight() {
    if (!title.trim() || !embedUrl.trim()) return;
    const now = new Date();
    setItems([
      {
        id: `${Date.now()}`,
        title,
        platform: "youtube",
        embedUrl,
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
        duration: "2:00",
        date: now.toISOString().slice(0,10),
      },
      ...items,
    ]);
    setTitle("");
    setEmbedUrl("");
  }

  function remove(id: string) {
    setItems(items.filter(i => i.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm grid md:grid-cols-3 gap-3">
        <input placeholder="Highlight title" value={title} onChange={(e)=>setTitle(e.target.value)} className="px-3 py-2 border rounded-lg" />
        <input placeholder="Embed URL (YouTube/TikTok)" value={embedUrl} onChange={(e)=>setEmbedUrl(e.target.value)} className="px-3 py-2 border rounded-lg" />
        <button onClick={addHighlight} className="px-4 py-2 rounded bg-cfn-red text-white font-semibold">Add Highlight</button>
      </div>

      <ul className="divide-y bg-white rounded-xl border border-black/10 shadow-sm">
        {items.map(i => (
          <li key={i.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{i.title}</div>
              <div className="text-xs text-gray-600">{i.platform} • {i.date}</div>
            </div>
            <button onClick={()=>remove(i.id)} className="text-sm px-3 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
