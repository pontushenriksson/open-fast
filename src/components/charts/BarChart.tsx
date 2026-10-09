import { useI18n } from '../../i18n'
import type { DayHours } from '../../lib/stats'

const W = 320
const H = 150
const PAD_BOTTOM = 18
const PAD_TOP = 8

/** Fasting hours per day with a dashed goal line. */
export function BarChart({ data, goal }: { data: DayHours[]; goal: number }) {
  const { ui, f } = useI18n()
  const max = Math.max(24, ...data.map((d) => d.hours))
  const slot = (W - 8) / data.length
  const barW = slot * 0.64
  const y = (h: number) => H - PAD_BOTTOM - (h / max) * (H - PAD_BOTTOM - PAD_TOP)
  const dense = data.length > 10
  const radius = Math.min(barW / 2, 6)

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ui.progress.chartLabel}>
      <defs>
        <linearGradient id="bar-gradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--moon)" />
          <stop offset="1" stopColor="var(--dawn)" />
        </linearGradient>
      </defs>
      {[0, 12, 24].map((h) => (
        <line key={h} x1={0} x2={W} y1={y(h)} y2={y(h)} stroke="var(--line)" />
      ))}
      <line x1={0} x2={W} y1={y(goal)} y2={y(goal)} stroke="var(--sun)" strokeDasharray="4 4" opacity="0.8" />
      <text x={W} y={y(goal) - 5} textAnchor="end" className="chart-goal">
        {ui.progress.goalLine(goal)}
      </text>
      {data.map((d, i) => {
        const x = 4 + i * slot + slot * 0.18
        const top = y(Math.max(d.hours, 0))
        const showLabel = !dense || i % 5 === 4 || i === data.length - 1
        return (
          <g key={d.date.getTime()}>
            <rect x={x} y={y(max)} width={barW} height={y(0) - y(max)} rx={radius} fill="var(--line)" opacity="0.5" />
            {d.hours > 0 && <rect x={x} y={top} width={barW} height={y(0) - top} rx={radius} fill="url(#bar-gradient)" />}
            {showLabel && (
              <text x={x + barW / 2} y={H - 3} textAnchor="middle">
                {dense ? f.shortDate(d.date) : f.weekday(d.date)}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
