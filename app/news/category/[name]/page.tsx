import { notFound } from "next/navigation";
import newsData from "@/data/news.json";
import type { NewsArticle } from "@/types";
import NewsCard from "@/components/NewsCard";
import CategoryTabs from "@/components/CategoryTabs";

export default function CategoryPage({ params }: { params: { name: string } }) {
  const articles = newsData as unknown as NewsArticle[];
  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const decoded = decodeURIComponent(params.name);

  if (!categories.includes(decoded)) return notFound();

  const filtered = articles.filter((a) => a.category === decoded);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{decoded}</h1>

      <div className="mb-6">
        <CategoryTabs categories={categories} active={decoded} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
