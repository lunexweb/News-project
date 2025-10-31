import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news.json";
import highlightsData from "@/data/highlights.json";
import statsData from "@/data/stats.json";
import type { NewsArticle, Highlight } from "@/types";
import { formatDate } from "@/utils/date";

function HeroCarousel({ articles }: { articles: NewsArticle[] }) {
  const featured = articles.slice(0, 3);
  return (
    <section className="mb-10">
      <div className="relative w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="grid md:grid-cols-3">
          {featured.map((item) => (
            <div key={item.id} className="relative h-56 md:h-72">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-block text-xs font-bold px-2 py-1 bg-cfn-red text-white rounded">
                  {item.category}
                </span>
                <h3 className="mt-2 text-white text-sm md:text-base font-semibold leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestNews({ articles }: { articles: NewsArticle[] }) {
  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">Latest News</h2>
        <Link href="/news" className="text-cfn-red font-semibold">See all</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 6).map((item) => (
          <article key={item.id} className="rounded-xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-44">
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="inline-block px-2 py-0.5 bg-cfn-gray rounded font-semibold text-cfn-black/80">{item.category}</span>
                <span>{formatDate(item.date)}</span>
              </div>
              <h3 className="mt-2 text-base md:text-lg font-semibold leading-snug line-clamp-2">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuickStats() {
  const premier = (statsData as any).leagueTables["premier-league"].slice(0, 3);
  const scorers = (statsData as any).topScorers.slice(0, 3);
  const fixtures = (statsData as any).fixtures.slice(0, 3);
  return (
    <section className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Quick Stats</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-black/10 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Table (Premier League)</h3>
            <Link href="/stats" className="text-cfn-red text-sm font-semibold">View</Link>
          </div>
          <ul className="space-y-2 text-sm">
            {premier.map((r: any) => (
              <li key={r.team} className="flex justify-between">
                <span className="font-medium">{r.position}. {r.team}</span>
                <span className="text-gray-600">{r.points} pts</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-black/10 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Top Scorers</h3>
            <Link href="/stats" className="text-cfn-red text-sm font-semibold">View</Link>
          </div>
          <ul className="space-y-2 text-sm">
            {scorers.map((p: any) => (
              <li key={p.player} className="flex justify-between">
                <span className="font-medium">{p.player} <span className="text-gray-500">({p.team})</span></span>
                <span className="text-gray-600">{p.goals} G</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-black/10 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Upcoming Fixtures</h3>
            <Link href="/stats" className="text-cfn-red text-sm font-semibold">View</Link>
          </div>
          <ul className="space-y-2 text-sm">
            {fixtures.map((f: any) => (
              <li key={f.id} className="flex justify-between">
                <span className="font-medium">{f.home} vs {f.away}</span>
                <span className="text-gray-600">{formatDate(f.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HighlightsStrip({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="mb-4">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">Highlights</h2>
        <Link href="/highlights" className="text-cfn-red font-semibold">See all</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.slice(0, 4).map((h) => (
          <div key={h.id} className="group relative rounded-xl overflow-hidden bg-white border border-black/10 shadow-sm">
            <div className="relative h-28 md:h-36">
              <Image src={h.thumbnail} alt={h.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="p-3">
              <h4 className="text-sm font-semibold line-clamp-2">{h.title}</h4>
              <p className="text-xs text-gray-600 mt-1 capitalize">{h.platform}</p>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const articles = newsData as unknown as NewsArticle[];
  const highlights = highlightsData as unknown as Highlight[];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <HeroCarousel articles={articles} />
      <LatestNews articles={articles} />
      <QuickStats />
      <HighlightsStrip highlights={highlights} />
    </div>
  );
}

