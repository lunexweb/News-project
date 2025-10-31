"use client";
import Link from "next/link";

export default function CategoryTabs({
  categories,
  active,
}: {
  categories: string[];
  active?: string;
}) {
  const all = ["All", ...categories];
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const isActive = (active ?? "All") === cat;
        const href = cat === "All" ? "/news" : `/news/category/${encodeURIComponent(cat)}`;
        return (
          <Link
            key={cat}
            href={href}
            className={`px-3 py-2 rounded-full text-sm font-semibold border transition-colors ${
              isActive
                ? "bg-cfn-red text-white border-cfn-red"
                : "bg-white text-cfn-black border-black/10 hover:border-cfn-red"
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
