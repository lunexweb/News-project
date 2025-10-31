export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">About CFN</h1>
        <p className="text-lg text-gray-700">
          CFN (Current Football News) delivers fast, accurate football news, stats and highlights —
          crafted for speed, clarity and mobile-first reading.
        </p>
      </header>

      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-700">
            Keep fans updated with what matters: reliable headlines, up-to-date tables, top scorers,
            fixtures and the best highlights — in one clean experience.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Coverage</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>CAF Champions League & Confederation Cup</li>
            <li>Premier Soccer League (PSL)</li>
            <li>English Premier League, UEFA Champions League, LaLiga</li>
            <li>World Cup and international tournaments</li>
          </ul>
        </div>
      </section>

      <section className="mt-6 bg-white p-6 rounded-xl border border-black/10 shadow-sm max-w-3xl">
        <h2 className="text-xl font-bold mb-2">Partnerships & Press</h2>
        <p className="text-gray-700">
          For media, sponsorships or content partnerships, reach us via the contact page. We welcome
          collaborations that help bring more football stories to fans.
        </p>
      </section>
    </div>
  );
}

