import { NavLink } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { NAV_ITEMS, SETTINGS_ITEM } from './navConfig.js'
import { classNames } from '../../utils/formatters.js'

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        classNames(
          'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors duration-200 group text-label-md',
          isActive
            ? 'bg-secondary-container text-on-secondary-container border-l-4 border-primary -ml-0.5 font-semibold'
            : 'text-on-surface-variant hover:bg-surface-container-high border-l-4 border-transparent'
        )
      }
    >
      <Icon name={icon} size={22} />
      <span>{label}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-lowest border-r border-outline-variant shadow-sm z-50 flex flex-col py-stack-md">
      {/* Brand */}
      <div className="px-6 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary shrink-0">
          <Icon name="smart_toy" size={24} filled />
        </div>
        <div>
          <h1 className="text-headline-md font-bold text-primary leading-tight">Athena</h1>
          <p className="text-label-md text-on-surface-variant">AI Data Platform</p>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Settings + user */}
      <div className="border-t border-outline-variant pt-2">
        <NavItem {...SETTINGS_ITEM} />
      </div>
    </aside>
  )
}
