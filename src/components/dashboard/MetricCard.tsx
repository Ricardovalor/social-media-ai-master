interface MetricCardProps {
  title: string
  value: string | number
  change?: number
}

export function MetricCard({ title, value, change }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold text-gray-600">{title}</h3>
      <div className="flex items-baseline mt-2">
        <p className="text-2xl font-bold">{value}</p>
        {change !== undefined && (
          <span className={`ml-2 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </div>
  )
}
