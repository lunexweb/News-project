"use client";
import { usePathname } from "next/navigation";

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname();
  const url = typeof window !== "undefined" ? window.location.origin + pathname : pathname;

  const shareLinks = [
    { name: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: "WhatsApp", href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}` },
  ];

  return (
    <div className="flex items-center gap-3">
      {shareLinks.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-3 py-1.5 rounded border border-black/10 hover:border-cfn-red"
        >
          Share on {s.name}
        </a>
      ))}
    </div>
  );
}
