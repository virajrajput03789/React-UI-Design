import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST', 'PATCH'],
  })
)
app.use(express.json())
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const ms = Date.now() - start
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`)
  })
  next()
})
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
})
app.use(limiter)

const dataFile = path.join(process.cwd(), 'server', 'data', 'tickets.json')
let tickets = []
try {
  if (fs.existsSync(dataFile)) {
    tickets = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
  } else {
    tickets = [
      { id: 1024, title: 'Unable to access dashboard', status: 'open', category: 'Technical', time: '2h ago' },
      { id: 1025, title: 'Billing discrepancy for invoice #84', status: 'pending', category: 'Billing', time: '5h ago' },
      { id: 1026, title: 'Feature request: export CSV', status: 'closed', category: 'General', time: '1d ago' },
    ]
    fs.mkdirSync(path.dirname(dataFile), { recursive: true })
    fs.writeFileSync(dataFile, JSON.stringify(tickets, null, 2))
  }
} catch (err) {
  console.error('Init data error', err)
}
function save() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(tickets, null, 2))
  } catch (err) {
    console.error('Persist error', err)
  }
}

app.get('/tickets', (req, res) => {
  res.json(tickets)
})

app.post('/tickets', (req, res, next) => {
  try {
    const payload = req.body || {}
    const title = String(payload.title || '').trim()
    const category = String(payload.category || 'General')
    const status = String(payload.status || 'open')
    if (title.length < 3) {
      return res.status(400).json({ error: 'Title must be at least 3 characters' })
    }
    if (!['General', 'Billing', 'Technical'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' })
    }
    if (!['open', 'pending', 'closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    const nextId = Math.max(...tickets.map((x) => x.id)) + 1
    const t = { id: nextId, title, status, category, time: 'just now' }
    tickets = [t, ...tickets]
    save()
    res.json(t)
  } catch (err) {
    next(err)
  }
})

app.patch('/tickets/:id/status', (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const status = String(req.body?.status || '')
    if (!['open', 'pending', 'closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    tickets = tickets.map((t) => (t.id === id ? { ...t, status } : t))
    save()
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  void next
  res.status(500).json({ error: 'Internal server error' })
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
