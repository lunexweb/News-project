import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ContactForm />
        </div>
        <aside className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
            <h2 className="text-lg font-bold mb-2">Follow CFN</h2>
            <ul className="space-y-2 text-sm">
              <li><a className="text-cfn-red font-semibold" href="#">Instagram</a></li>
              <li><a className="text-cfn-red font-semibold" href="#">TikTok</a></li>
              <li><a className="text-cfn-red font-semibold" href="#">X</a></li>
              <li><a className="text-cfn-red font-semibold" href="#">YouTube</a></li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
            <h2 className="text-lg font-bold mb-2">Newsletter</h2>
            <p className="text-sm text-gray-700 mb-2">Get weekly top stories and highlights.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="you@example.com" className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50" />
              <button className="px-4 py-2 rounded bg-cfn-red text-white font-semibold">Join</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
