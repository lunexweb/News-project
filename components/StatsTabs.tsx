"use client";

export default function StatsTabs({
  leagues,
  active,
  onChange,
}: {
  leagues: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {leagues.map((l) => {
        const isActive = l.key === active;
        return (
          <button
            key={l.key}
            onClick={() => onChange(l.key)}
            className={`px-3 py-2 rounded-full text-sm font-semibold border transition-colors ${
              isActive
                ? "bg-cfn-red text-white border-cfn-red"
                : "bg-white text-cfn-black border-black/10 hover:border-cfn-red"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
