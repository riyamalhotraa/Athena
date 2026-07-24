import Select from '../ui/Select.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'

export default function FilterBar({ onRefresh }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 bg-surface-container-lowest border border-outline-variant rounded-card p-5">
      <Select label="Chart Type" defaultValue="all" containerClassName="flex-1">
        <option value="all">All Types</option>
        <option value="distribution">Distribution</option>
        <option value="correlation">Correlation</option>
        <option value="trend">Trend</option>
      </Select>
      <Select label="Feature" defaultValue="revenue" containerClassName="flex-1">
        <option value="revenue">Total Revenue</option>
        <option value="sessions">Session Duration</option>
        <option value="signups">Signups</option>
      </Select>
      <Select label="Target Variable" defaultValue="retention" containerClassName="flex-1">
        <option value="retention">Customer Retention</option>
        <option value="churn">Churn Probability</option>
      </Select>
      <div className="flex items-center gap-2">
        <Button variant="primary" icon="refresh" onClick={onRefresh}>
          Refresh Data
        </Button>
        <button
          className="w-11 h-11 flex items-center justify-center rounded-xl border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
          aria-label="More filters"
        >
          <Icon name="tune" size={20} />
        </button>
      </div>
    </div>
  )
}
