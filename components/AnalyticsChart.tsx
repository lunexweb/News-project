"use client";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

export default function AnalyticsChart({ data, label, type = "area" }: { data: number[]; label: string; type?: "area" | "line" | "bar" | "pie" }) {
  const chartData = data.map((v, i) => ({ x: i + 1, y: v }));
  const COLORS = ["#FF4444", "#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#A855F7", "#10B981"];

  const formatInt = (value: any) => {
    const n = typeof value === "number" ? value : Number(value);
    return Math.round(n).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
      <h3 className="text-lg font-bold mb-4">{label}</h3>
      <div className={type === "pie" ? "h-80" : "h-64"}>
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" tickLine={false} />
              <YAxis tickLine={false} />
              <Tooltip formatter={(value: any) => formatInt(value)} labelFormatter={(label) => `Day ${label}`} />
              <Bar dataKey="y" fill="#FF4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : type === "line" ? (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" tickLine={false} />
              <YAxis tickLine={false} />
              <Tooltip formatter={(value: any) => formatInt(value)} labelFormatter={(label) => `Day ${label}`} />
              <Line type="monotone" dataKey="y" stroke="#FF4444" strokeWidth={3} dot={false} />
            </LineChart>
          ) : type === "pie" ? (
            <PieChart>
              <Tooltip formatter={(value: any) => formatInt(value)} />
              <Legend verticalAlign="bottom" height={24} />
              <Pie
                data={chartData}
                dataKey="y"
                nameKey="x"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={120}
                paddingAngle={2}
                labelLine
                label={(props: any) => `Day ${props?.payload?.x}: ${formatInt(props?.value)}`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cfnRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF4444" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" tickLine={false} />
              <YAxis tickLine={false} />
              <Tooltip formatter={(value: any) => formatInt(value)} labelFormatter={(label) => `Day ${label}`} />
              <Area type="monotone" dataKey="y" stroke="#FF4444" strokeWidth={2} fillOpacity={1} fill="url(#cfnRed)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

