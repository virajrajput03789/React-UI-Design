import { useEffect, useMemo, useState } from 'react'
import StatCard from '../components/StatCard'
import Tabs from '../components/Tabs'
import TicketCard from '../components/TicketCard'
import TicketForm from '../components/TicketForm'
import { fetchTickets, createTicket as apiCreate, updateTicketStatus } from '../lib/api'
import { useUI } from '../hooks/useUI'

const initial = [
  { id: 1024, title: 'Unable to access dashboard', status: 'open', category: 'Technical', time: '2h ago' },
  { id: 1025, title: 'Billing discrepancy for invoice #84', status: 'pending', category: 'Billing', time: '5h ago' },
  { id: 1026, title: 'Feature request: export CSV', status: 'closed', category: 'General', time: '1d ago' },
]

function Tickets() {
  const [tickets, setTickets] = useState(initial)
  const [tab, setTab] = useState('all')
  const { search } = useUI()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchTickets()
        if (Array.isArray(data)) {
          const seen = new Set()
          const unique = []
          for (const t of data) {
            if (!seen.has(t.id)) {
              seen.add(t.id)
              unique.push(t)
            }
          }
          setTickets(unique)
        }
      } catch {
        // fallback to local initial
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    const byTab = tab === 'all' ? tickets : tickets.filter((t) => t.status === tab)
    const q = search.trim().toLowerCase()
    if (!q) return byTab
    return byTab.filter((t) => {
      return (
        String(t.id).includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    })
  }, [tickets, tab, search])

  const toggleStatus = (t) => {
    const next =
      t.status === 'open' ? 'pending' : t.status === 'pending' ? 'closed' : 'open'
    setTickets((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: next } : x)))
    updateTicketStatus(t.id, next).catch(() => {})
  }

  const createTicket = (payload) => {
    apiCreate({
      title: payload.title,
      status: 'open',
      category: payload.category,
    })
      .then((created) => {
        if (created && created.id) {
          setTickets((prev) => {
            const filtered = prev.filter((x) => x.id !== created.id)
            return [created, ...filtered]
          })
        }
      })
      .catch(() => {})
  }

  return (
    <div className="space-y-6">
      {loading && (
        <div className="text-sm text-text-muted">Loading tickets…</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Tickets Capacity" value={42} sublabel="active" trend={6} />
        <StatCard label="Open Tickets" value={18} trend={-2} />
        <StatCard label="Avg. Response" value="1h 12m" />
      </div>

      <div className="flex items-center justify-between">
        <Tabs
          tabs={[
            { key: 'all', label: 'All' },
            { key: 'open', label: 'Open' },
            { key: 'pending', label: 'Pending' },
            { key: 'closed', label: 'Closed' },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      <TicketForm onSubmit={createTicket} />

      <div className="grid grid-cols-1 gap-3">
        {filtered.map((t) => (
          <TicketCard key={t.id} ticket={t} onToggle={toggleStatus} />
        ))}
      </div>
    </div>
  )
}

export default Tickets
