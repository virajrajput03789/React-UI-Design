import { useState } from 'react'

function SearchBar({ onChange }) {
  const [q, setQ] = useState('')
  const handle = (e) => {
    const v = e.target.value
    setQ(v)
    onChange?.(v)
  }
  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white shadow-card">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-text-muted">
        <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
      <input
        value={q}
        onChange={handle}
        placeholder="Search tickets"
        className="outline-none text-sm placeholder:text-text-muted"
      />
    </div>
  )
}

export default SearchBar
