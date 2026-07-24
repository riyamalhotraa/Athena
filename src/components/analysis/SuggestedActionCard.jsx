import Icon from '../ui/Icon.jsx'

export default function SuggestedActionCard({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 transition-all text-left"
    >
      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface-variant">
        <Icon name={icon} size={20} />
      </div>
      <div>
        <p className="text-body-md font-semibold text-on-surface">{title}</p>
        <p className="text-label-md text-on-surface-variant mt-0.5">{description}</p>
      </div>
    </button>
  )
}
