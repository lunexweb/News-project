"use client";
import { useEffect } from "react";

export default function VideoLightbox({
  open,
  onClose,
  embedUrl,
  title,
}: {
  open: boolean;
  onClose: () => void;
  embedUrl: string;
  title: string;
}) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-black rounded-xl overflow-hidden max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full aspect-video">
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="flex items-center justify-between text-white p-3">
          <span className="text-sm font-semibold line-clamp-1">{title}</span>
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Close</button>
        </div>
      </div>
    </div>
  );
}
