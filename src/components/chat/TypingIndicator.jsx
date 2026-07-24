import Icon from '../ui/Icon.jsx'

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
        <Icon name="smart_toy" size={18} className="text-on-primary" filled />
      </div>
      <div className="bg-surface-container-low rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 rounded-full bg-on-surface-variant/50" />
        <span className="typing-dot w-2 h-2 rounded-full bg-on-surface-variant/50" />
        <span className="typing-dot w-2 h-2 rounded-full bg-on-surface-variant/50" />
      </div>
    </div>
  )
}
