import Card from './Card.jsx'
import Icon from './Icon.jsx'
import { classNames } from '../../utils/formatters.js'

const TONE_STYLES = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary-container/40 text-secondary',
  tertiary: 'bg-tertiary/10 text-tertiary',
  neutral: 'bg-surface-container-highest text-on-surface-variant',
}

const BADGE_TONE_STYLES = {
  positive: 'text-emerald-600 bg-emerald-50',
  primary: 'text-primary bg-primary/10',
  neutral: 'text-on-surface-variant bg-surface-variant',
}

export default function StatCard({
  icon,
  iconTone = 'primary',
  value,
  label,
  helperText,
  badge,
  badgeTone = 'positive',
  className = '',
}) {
  return (
    <Card hoverable className={classNames('p-6 flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className={classNames('w-12 h-12 rounded-xl flex items-center justify-center', TONE_STYLES[iconTone])}>
          <Icon name={icon} size={28} />
        </div>
        {badge && (
          <span
            className={classNames(
              'text-label-md font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
              BADGE_TONE_STYLES[badgeTone]
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-display-lg leading-none mb-1">{value}</h3>
      <p className="text-label-md text-on-surface-variant uppercase tracking-wide">{label}</p>
      {helperText && <p className="text-body-md text-on-surface-variant mt-1">{helperText}</p>}
    </Card>
  )
}
