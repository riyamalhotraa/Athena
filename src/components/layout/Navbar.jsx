import { useState } from 'react'
import Icon from '../ui/Icon.jsx'
import SearchBar from '../ui/SearchBar.jsx'

const DEFAULT_AVATAR =
  'https://api.dicebear.com/7.x/initials/svg?seed=Alex%20Rivera&backgroundColor=004ac6&textColor=ffffff'

export default function Navbar({ title = 'Athena Platform', searchPlaceholder = 'Search insights...' }) {
  const [query, setQuery] = useState('')

  const displayName = 'Athena'
  const displayRole = 'AI Data Scientist' 

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[280px] h-16 bg-surface/90 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-6 md:px-margin-desktop z-40">
      <div className="flex items-center gap-4 min-w-0">
        <h2 className="text-title-lg text-on-surface font-semibold truncate">{title}</h2>
      </div>

      <div className="hidden md:flex flex-1 justify-center px-8">
        <SearchBar placeholder={searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-3">
          <button className="relative text-on-surface-variant hover:text-primary transition-colors" aria-label="Notifications">
            <Icon name="notifications" size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface" />
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors" aria-label="Help">
            <Icon name="help" size={22} />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
          <div className="text-right hidden sm:block">
            <p className="text-label-md font-bold text-on-surface leading-tight">{displayName}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{displayRole}</p>
          </div>
          <img
            className="w-10 h-10 rounded-full border border-outline-variant object-cover"
            alt={`${displayName} profile`}
            src={DEFAULT_AVATAR}
          />
        </div>
      </div>
    </header>
  )
}
