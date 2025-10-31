"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { NewsArticle } from "@/types";
import { formatDate } from "@/utils/date";
import VideoLightbox from "@/components/VideoLightbox";
import { youtubeThumbnail, youtubeEmbedUrl } from "@/utils/youtube";
import { formatNumber, seededRandomFromString } from "@/utils/number";

export type DiscoverItem =
  | { type: "article"; data: NewsArticle; id: string; sponsored?: boolean }
  | { type: "video"; data: { title: string; url: string; source?: string }; id: string; sponsored?: boolean };

function useCounters(id: string) {
  const likeKey = `cfn-like-${id}`;
  const commentKey = `cfn-comment-${id}`;
  const shareKey = `cfn-share-${id}`;
  const viewKey = `cfn-view-${id}`;
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const [views, setViews] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const seed = seededRandomFromString(id);
      const baseLikes = Math.floor(200 * seed + 40);
      const baseComments = Math.floor(60 * seed + 10);
      const baseShares = Math.floor(80 * seed + 15);
      const baseViews = Math.floor(5000 * seed + 800);

      setLikes(Number(localStorage.getItem(likeKey) ?? baseLikes));
      setComments(Number(localStorage.getItem(commentKey) ?? baseComments));
      setShares(Number(localStorage.getItem(shareKey) ?? baseShares));
      setViews(Number(localStorage.getItem(viewKey) ?? baseViews));
      setLiked(localStorage.getItem(likeKey + "-flag") === "1");
      const nextViews = Number(localStorage.getItem(viewKey) ?? baseViews) + 1;
      localStorage.setItem(viewKey, String(nextViews));
      setViews(nextViews);
    } catch {}
  }, [id, likeKey, commentKey, shareKey, viewKey]);

  function doLike() {
    const nextLiked = !liked;
    setLiked(nextLiked);
    const next = Math.max(0, (nextLiked ? likes + 1 : likes - 1));
    setLikes(next);
    try {
      localStorage.setItem(likeKey, String(next));
      localStorage.setItem(likeKey + "-flag", nextLiked ? "1" : "0");
    } catch {}
  }
  function doComment() {
    const next = comments + 1;
    setComments(next);
    try { localStorage.setItem(commentKey, String(next)); } catch {}
  }
  async function doShare(url: string) {
    try {
      if (navigator.share) await navigator.share({ url });
      else await navigator.clipboard.writeText(url);
    } catch {}
    const next = shares + 1;
    setShares(next);
    try { localStorage.setItem(shareKey, String(next)); } catch {}
  }

  return { likes, comments, shares, views, liked, doLike, doComment, doShare };
}

export default function DiscoverCard({ item, featured = false }: { item: DiscoverItem; featured?: boolean }) {
  const [open, setOpen] = useState(false);
  const { likes, comments, shares, views, liked, doLike, doComment, doShare } = useCounters(item.id);

  const sponsoredBadge = item.sponsored ? (
    <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wide bg-black/70 text-white px-2 py-0.5 rounded">Sponsored</span>
  ) : null;

  const mediaHeight = featured ? "h-60 md:h-64" : "h-40";

  if (item.type === "article") {
    const a = item.data;
    const shareUrl = typeof window !== "undefined" ? window.location.origin + `/news/${a.id}` : `/news/${a.id}`;
    return (
      <article className={`relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-md transition-shadow ${featured ? "md:col-span-2" : ""}`}>
        {sponsoredBadge}
        <Link href={`/news/${a.id}`} className="block">
          <div className={`relative ${mediaHeight}`}>
            <Image src={a.thumbnail} alt={a.title} fill className="object-cover" />
          </div>
        </Link>
        <div className="flex-1 p-4 flex flex-col">
          <div className="text-xs text-gray-500 flex items-center gap-3">
            <span className="inline-block px-2 py-0.5 bg-cfn-gray rounded font-semibold text-cfn-black/80">{a.category}</span>
            <span>{formatDate(a.date)}</span>
            <span className="ml-auto text-gray-500">{formatNumber(views)} views</span>
          </div>
          <Link href={`/news/${a.id}`} className="mt-2">
            <h3 className={`font-semibold ${featured ? "text-xl" : "text-base"} leading-snug line-clamp-2`}>{a.title}</h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{a.excerpt}</p>
          </Link>
          <div className="mt-auto pt-2 border-t border-gray-100 flex items-center gap-3 text-sm text-gray-700">
            <button onClick={doLike} className={`flex items-center gap-1 px-2 py-1 rounded ${liked ? "text-cfn-red" : "hover:bg-gray-100"}`}>❤ <span>{formatNumber(likes)}</span></button>
            <button onClick={doComment} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">💬 <span>{formatNumber(comments)}</span></button>
            <button onClick={() => doShare(shareUrl)} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">↗ <span>{formatNumber(shares)}</span></button>
          </div>
        </div>
      </article>
    );
  }

  const thumb = youtubeThumbnail(item.data.url) || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800";
  const videoUrl = youtubeEmbedUrl(item.data.url);
  return (
    <>
      <div className={`relative flex flex-col h-full group rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-md transition-shadow ${featured ? "md:col-span-2" : ""}`}>
        {sponsoredBadge}
        <button onClick={() => setOpen(true)} className="block text-left">
          <div className={`relative ${mediaHeight}`}>
            <Image src={thumb} alt={item.data.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="24" height="24" fill="currentColor" className="text-cfn-red" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </div>
        </button>
        <div className="flex-1 p-4 flex flex-col">
          <div className="text-xs text-gray-500 flex items-center gap-3">
            <span className="inline-block px-2 py-0.5 bg-cfn-gray rounded font-semibold text-cfn-black/80">Video</span>
            {item.data.source && <span>{item.data.source}</span>}
            <span className="ml-auto text-gray-500">{formatNumber(views)} views</span>
          </div>
          <button onClick={() => setOpen(true)} className="text-left mt-2">
            <h3 className={`font-semibold ${featured ? "text-xl" : "text-base"} leading-snug line-clamp-2`}>{item.data.title}</h3>
          </button>
          <div className="mt-auto pt-2 border-t border-gray-100 flex items-center gap-3 text-sm text-gray-700">
            <button onClick={() => doLike()} className={`flex items-center gap-1 px-2 py-1 rounded ${liked ? "text-cfn-red" : "hover:bg-gray-100"}`}>❤ <span>{formatNumber(likes)}</span></button>
            <button onClick={() => doComment()} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">💬 <span>{formatNumber(comments)}</span></button>
            <button onClick={() => doShare(videoUrl)} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">↗ <span>{formatNumber(shares)}</span></button>
          </div>
        </div>
      </div>

      <VideoLightbox open={open} onClose={() => setOpen(false)} embedUrl={videoUrl} title={item.data.title} />
    </>
  );
}
