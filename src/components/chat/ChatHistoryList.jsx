import { classNames } from '../../utils/formatters.js'

export default function ChatHistoryList({ items, activeId, onSelect }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect?.(item.id)}
          className={classNames(
            'text-left px-4 py-3 rounded-xl transition-colors',
            activeId === item.id ? 'bg-secondary-container' : 'hover:bg-surface-container-low'
          )}
        >
          <p className="text-body-md font-semibold text-on-surface truncate">{item.title}</p>
          <p className="text-label-md text-on-surface-variant mt-0.5">{item.timestamp}</p>
        </button>
      ))}
    </div>
  )
}
