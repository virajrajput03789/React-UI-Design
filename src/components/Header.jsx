import SearchBar from './SearchBar'
import { useUI } from '../hooks/useUI'

function Header() {
  const { setSearch } = useUI()
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-border z-10">
      <div className="px-6 md:px-8 lg:px-10 py-3 flex items-center gap-4">
        <h1 className="text-base md:text-lg font-semibold text-text">Helpdesk</h1>
        <div className="ml-auto flex items-center gap-4">
          <SearchBar onChange={setSearch} />
          <div className="h-9 w-9 rounded-full bg-primary-100 ring-4 ring-primary-50 flex items-center justify-center text-primary-700 text-xs font-medium">
            JD
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
