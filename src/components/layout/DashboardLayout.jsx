import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'
import MobileSidebar from './MobileSidebar.jsx'
import Icon from '../ui/Icon.jsx'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/datasets': 'Datasets',
  '/analysis': 'Dataset Analysis',
  '/visualizations': 'Visualizations',
  '/chat': 'AI Chat',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

export default function DashboardLayout() {
  const location = useLocation()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const title = PAGE_TITLES[location.pathname] || 'Athena Platform'

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar (slide-over) */}
      <MobileSidebar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Mobile top bar trigger */}
      <button
        onClick={() => setIsMobileNavOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 w-10 h-10 rounded-full bg-surface-container-lowest border border-outline-variant shadow-card flex items-center justify-center text-on-surface-variant"
        aria-label="Open navigation"
      >
        <Icon name="menu" size={22} />
      </button>

      <Navbar title={title} />

      <main className="md:ml-[280px] pt-16 min-h-screen flex flex-col">
        <div className="flex-1 w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-stack-lg page-transition">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
