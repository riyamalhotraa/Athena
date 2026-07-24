export default function ActivityFeedItem({ title, description, time, isLast = false }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
        {!isLast && <span className="w-px flex-1 bg-outline-variant mt-1" />}
      </div>
      <div className="pb-5">
        <p className="text-body-md font-semibold text-on-surface">{title}</p>
        <p className="text-body-md text-on-surface-variant">{description}</p>
        <p className="text-label-md text-on-surface-variant/70 mt-1">{time}</p>
      </div>
    </div>
  )
}
