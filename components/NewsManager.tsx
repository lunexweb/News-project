"use client";
import { useEffect, useMemo, useState } from "react";
import baseData from "@/data/news.json";
import type { NewsArticle } from "@/types";
import { formatDate } from "@/utils/date";

const KEY = "cfn-news";

export default function NewsManager() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("English Premier League");

  useEffect(() => {
    const local = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (local) setArticles(JSON.parse(local));
    else setArticles(baseData as unknown as NewsArticle[]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(articles));
  }, [articles]);

  const categories = useMemo(() => Array.from(new Set(articles.map(a => a.category))), [articles]);

  function addArticle() {
    if (!title.trim()) return;
    const now = new Date();
    const newArticle: NewsArticle = {
      id: `${Date.now()}`,
      title,
      category,
      date: `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`,
      author: "CFN Editorial",
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      excerpt: "Demo article added via Admin.",
      content: "This is a demo article created in the admin dashboard.",
      teamTags: [],
      source: "CFN",
      views: 0,
      likes: 0,
    };
    setArticles([newArticle, ...articles]);
    setTitle("");
  }

  function remove(id: string) {
    setArticles(articles.filter(a => a.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm grid md:grid-cols-3 gap-3">
        <input
          placeholder="New article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="px-3 py-2 border rounded-lg">
          {categories.concat(["CAF Champions League","Premier Soccer League"]).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={addArticle} className="px-4 py-2 rounded bg-cfn-red text-white font-semibold">Add Article</button>
      </div>

      <ul className="divide-y bg-white rounded-xl border border-black/10 shadow-sm">
        {articles.map(a => (
          <li key={a.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{a.title}</div>
              <div className="text-xs text-gray-600">{a.category} • {formatDate(a.date)}</div>
            </div>
            <button onClick={()=>remove(a.id)} className="text-sm px-3 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
