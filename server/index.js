import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let tickets = [
  { id: 1024, title: 'Unable to access dashboard', status: 'open', category: 'Technical', time: '2h ago' },
  { id: 1025, title: 'Billing discrepancy for invoice #84', status: 'pending', category: 'Billing', time: '5h ago' },
  { id: 1026, title: 'Feature request: export CSV', status: 'closed', category: 'General', time: '1d ago' },
]

app.get('/tickets', (req, res) => {
  res.json(tickets)
})

app.post('/tickets', (req, res) => {
  const nextId = Math.max(...tickets.map((x) => x.id)) + 1
  const payload = req.body || {}
  const t = {
    id: nextId,
    title: payload.title || '',
    status: payload.status || 'open',
    category: payload.category || 'General',
    time: 'just now',
  }
  tickets = [t, ...tickets]
  res.json(t)
})

app.patch('/tickets/:id/status', (req, res) => {
  const id = Number(req.params.id)
  const { status } = req.body
  tickets = tickets.map((t) => (t.id === id ? { ...t, status } : t))
  res.json({ ok: true })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
