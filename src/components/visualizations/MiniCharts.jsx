// Lightweight, dependency-free SVG chart placeholders that visually match
// the Stitch visualization mockups. Swap the static paths/values for real
// data once the backend endpoints (/visualizations/generate) are wired up.

export function BarDistributionChart() {
  const heights = [30, 55, 75, 100, 70, 40]
  return (
    <svg viewBox="0 0 240 100" className="w-full h-full">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 40 + 8}
          y={100 - h}
          width="24"
          height={h}
          rx="3"
          className={i === 3 ? 'fill-primary' : 'fill-primary/30'}
        />
      ))}
    </svg>
  )
}

export function CorrelationMatrixChart() {
  const grid = [
    [0.9, 0.6, 0.3, 0.2],
    [0.5, 0.85, 0.35, 0.25],
    [0.3, 0.4, 0.8, 0.55],
    [0.2, 0.3, 0.6, 0.95],
  ]
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {grid.map((row, r) =>
        row.map((v, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * 50}
            y={r * 25}
            width="48"
            height="23"
            rx="2"
            fill="#004ac6"
            opacity={v}
          />
        ))
      )}
    </svg>
  )
}

export function ScatterChart() {
  const points = [
    [20, 30],
    [45, 50],
    [70, 25],
    [95, 60],
    [120, 40],
    [150, 70],
    [175, 45],
  ]
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <line x1="0" y1="90" x2="200" y2="90" stroke="#c3c6d7" strokeWidth="1" />
      <line x1="10" y1="0" x2="10" y2="100" stroke="#c3c6d7" strokeWidth="1" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className={i % 3 === 0 ? 'fill-primary/40' : 'fill-primary'} />
      ))}
    </svg>
  )
}

export function BoxPlotChart() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {[50, 140].map((cx, i) => (
        <g key={i}>
          <line x1={cx} y1="5" x2={cx} y2="30" stroke="#737686" strokeWidth="1.5" />
          <rect
            x={cx - 20}
            y="30"
            width="40"
            height="35"
            className={i === 0 ? 'fill-primary/20 stroke-primary' : 'fill-surface-variant stroke-outline'}
            strokeWidth="1.5"
          />
          <line x1={cx - 20} y1="48" x2={cx + 20} y2="48" className={i === 0 ? 'stroke-primary' : 'stroke-outline'} strokeWidth="1.5" />
          <line x1={cx} y1="65" x2={cx} y2="90" stroke="#737686" strokeWidth="1.5" />
          {i === 0 && <circle cx={cx} cy="95" r="3" fill="#ba1a1a" />}
        </g>
      ))}
    </svg>
  )
}

export function CategoricalBarChart() {
  const bars = [
    { label: '75%', width: 75 },
    { label: '50%', width: 50 },
    { label: '90%', width: 90 },
    { label: '30%', width: 30 },
  ]
  return (
    <div className="w-full flex flex-col gap-3 justify-center px-2">
      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex-1 h-4 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className={i % 2 === 0 ? 'h-full bg-primary rounded-full' : 'h-full bg-primary/40 rounded-full'}
              style={{ width: `${bar.width}%` }}
            />
          </div>
          <span className="text-label-md text-on-surface-variant w-10">{bar.label}</span>
        </div>
      ))}
    </div>
  )
}

export function DonutChart({ percentage = 65 }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="#e1e3e4" strokeWidth="10" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#004ac6"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="55" textAnchor="middle" className="fill-on-surface font-bold" style={{ fontSize: 20 }}>
        {percentage}%
      </text>
    </svg>
  )
}

export function AreaTrendChart() {
  return (
    <svg viewBox="0 0 240 100" className="w-full h-full">
      <path
        d="M0,70 C30,40 50,80 80,50 C110,20 140,60 170,45 C200,30 220,55 240,20"
        fill="none"
        stroke="#004ac6"
        strokeWidth="2.5"
      />
      <path
        d="M0,70 C30,40 50,80 80,50 C110,20 140,60 170,45 C200,30 220,55 240,20 L240,100 L0,100 Z"
        fill="#004ac6"
        opacity="0.1"
      />
    </svg>
  )
}

export function DensityCurveChart() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <line x1="100" y1="5" x2="100" y2="95" stroke="#c3c6d7" strokeDasharray="4 3" strokeWidth="1" />
      <path d="M10,90 Q100,-10 190,90" fill="none" stroke="#004ac6" strokeDasharray="5 4" strokeWidth="2" />
    </svg>
  )
}
