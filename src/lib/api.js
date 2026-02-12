import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:4000' : '/api',
})

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
