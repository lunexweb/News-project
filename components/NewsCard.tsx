import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types";
import { formatDate } from "@/utils/date";

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="rounded-xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/news/${article.id}`} className="block">
        <div className="relative h-40">
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-block px-2 py-0.5 bg-cfn-gray rounded font-semibold text-cfn-black/80">{article.category}</span>
            <span>{formatDate(article.date)}</span>
            <span className="ml-auto text-gray-500">{article.source}</span>
          </div>
          <h3 className="mt-2 text-base md:text-lg font-semibold leading-snug line-clamp-2">{article.title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
