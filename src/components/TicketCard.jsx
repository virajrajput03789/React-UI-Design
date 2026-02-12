import StatusBadge from './StatusBadge'

function TicketCard({ ticket, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 hover:shadow-card transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm md:text-base font-semibold text-text">{ticket.title}</h3>
            <StatusBadge status={ticket.status} />
          </div>
          <div className="mt-1 text-xs text-text-muted">
            #{ticket.id} • {ticket.category} • {ticket.time}
          </div>
        </div>
        <button
          className="px-3 py-2 rounded-md text-xs border border-border hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors"
          onClick={() => onToggle?.(ticket)}
        >
          Toggle Status
        </button>
      </div>
      <div className="mt-3 h-px bg-border" />
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-text-muted">
        <div className="px-2 py-1 rounded-md bg-bg">Priority: Medium</div>
        <div className="px-2 py-1 rounded-md bg-bg">Assignee: Unassigned</div>
        <div className="px-2 py-1 rounded-md bg-bg">Channel: Email</div>
        <div className="px-2 py-1 rounded-md bg-bg">SLA: 24h</div>
      </div>
    </div>
  )
}

export default TicketCard
