import Icon from './Icon.jsx'
import { classNames } from '../../utils/formatters.js'

/**
 * Standardized search input. Every page previously shipped its own
 * width (w-64, w-72, max-w-md...) — this component fixes that at 320px
 * while still allowing a page to stretch it via `className`.
 */
export default function SearchBar({ placeholder = 'Search...', value, onChange, className = '' }) {
  return (
    <div
      className={classNames(
        'flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant w-full max-w-[320px] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all',
        className
      )}
    >
      <Icon name="search" size={18} className="text-on-surface-variant shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent border-none focus:ring-0 outline-none text-body-md w-full p-0 placeholder:text-on-surface-variant/70"
      />
    </div>
  )
}
