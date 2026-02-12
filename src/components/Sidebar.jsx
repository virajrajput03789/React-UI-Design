import { useUI } from '../hooks/useUI'

const navItems = [
  { key: 'tickets', label: 'Tickets', icon: 'ticket' },
  { key: 'capacity', label: 'Capacity', icon: 'capacity' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
]

function Sidebar() {
  const { nav, setNav } = useUI()

  return (
    <aside className="hidden md:flex w-64 bg-sidebar text-white min-h-screen flex-col sticky top-0">
      <div className="px-6 py-6">
        <div className="h-10 w-10 rounded-lg bg-primary-500 flex items-center justify-center font-semibold">T</div>
      </div>
      <nav className="mt-2">
        {navItems.map((item) => {
          const isActive = nav === item.key
          return (
            <button
              key={item.key}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setNav(item.key)}
            >
              <span className="inline-block h-5 w-5">
                {item.icon === 'ticket' && (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M4 7a2 2 0 012-2h12v5h-2a2 2 0 100 4h2v5H6a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
                {item.icon === 'capacity' && (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M4 18h16M4 12h12M4 6h8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
                {item.icon === 'settings' && (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M19.4 15a7.97 7.97 0 000-6M4.6 9a7.97 7.97 0 000 6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )}
              </span>
              <span>{item.label}</span>
              {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-primary-400" />}
            </button>
          )
        })}
      </nav>
      <div className="mt-auto px-6 py-6 border-t border-white/10 text-white/60 text-xs">
        Helpdesk v1.0
      </div>
    </aside>
  )
}

export default Sidebar
