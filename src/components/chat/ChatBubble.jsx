import Icon from '../ui/Icon.jsx'
import { classNames } from '../../utils/formatters.js'

const USER_AVATAR = 'https://api.dicebear.com/7.x/initials/svg?seed=Alex%20Rivera&backgroundColor=d0e1fb&textColor=191c1d'

export default function ChatBubble({ role = 'assistant', content, timestamp, algorithmTag, children }) {
  const isUser = role === 'user'

  return (
    <div className={classNames('flex items-start gap-3 max-w-[85%]', isUser ? 'ml-auto flex-row-reverse' : '')}>
      {isUser ? (
        <img src={USER_AVATAR} alt="You" className="w-9 h-9 rounded-full shrink-0 mt-1" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
          <Icon name="smart_toy" size={18} className="text-on-primary" filled />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <div
          className={classNames(
            'rounded-2xl px-5 py-4 text-body-md',
            isUser ? 'bg-primary text-on-primary rounded-tr-sm' : 'bg-surface-container-low text-on-surface rounded-tl-sm'
          )}
        >
          {algorithmTag && (
            <span className="inline-flex items-center gap-1.5 text-label-md font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
              <Icon name="hub" size={14} />
              {algorithmTag}
            </span>
          )}
          {content && <p className="whitespace-pre-line leading-relaxed">{content}</p>}
          {children}
        </div>
        {timestamp && (
          <span className={classNames('text-label-md text-on-surface-variant', isUser ? 'text-right' : '')}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  )
}
