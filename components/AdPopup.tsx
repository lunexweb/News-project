"use client";
import { useEffect, useRef, useState } from "react";

export default function AdPopup() {
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // show first after 2s
    timer.current = setTimeout(() => setOpen(true), 2000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    // when closed, schedule to open again every 20s
    if (!open) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setOpen(true), 20000);
    }
    return () => { /* timer handled in state change */ };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-black/10 w-80 overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b">
          <span className="text-[10px] font-bold uppercase tracking-wide text-gray-600">Sponsored</span>
          <button aria-label="Close" onClick={() => setOpen(false)} className="text-gray-600 hover:text-cfn-red">✕</button>
        </div>
        <div className="p-4">
          <div className="rounded-lg bg-cfn-gray p-4 text-left">
            <div className="text-lg font-black text-cfn-red">Built by Lunexweb</div>
            <p className="mt-1 text-sm text-gray-700">We build advanced, marketing-powered websites that convert.</p>
            <a href="https://www.lunexweb.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-3 py-2 rounded bg-cfn-red text-white font-semibold">Learn more</a>
            <p className="mt-2 text-xs text-gray-500">This popup will reappear periodically.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
