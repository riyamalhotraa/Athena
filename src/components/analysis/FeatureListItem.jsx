import Icon from "../ui/Icon.jsx";

export default function FeatureListItem({
  name,
  type,
  icon,
  onClick,
  selected,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left
      ${
        selected
          ? "bg-primary/10 border border-primary"
          : "hover:bg-surface-container-low"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0
        ${
          selected
            ? "bg-primary text-white"
            : "bg-primary/10 text-primary"
        }`}
      >
        <Icon name={icon} size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-body-md font-semibold truncate">
          {name}
        </p>

        <p className="text-label-md text-on-surface-variant">
          {type}
        </p>
      </div>

      <Icon
        name="chevron_right"
        size={18}
        className={
          selected
            ? "text-primary"
            : "text-on-surface-variant"
        }
      />
    </button>
  );
}