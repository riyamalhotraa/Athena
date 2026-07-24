import Card from '../ui/Card.jsx'
import Icon from '../ui/Icon.jsx'
import Badge from '../ui/Badge.jsx'
import { formatDate, formatNumber } from '../../utils/formatters.js'

const STATUS_TONE = {
  Cleaned: 'success',
  Processing: 'info',
  Failed: 'error',
}

export default function DatasetCard({ dataset, onSelect }) {
  const { name, rows, columns, uploadedAt, status } = dataset

  return (
    <Card
      hoverable
      className="p-6 cursor-pointer flex flex-col gap-4"
      onClick={() => onSelect?.(dataset)}
    >
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon name="dataset" size={24} />
        </div>
        <Badge tone={STATUS_TONE[status] || 'neutral'}>{status}</Badge>
      </div>
      <div>
        <h4 className="text-title-lg text-on-surface mb-1 truncate">{name}</h4>
        <p className="text-label-md text-on-surface-variant">
          {formatNumber(rows)} rows &middot; {formatNumber(columns)} columns
        </p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-outline-variant text-label-md text-on-surface-variant">
        <span>Uploaded {formatDate(uploadedAt)}</span>
        <Icon name="chevron_right" size={18} />
      </div>
    </Card>
  )
}
