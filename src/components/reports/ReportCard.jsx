import Card from '../ui/Card.jsx'
import Icon from '../ui/Icon.jsx'
import Badge from '../ui/Badge.jsx'
import { formatDate } from '../../utils/formatters.js'

const STATUS_TONE = {
  READY: 'info',
  GENERATING: 'neutral',
  ARCHIVED: 'neutral',
}

export default function ReportCard({ report, onView, onDownload }) {
  const { title, dataset, status, pages, date, thumbnail } = report
  const isGenerating = status === 'GENERATING'

  return (
    <Card hoverable className="overflow-hidden flex flex-col">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <Badge tone={STATUS_TONE[status] || 'neutral'}>{status}</Badge>
          <span className="text-label-md text-on-surface-variant">{pages ? `${pages} Pages` : '-- Pages'}</span>
        </div>
        <h4 className="text-title-lg text-on-surface mb-1">{title}</h4>
        <p className="text-label-md text-on-surface-variant flex items-center gap-1.5">
          <Icon name="storage" size={14} />
          {dataset}
        </p>
      </div>

      <div className="px-6">
        {isGenerating ? (
          <div className="h-40 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low flex items-center justify-center text-label-md text-on-surface-variant">
            Processing Datasets...
          </div>
        ) : (
          <div
            className="h-40 rounded-xl bg-surface-container-low bg-cover bg-center border border-outline-variant"
            style={thumbnail ? { backgroundImage: `url(${thumbnail})` } : undefined}
          />
        )}
      </div>

      <div className="mt-auto flex items-center justify-between px-6 py-4 border-t border-outline-variant mt-4">
        <span className="text-label-md text-on-surface-variant italic">
          {status === 'GENERATING' ? 'Pending' : formatDate(date)}
        </span>
        <div className="flex items-center gap-3 text-on-surface-variant">
          <button onClick={() => onView?.(report)} disabled={isGenerating} aria-label="Preview report">
            <Icon name="visibility" size={20} className={isGenerating ? 'opacity-40' : 'hover:text-primary'} />
          </button>
          <button onClick={() => onDownload?.(report)} disabled={isGenerating} aria-label="Download report">
            <Icon name="download" size={20} className={isGenerating ? 'opacity-40' : 'hover:text-primary'} />
          </button>
        </div>
      </div>
    </Card>
  )
}
