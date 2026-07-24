import { classNames } from '../../utils/formatters.js'

export default function Select({ label, id, className = '', containerClassName = '', children, ...rest }) {
  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className="block text-label-md text-on-surface-variant mb-1.5 font-semibold uppercase">
          {label}
        </label>
      )}
      <select
        id={id}
        className={classNames(
          'w-full px-3.5 py-2.5 bg-white border border-outline-variant rounded-lg text-body-md outline-none transition-all',
          'focus:border-primary focus:ring-2 focus:ring-primary/15',
          className
        )}
        {...rest}
      >
        {children}
      </select>
    </div>
  )
}
