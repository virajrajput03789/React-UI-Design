let tickets = [
  { id: 1024, title: 'Unable to access dashboard', status: 'open', category: 'Technical', time: '2h ago' },
  { id: 1025, title: 'Billing discrepancy for invoice #84', status: 'pending', category: 'Billing', time: '5h ago' },
  { id: 1026, title: 'Feature request: export CSV', status: 'closed', category: 'General', time: '1d ago' },
]

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(tickets)
    return
  }

  if (req.method === 'POST') {
    try {
      const payload = req.body || {}
      const nextId = Math.max(...tickets.map((x) => x.id)) + 1
      const t = {
        id: nextId,
        title: payload.title || '',
        status: payload.status || 'open',
        category: payload.category || 'General',
        time: 'just now',
      }
      tickets = [t, ...tickets]
      res.status(200).json(t)
    } catch {
      res.status(400).json({ ok: false })
    }
    return
  }

  res.status(405).end()
}
