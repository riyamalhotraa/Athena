import { classNames } from '../../utils/formatters.js'

const TONE_STYLES = {
  success: 'bg-emerald-100 text-emerald-700',
  info: 'bg-primary/10 text-primary',
  warning: 'bg-tertiary/10 text-tertiary',
  neutral: 'bg-surface-variant text-on-surface-variant',
  error: 'bg-error-container text-on-error-container',
}

export default function Badge({ children, tone = 'neutral', dot = false, className = '' }) {
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-md font-medium',
        TONE_STYLES[tone],
        className
      )}
    >
      {dot && <span className={classNames('w-1.5 h-1.5 rounded-full', TONE_STYLES[tone].split(' ')[1])} />}
      {children}
    </span>
  )
}
