import { classNames } from '../../utils/formatters.js'

export default function QualityMetricBar({ label, value, helperText, tone = 'primary' }) {
  const barColor = tone === 'warning' ? 'bg-tertiary' : 'bg-primary'

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-body-md font-semibold text-on-surface">{label}</span>
        <span className="text-body-md font-semibold text-on-surface">{value}%</span>
      </div>
      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
        <div className={classNames('h-full rounded-full', barColor)} style={{ width: `${Math.min(value * 4, 100)}%` }} />
      </div>
      {helperText && <p className="text-label-md text-on-surface-variant mt-1.5">{helperText}</p>}
    </div>
  )
}
