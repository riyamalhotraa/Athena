import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'
import { classNames } from '../../utils/formatters.js'

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClass = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }[size]

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-fade-in-up"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={classNames(
          'relative w-full bg-surface-container-lowest rounded-card shadow-card-hover animate-fade-in-up',
          sizeClass
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
          <h3 className="text-title-lg text-on-surface">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors"
            aria-label="Close"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
        {footer && <div className="flex justify-end gap-3 px-6 py-4 border-t border-outline-variant">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}
