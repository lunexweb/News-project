import type { MetadataRoute } from "next";
import news from "@/data/news.json";
import type { NewsArticle } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://cfn.local";
  const articles = news as unknown as NewsArticle[];

  const staticRoutes = ["/", "/news", "/stats", "/highlights", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "daily" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}/news/${a.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
