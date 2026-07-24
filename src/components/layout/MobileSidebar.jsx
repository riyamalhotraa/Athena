import { NavLink } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { NAV_ITEMS, SETTINGS_ITEM } from './navConfig.js'
import { classNames } from '../../utils/formatters.js'

function NavItem({ to, label, icon, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        classNames(
          'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors duration-200 text-label-md',
          isActive
            ? 'bg-secondary-container text-on-secondary-container font-semibold'
            : 'text-on-surface-variant hover:bg-surface-container-high'
        )
      }
    >
      <Icon name={icon} size={22} />
      <span>{label}</span>
    </NavLink>
  )
}

export default function MobileSidebar({ isOpen, onClose }) {
  return (
    <div
      className={classNames(
        'md:hidden fixed inset-0 z-[60] transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="absolute inset-0 bg-on-surface/40" onClick={onClose} aria-hidden="true" />
      <aside
        className={classNames(
          'absolute left-0 top-0 h-full w-[280px] bg-surface-container-lowest border-r border-outline-variant flex flex-col py-stack-md transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="px-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
              <Icon name="smart_toy" size={24} filled />
            </div>
            <div>
              <h1 className="text-headline-md font-bold text-primary leading-tight">Athena</h1>
              <p className="text-label-md text-on-surface-variant">AI Data Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="text-on-surface-variant" aria-label="Close navigation">
            <Icon name="close" size={22} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} onNavigate={onClose} />
          ))}
        </nav>
        <div className="border-t border-outline-variant pt-2">
          <NavItem {...SETTINGS_ITEM} onNavigate={onClose} />
        </div>
      </aside>
    </div>
  )
}
