export default function Toggle({ checked, onChange, id }) {
  return (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-surface-variant rounded-full peer-checked:bg-primary transition-colors duration-300" />
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-card transition-transform duration-300 peer-checked:translate-x-5" />
    </label>
  )
}
