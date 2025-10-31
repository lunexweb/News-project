"use client";
export default function SearchBar({ placeholder, onChange }: { placeholder?: string; onChange?: (q: string) => void }) {
  return (
    <div className="w-full bg-white rounded-full shadow-lg border border-black/10 flex items-center p-2">
      <svg className="w-5 h-5 text-gray-500 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        type="text"
        placeholder={placeholder ?? "Search news, leagues, teams..."}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex-1 px-3 py-2 outline-none bg-transparent"
      />
      <button className="mr-2 px-4 py-1.5 rounded-full bg-cfn-red text-white text-sm font-semibold">Search</button>
    </div>
  );
}
