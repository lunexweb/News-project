"use client";
import { useEffect, useState } from "react";
import { formatZAR } from "@/utils/currency";

const SPONSOR_KEY = "cfn-past-sponsors";

export interface Sponsor {
  id: string;
  name: string;
  campaign: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: "active" | "completed" | "cancelled";
}

const defaultSponsors: Sponsor[] = [
  { id: "1", name: "Nike", campaign: "Summer Kits 2024", startDate: "2024-01-15", endDate: "2024-03-15", amount: 50000, status: "completed" },
  { id: "2", name: "Adidas", campaign: "Champions League Push", startDate: "2024-02-01", endDate: "2024-05-01", amount: 75000, status: "completed" },
  { id: "3", name: "Puma", campaign: "PSL Sponsorship", startDate: "2024-03-10", endDate: "2024-06-10", amount: 40000, status: "completed" },
  { id: "4", name: "MTN", campaign: "Mobile Data Promo", startDate: "2024-04-01", endDate: "2024-07-01", amount: 60000, status: "active" },
];

export default function PastSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SPONSOR_KEY);
      setSponsors(stored ? JSON.parse(stored) : defaultSponsors);
    } catch {
      setSponsors(defaultSponsors);
    }
  }, []);

  useEffect(() => {
    if (sponsors.length > 0) {
      try { localStorage.setItem(SPONSOR_KEY, JSON.stringify(sponsors)); } catch {}
    }
  }, [sponsors]);

  const totalRevenue = sponsors.reduce((sum, s) => sum + (s.status === "completed" ? s.amount : 0), 0);
  const activeRevenue = sponsors.filter(s => s.status === "active").reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Sponsor Management</h3>
        <div className="text-right">
          <p className="text-xs text-gray-600">Total Revenue</p>
          <p className="text-xl font-bold text-green-600">{formatZAR(totalRevenue)}</p>
          <p className="text-xs text-gray-600 mt-1">Active: {formatZAR(activeRevenue)}</p>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sponsors.map((s) => (
          <div key={s.id} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{s.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    s.status === "active" ? "bg-green-100 text-green-700" :
                    s.status === "completed" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{s.campaign}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(s.startDate).toLocaleDateString()} - {new Date(s.endDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatZAR(s.amount)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

