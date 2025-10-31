"use client";
import { useMemo, useState } from "react";
import highlights from "@/data/highlights.json";
import type { Highlight } from "@/types";
import VideoCard from "@/components/VideoCard";
import VideoLightbox from "@/components/VideoLightbox";
import PhotoGallery from "@/components/PhotoGallery";

export default function HighlightsPage() {
  const items = highlights as unknown as Highlight[];
  const [openId, setOpenId] = useState<string | null>(null);

  const topMoments = useMemo(() => items.slice(0, 3), [items]);
  const galleryItems = useMemo(
    () => items.map((h) => ({ id: h.id, title: h.title, src: h.thumbnail })),
    [items]
  );

  const current = items.find((i) => i.id === openId) || null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Highlights</h1>

      {/* Top Moments */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Top Moments of the Week</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {topMoments.map((v) => (
            <VideoCard
              key={v.id}
              title={v.title}
              thumbnail={v.thumbnail}
              platform={v.platform}
              onPlay={() => setOpenId(v.id)}
            />
          ))}
        </div>
      </section>

      {/* All Highlights */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">All Highlights</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((v) => (
            <VideoCard
              key={v.id}
              title={v.title}
              thumbnail={v.thumbnail}
              platform={v.platform}
              onPlay={() => setOpenId(v.id)}
            />
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Photo Gallery</h2>
        <PhotoGallery items={galleryItems} />
      </section>

      <VideoLightbox
        open={!!current}
        onClose={() => setOpenId(null)}
        embedUrl={current?.embedUrl ?? ""}
        title={current?.title ?? ""}
      />
    </div>
  );
}

