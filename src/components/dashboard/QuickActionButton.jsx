import Icon from '../ui/Icon.jsx'
import { classNames } from '../../utils/formatters.js'

export default function QuickActionButton({ icon, label, primary = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex items-center justify-center gap-2 px-5 py-4 rounded-xl border transition-all font-semibold text-body-md',
        primary
          ? 'bg-primary text-on-primary border-primary hover:bg-[#003ea8] shadow-card hover:shadow-card-hover'
          : 'bg-surface-container-lowest text-on-surface border-outline-variant hover:border-primary hover:text-primary shadow-card'
      )}
    >
      <Icon name={icon} size={20} />
      {label}
    </button>
  )
}
