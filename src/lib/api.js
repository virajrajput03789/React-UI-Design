import axios from 'axios'
const base =
  import.meta.env.DEV
    ? (import.meta.env.VITE_API_URL || 'http://localhost:4000')
    : (import.meta.env.VITE_API_URL || '/api')
const api = axios.create({ baseURL: base })

export async function fetchTickets() {
  const res = await api.get('/tickets')
  return res.data
}

export async function createTicket(data) {
  const res = await api.post('/tickets', data)
  return res.data
}

export async function updateTicketStatus(id, status) {
  await api.patch(`/tickets/${id}/status`, { status })
}
