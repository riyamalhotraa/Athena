import Toggle from '../ui/Toggle.jsx'
import Icon from '../ui/Icon.jsx'

export default function ToggleRow({ id, icon, title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-outline-variant">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
            <Icon name={icon} size={18} />
          </div>
        )}
        <div>
          <p className="text-body-md font-semibold text-on-surface">{title}</p>
          {description && <p className="text-label-md text-on-surface-variant">{description}</p>}
        </div>
      </div>
      <Toggle id={id} checked={checked} onChange={onChange} />
    </div>
  )
}
