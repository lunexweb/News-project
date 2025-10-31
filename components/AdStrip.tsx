export default function AdStrip() {
  return (
    <section className="mb-8">
      <div className="grid md:grid-cols-3 gap-4 items-stretch">
        <div className="rounded-xl border border-black/10 bg-white shadow-sm relative px-4 pt-8 pb-4">
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-black/70 text-white px-2 py-0.5 rounded">Sponsored</span>
          <h3 className="text-base font-bold">Get the Fastest Live Scores App</h3>
          <p className="text-sm text-gray-600 mt-2">Real-time notifications and highlights for your favorite teams.</p>
          <a href="#" className="inline-block mt-4 px-3 py-2 rounded bg-cfn-red text-white font-semibold">Install</a>
        </div>
        <div className="rounded-xl border border-black/10 bg-white shadow-sm relative px-4 pt-8 pb-4">
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-black/70 text-white px-2 py-0.5 rounded">Sponsored</span>
          <h3 className="text-base font-bold">Football Merch Sale</h3>
          <p className="text-sm text-gray-600 mt-2">Official kits and gear up to 40% off this week only.</p>
          <a href="#" className="inline-block mt-4 px-3 py-2 rounded bg-cfn-red text-white font-semibold">Shop now</a>
        </div>
        <div className="rounded-xl border-2 border-dashed border-cfn-red/50 bg-white shadow-sm p-6 text-center">
          <div className="text-sm font-bold uppercase tracking-wide text-cfn-red">Advertise Here</div>
          <p className="text-sm text-gray-600 mt-2">Promote your brand to engaged football fans.</p>
          <a href="#" className="inline-block mt-4 px-3 py-2 rounded bg-cfn-red text-white font-semibold">Book a spot</a>
        </div>
      </div>
    </section>
  );
}
