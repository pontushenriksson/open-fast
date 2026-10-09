import { useI18n } from '../../i18n'
import type { WeightEntry } from '../../lib/store'
import { fromDateKey } from '../../lib/time'

const W = 320
const H = 110

/** Line chart of logged weights. Renders nothing with fewer than two points. */
export function WeightChart({ data }: { data: WeightEntry[] }) {
  const { ui, f } = useI18n()
  if (data.length < 2) return null

  const min = Math.min(...data.map((d) => d.kg)) - 0.5
  const max = Math.max(...data.map((d) => d.kg)) + 0.5
  const t0 = fromDateKey(data[0].date).getTime()
  const t1 = fromDateKey(data[data.length - 1].date).getTime()
  const points = data.map((d) => {
    const x = 6 + ((fromDateKey(d.date).getTime() - t0) / Math.max(t1 - t0, 1)) * (W - 12)
    const y = 8 + (1 - (d.kg - min) / (max - min)) * (H - 24)
    return [x, y] as const
  })
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${points[points.length - 1][0]},${H - 16} L${points[0][0]},${H - 16} Z`

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ui.progress.weightChartLabel}>
      <path d={area} fill="var(--moon)" opacity="0.12" />
      <path d={line} fill="none" stroke="var(--moon)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map(([x, y], i) => {
        const last = i === points.length - 1
        return <circle key={i} cx={x} cy={y} r={last ? 4.5 : 2.5} fill={last ? 'var(--dawn)' : 'var(--moon)'} />
      })}
      <text x={6} y={H - 2}>
        {f.shortDate(fromDateKey(data[0].date))}
      </text>
      <text x={W - 6} y={H - 2} textAnchor="end">
        {f.shortDate(fromDateKey(data[data.length - 1].date))}
      </text>
    </svg>
  )
}
