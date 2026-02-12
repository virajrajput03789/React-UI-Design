import { useState } from 'react'

function TicketForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setError('')
    onSubmit?.({ title, category })
    setTitle('')
    setCategory('General')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-4">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ticket title"
          className="flex-1 px-3 py-2 rounded-md border border-border outline-none placeholder:text-text-muted"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded-md border border-border"
        >
          <option>General</option>
          <option>Billing</option>
          <option>Technical</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          Create
        </button>
      </div>
      {error && <div className="mt-2 text-xs text-danger">{error}</div>}
    </form>
  )
}

export default TicketForm
