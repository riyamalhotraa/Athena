import Icon from './Icon.jsx'
import Button from './Button.jsx'

export default function EmptyState({
  icon = 'inbox',
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
        <Icon name={icon} size={32} className="text-primary" />
      </div>
      <h3 className="text-title-lg text-on-surface mb-1">{title}</h3>
      {description && <p className="text-body-md text-on-surface-variant max-w-sm mb-6">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
