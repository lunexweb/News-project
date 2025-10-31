export default function MetricCard({ title, value, change, icon }: { title: string; value: string | number; change?: { value: number; isPositive: boolean }; icon?: string }) {
  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${change.isPositive ? "text-green-600" : "text-red-600"}`}>
              {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}% from last month
            </p>
          )}
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </div>
  );
}

