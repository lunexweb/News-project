import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types";

export default function NewsHero({ articles }: { articles: NewsArticle[] }) {
  const [main, ...rest] = articles;
  const secondary = rest.slice(0, 2);

  return (
    <section className="mb-8">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main feature */}
        {main && (
          <div className="relative md:col-span-2 rounded-2xl overflow-hidden border border-black/10 shadow-sm">
            <Link href={`/news/${main.id}`} className="block">
              <div className="relative h-72 md:h-96">
                <Image src={main.thumbnail} alt={main.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block text-xs font-bold px-2 py-1 bg-cfn-red text-white rounded">{main.category}</span>
                  <h2 className="mt-2 text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow">{main.title}</h2>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Secondary (Sponsored) */}
        <div className="grid gap-6">
          {secondary.map((a) => (
            <Link key={a.id} href={`/news/${a.id}`} className="relative rounded-2xl overflow-hidden border border-black/10 shadow-sm block">
              <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wide bg-black/70 text-white px-2 py-0.5 rounded">Sponsored</span>
              <div className="relative h-32">
                <Image src={a.thumbnail} alt={a.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block text-xs font-bold px-2 py-1 bg-cfn-red text-white rounded">{a.category}</span>
                  <h3 className="mt-1 text-white text-base font-semibold leading-snug line-clamp-2">{a.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
