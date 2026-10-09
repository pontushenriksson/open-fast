import type { CSSProperties, ReactNode } from 'react'
import { PHASES } from '../content/phases'
import { useI18n } from '../i18n'

interface Props {
  /** 0 → 1, can exceed 1 when past the goal. */
  progress: number
  goalHours: number
  active: boolean
  children: ReactNode
}

// SVG geometry (viewBox 0 0 300 300). The ring itself is drawn with CSS
// conic gradients (see .dial-ring in components.css) for a true angular gradient.
const C = 150
const R = 128
const STROKE = 14
const MIN_TICK_GAP_DEG = 22

function polar(deg: number, r = R) {
  const a = ((deg - 90) * Math.PI) / 180
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) }
}

/** Phase markers around the ring, skipping ones that would be too close together. */
function phaseTicks(goalHours: number, progressDeg: number, active: boolean) {
  const ticks: { deg: number; label: string; passed: boolean }[] = []
  let last = -Infinity
  for (const phase of PHASES) {
    if (phase.from <= 0 || phase.from >= goalHours) continue
    const deg = (phase.from / goalHours) * 360
    if (deg - last < MIN_TICK_GAP_DEG || deg > 345) continue
    last = deg
    ticks.push({ deg, label: `${phase.from}h`, passed: active && progressDeg >= deg })
  }
  return ticks
}

export function Dial({ progress, goalHours, active, children }: Props) {
  const { ui } = useI18n()
  const clamped = Math.max(0, Math.min(progress, 1))
  const deg = clamped * 360
  const tip = polar(deg)
  const overtime = Math.max(0, progress - 1)
  const overR = R - 20
  const overLen = 2 * Math.PI * overR
  const showArc = active && clamped > 0

  return (
    <div className="dial-wrap">
      <div className="dial-ring dial-track" />
      {showArc && <div className="dial-ring dial-arc" style={{ '--deg': `${deg}deg` } as CSSProperties} />}

      <svg className="dial" viewBox="0 0 300 300" role="img" aria-label={ui.timer.percentLabel(Math.round(progress * 100))}>
        {Array.from({ length: 72 }, (_, i) => {
          const major = i % 6 === 0
          const a = polar(i * 5, R + 18)
          const b = polar(i * 5, R + (major ? 13 : 15.5))
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--line-2)" strokeWidth={major ? 1.6 : 1} />
        })}

        {!active && (
          <circle
            className="idle-breathe"
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="var(--moon)"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        )}

        {phaseTicks(goalHours, deg, active).map((t) => {
          const dot = polar(t.deg)
          const label = polar(t.deg, R - 24)
          return (
            <g key={t.deg}>
              <circle cx={dot.x} cy={dot.y} r={2.6} fill={t.passed ? 'var(--bg)' : 'var(--faint)'} opacity={t.passed ? 0.7 : 1} />
              <text x={label.x} y={label.y} className="dial-tick" fill={t.passed ? 'var(--muted)' : 'var(--faint)'}>
                {t.label}
              </text>
            </g>
          )
        })}

        {overtime > 0 && (
          <circle
            cx={C}
            cy={C}
            r={overR}
            fill="none"
            stroke="var(--sun)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${overLen * Math.min(overtime, 0.999)} ${overLen}`}
            transform={`rotate(-90 ${C} ${C})`}
            opacity="0.85"
          />
        )}

        {showArc && (
          <>
            <circle cx={C} cy={C - R} r={STROKE / 2} fill="var(--moon)" />
            <g className="orb">
              <circle cx={tip.x} cy={tip.y} r={STROKE / 2 + 2} fill="var(--sun)" />
              <circle cx={tip.x} cy={tip.y} r={3} fill="#fff" />
            </g>
          </>
        )}
      </svg>
      <div className="dial-center">{children}</div>
    </div>
  )
}
