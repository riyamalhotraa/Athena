import { classNames } from '../../utils/formatters.js'

/**
 * Thin wrapper around Google's Material Symbols Outlined font.
 * Centralizing this means every icon in the app shares the same
 * sizing scale and fill behavior.
 */
export default function Icon({ name, size = 24, filled = false, className = '' }) {
  return (
    <span
      className={classNames('material-symbols-outlined', filled && 'filled', className)}
      style={{ fontSize: size, width: size, height: size, lineHeight: `${size}px` }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
