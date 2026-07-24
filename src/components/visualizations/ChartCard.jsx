import Card from '../ui/Card.jsx'
import Icon from '../ui/Icon.jsx'

export default function ChartCard({ title, description, children, onDownload, onExpand }) {
  return (
    <Card hoverable className="p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-title-lg text-on-surface">{title}</h4>
          <p className="text-label-md text-on-surface-variant mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant shrink-0">
          <button onClick={onDownload} aria-label="Download chart" className="hover:text-primary transition-colors">
            <Icon name="download" size={18} />
          </button>
          <button onClick={onExpand} aria-label="Expand chart" className="hover:text-primary transition-colors">
            <Icon name="fullscreen" size={18} />
          </button>
        </div>
      </div>
      <div className="h-44 rounded-xl bg-surface-container-lowest flex items-center justify-center">{children}</div>
    </Card>
  )
}
