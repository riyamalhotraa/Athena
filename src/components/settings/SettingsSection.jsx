import Card from '../ui/Card.jsx'
import Icon from '../ui/Icon.jsx'
import { classNames } from '../../utils/formatters.js'

export default function SettingsSection({ icon, iconTone = 'text-primary', title, children, danger = false }) {
  return (
    <Card className={classNames('p-6 flex flex-col gap-5 h-full', danger && 'bg-error-container/20 border-error/30')}>
      <div className="flex items-center gap-2.5">
        <Icon name={icon} size={22} className={danger ? 'text-error' : iconTone} />
        <h3 className={classNames('text-title-lg', danger ? 'text-error' : 'text-on-surface')}>{title}</h3>
      </div>
      {children}
    </Card>
  )
}
