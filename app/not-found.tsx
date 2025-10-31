import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="inline-block bg-white border border-black/10 shadow-sm rounded-2xl px-8 py-12">
        <div className="text-cfn-red text-7xl font-black tracking-tight">404</div>
        <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-gray-600">The page you are looking for doesn’t exist.</p>
        <Link href="/" className="inline-block mt-6 px-4 py-2 rounded bg-cfn-red text-white font-semibold">Go Home</Link>
      </div>
    </div>
  );
}
