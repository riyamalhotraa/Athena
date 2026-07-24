import { classNames } from '../../utils/formatters.js'

const SIZE_MAP = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
}

export default function LoadingSpinner({ size = 'md', className = '' }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={classNames(
        'rounded-full border-primary/20 border-t-primary animate-spin',
        SIZE_MAP[size],
        className
      )}
    />
  )
}
