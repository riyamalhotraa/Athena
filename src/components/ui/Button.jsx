import { classNames } from '../../utils/formatters.js'
import Icon from './Icon.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

const VARIANT_STYLES = {
  primary:
    'bg-primary text-on-primary hover:bg-[#003ea8] shadow-card hover:shadow-card-hover',
  secondary:
    'bg-white border border-outline-variant text-on-surface hover:bg-surface-container-low shadow-card',
  ghost: 'text-on-surface-variant hover:bg-surface-container-high',
  danger: 'border border-error text-error hover:bg-error hover:text-white',
  link: 'text-primary hover:underline p-0',
}

const SIZE_STYLES = {
  sm: 'px-4 py-2 text-label-md rounded-lg gap-1.5',
  md: 'px-6 py-3 text-body-md font-semibold rounded-xl gap-2',
  lg: 'px-8 py-3.5 text-body-lg font-semibold rounded-xl gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={classNames(
        'inline-flex items-center justify-center transition-all active:scale-95',
        VARIANT_STYLES[variant],
        variant !== 'link' && SIZE_STYLES[size],
        isDisabled && 'opacity-60 cursor-not-allowed active:scale-100',
        className
      )}
      {...rest}
    >
      {isLoading && <LoadingSpinner size="sm" className="mr-1" />}
      {!isLoading && icon && iconPosition === 'left' && <Icon name={icon} size={18} />}
      {children}
      {!isLoading && icon && iconPosition === 'right' && <Icon name={icon} size={18} />}
    </button>
  )
}
