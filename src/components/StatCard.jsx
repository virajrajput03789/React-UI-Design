function StatCard({ label, value, sublabel, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-border p-4">
      <div className="text-xs text-text-muted">{label}</div>
      <div className="mt-1 flex items-end gap-2">
        <div className="text-xl md:text-2xl font-semibold text-text">{value}</div>
        {sublabel && <div className="text-xs text-text-muted">{sublabel}</div>}
        {trend && (
          <div className={`ml-auto text-[11px] ${trend > 0 ? 'text-success' : 'text-danger'}`}>
            {trend > 0 ? '+' : ''}
            {trend}%
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
