let tickets = [
  { id: 1024, title: 'Unable to access dashboard', status: 'open', category: 'Technical', time: '2h ago' },
  { id: 1025, title: 'Billing discrepancy for invoice #84', status: 'pending', category: 'Billing', time: '5h ago' },
  { id: 1026, title: 'Feature request: export CSV', status: 'closed', category: 'General', time: '1d ago' },
]

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body || {}
      const numId = Number(id)
      tickets = tickets.map((t) => (t.id === numId ? { ...t, status } : t))
      res.status(200).json({ ok: true })
    } catch {
      res.status(400).json({ ok: false })
    }
    return
  }

  res.status(405).end()
}
