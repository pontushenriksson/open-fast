import { useState } from 'react'
import { goalHoursFor } from '../../content/plans'
import { ENERGY_SOURCES } from '../../content/research'
import { useEnergy } from '../../hooks/useEnergy'
import { useI18n } from '../../i18n'
import { ESTIMATE_HOURS, KCAL_PER_KG_FAT, estimateFast } from '../../lib/energy'
import { useStore } from '../../lib/store'

const DEFAULT_DEFICIT = 300
const MIN_DEFICIT = 100
const MAX_DEFICIT = 1000

/** Energy/weight estimates per fast length, expected loss over time, and how to read them. */
export function Estimates({ openSettings }: { openSettings: () => void }) {
  const { ui, f } = useI18n()
  const { settings } = useStore()
  const { kcalPerDay, personalized } = useEnergy()
  const units = settings.units

  const [deficit, setDeficit] = useState(DEFAULT_DEFICIT)
  const planHours = goalHoursFor(settings.planId, settings.customHours)
  const lossPerDayKg = deficit / KCAL_PER_KG_FAT
  const projections: [string, number][] = [
    [ui.estimates.perWeek, 7],
    [ui.estimates.perMonth, 30.4],
    [ui.estimates.per3Months, 91.3],
  ]

  return (
    <>
      <p className="muted small mb-4">{ui.estimates.intro}</p>

      <div className="card energy-hero">
        <div className="eyebrow">{ui.estimates.yourEnergy}</div>
        <div className="row baseline gap-2 mt-1">
          <span className="num big-number">{f.kcal(kcalPerDay)}</span>
          <span className="muted">{ui.estimates.perDay}</span>
        </div>
        <p className="tiny muted mt-2">
          {personalized ? ui.energy.basedOnProfile(f.kcal(kcalPerDay)) : ui.energy.basedOnDefault(f.kcal(kcalPerDay))}
        </p>
        <button className="btn btn-ghost btn-sm mt-3" onClick={openSettings}>
          {ui.energy.personalize}
        </button>
      </div>

      <div className="card mt-3 table-card">
        <table className="table">
          <thead>
            <tr>
              <th>{ui.estimates.duration}</th>
              <th>{ui.estimates.energy}</th>
              <th>{ui.estimates.fat}</th>
              <th>{ui.estimates.scale}</th>
            </tr>
          </thead>
          <tbody>
            {ESTIMATE_HOURS.map((h) => {
              const e = estimateFast(h, kcalPerDay)
              return (
                <tr key={h} className={h === planHours ? 'highlight' : ''}>
                  <td className="num">{h} h</td>
                  <td>{f.kcal(e.kcal)}</td>
                  <td>{f.smallWeight(e.fatKg, units)}</td>
                  <td>{f.weightRange(e.scaleKg[0], e.scaleKg[1], units)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="section-label">{ui.estimates.expectTitle}</div>
      <div className="card">
        <p className="small muted">{ui.estimates.expectText}</p>
        <label className="field mt-4">
          <span>{ui.estimates.deficitLabel(f.kcal(deficit))}</span>
          <input
            type="range"
            min={MIN_DEFICIT}
            max={MAX_DEFICIT}
            step={50}
            value={deficit}
            onChange={(e) => setDeficit(Number(e.target.value))}
          />
        </label>
        <div className="energy-grid mt-3">
          {projections.map(([label, days]) => (
            <div key={label}>
              <div className="num energy-value">{f.smallWeight(lossPerDayKg * days, units)}</div>
              <div className="tiny muted">{label}</div>
            </div>
          ))}
        </div>
        <p className="tiny muted mt-3">{ui.estimates.expectNote}</p>
      </div>

      <div className="stack mt-4">
        {[
          [ui.estimates.compensateTitle, ui.estimates.compensateText],
          [ui.estimates.whyTitle, ui.estimates.whyText],
          [ui.estimates.ruleTitle, ui.estimates.ruleText],
        ].map(([title, text]) => (
          <div key={title} className="card">
            <h3 className="card-title">{title}</h3>
            <p className="small muted mt-1">{text}</p>
          </div>
        ))}
      </div>

      <div className="section-label">{ui.estimates.sources}</div>
      <ul className="list sources">
        {ENERGY_SOURCES.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer noopener">
              {s.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
