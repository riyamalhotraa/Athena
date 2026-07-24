export default function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md mb-stack-lg">
      <div>
        <h1 className="text-headline-lg text-on-surface mb-1">{title}</h1>
        {description && <p className="text-body-lg text-on-surface-variant max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  )
}
