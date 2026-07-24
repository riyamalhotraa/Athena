import { classNames } from '../../utils/formatters.js'

/**
 * Base surface used by every panel in the app. Keeping padding, radius,
 * border, and shadow here is what makes cards feel identical across pages
 * that were originally designed independently.
 */
export default function Card({ children, className = '', hoverable = false, as: Component = 'div', ...rest }) {
  return (
    <Component
      className={classNames(
        'bg-surface-container-lowest border border-outline-variant rounded-card shadow-card',
        hoverable && 'transition-all hover:shadow-card-hover hover:border-primary/30',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
