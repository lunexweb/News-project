import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import newsData from "@/data/news.json";
import type { NewsArticle } from "@/types";
import NewsCard from "@/components/NewsCard";
import { formatDate } from "@/utils/date";
import ShareButtons from "@/components/ShareButtons";

const articles = newsData as unknown as NewsArticle[];

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = articles.find((a) => a.id === params.id);
  if (!article) return {};
  const title = `${article.title} | CFN`;
  const description = article.excerpt;
  const url = `/news/${article.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "CFN - Current Football News",
      images: [{ url: article.thumbnail }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.thumbnail],
    },
  };
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);
  if (!article) return notFound();

  const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link href={`/news/category/${encodeURIComponent(article.category)}`} className="inline-block text-xs font-bold px-2 py-1 bg-cfn-red text-white rounded">
            {article.category}
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{article.title}</h1>
        <div className="text-sm text-gray-600 mb-6">By {article.author} • {formatDate(article.date)}</div>
        <div className="relative w-full h-72 md:h-96 mb-6 rounded-xl overflow-hidden">
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover" />
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
          <p className="text-lg leading-relaxed">
            {article.content}
          </p>
          <div className="mt-6">
            <ShareButtons title={article.title} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
