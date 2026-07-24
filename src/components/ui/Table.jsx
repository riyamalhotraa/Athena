import { classNames } from '../../utils/formatters.js'
import EmptyState from './EmptyState.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

/**
 * Generic data table. Columns: [{ key, header, render?, align? }]
 * `render(row)` lets callers inject badges, buttons, etc. per-cell.
 */
export default function Table({ columns, data, isLoading = false, emptyMessage = 'No records found.' }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return <EmptyState icon="table_rows" title="No data" description={emptyMessage} />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low">
            {columns.map((col) => (
              <th
                key={col.key}
                className={classNames(
                  'px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase whitespace-nowrap',
                  col.align === 'right' && 'text-right'
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {data.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex} className="hover:bg-surface-container-low transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={classNames('px-6 py-4 text-body-md', col.align === 'right' && 'text-right')}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
