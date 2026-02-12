function StatusBadge({ status }) {
  const map = {
    open: { text: 'Open', className: 'bg-success/10 text-success ring-1 ring-success/20' },
    pending: { text: 'Pending', className: 'bg-warning/10 text-warning ring-1 ring-warning/20' },
    closed: { text: 'Closed', className: 'bg-danger/10 text-danger ring-1 ring-danger/20' },
  }
  const s = map[status] || map.open
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${s.className}`}>{s.text}</span>
  )
}

export default StatusBadge
