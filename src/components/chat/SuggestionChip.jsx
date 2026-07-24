export default function SuggestionChip({ label, onClick }) {
  return (
    <button
      onClick={() => onClick?.(label)}
      className="whitespace-nowrap px-4 py-2.5 rounded-full border border-outline-variant bg-surface-container-lowest text-body-md text-on-surface hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shrink-0"
    >
      {label}
    </button>
  )
}
