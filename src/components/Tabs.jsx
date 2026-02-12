function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((t) => {
        const isActive = t.key === active
        return (
          <button
            key={t.key}
            onClick={() => onChange?.(t.key)}
            className={`px-3 py-2 rounded-full text-sm border transition-colors ${
              isActive
                ? 'bg-primary-50 text-primary-700 border-primary-200'
                : 'bg-white text-text-muted border-border hover:text-text'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
