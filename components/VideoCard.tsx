"use client";
import Image from "next/image";

export default function VideoCard({
  title,
  thumbnail,
  platform,
  onPlay,
}: {
  title: string;
  thumbnail: string;
  platform: string;
  onPlay: () => void;
}) {
  return (
    <button onClick={onPlay} className="group relative text-left rounded-xl overflow-hidden bg-white border border-black/10 shadow-sm w-full">
      <div className="relative h-40">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg width="24" height="24" fill="currentColor" className="text-cfn-red" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4 className="text-sm font-semibold line-clamp-2">{title}</h4>
        <p className="text-xs text-gray-600 mt-1 capitalize">{platform}</p>
      </div>
    </button>
  );
}
