import { useEnergy } from '../hooks/useEnergy'
import { useI18n } from '../i18n'
import { estimateFast } from '../lib/energy'
import { useStore } from '../lib/store'
import { HOUR } from '../lib/time'

interface Props {
  /** Hours fasted so far; undefined when no fast is running. */
  elapsedHours?: number
  goalHours: number
  onPersonalize: () => void
  onLearnMore: () => void
}

/** Estimated energy used, fat equivalent and typical scale change for the current (or planned) fast. */
export function EnergyCard({ elapsedHours, goalHours, onPersonalize, onLearnMore }: Props) {
  const { ui, f } = useI18n()
  const { settings } = useStore()
  const { kcalPerDay, personalized } = useEnergy()
  const units = settings.units
  const active = elapsedHours != null
  const hours = active ? elapsedHours : goalHours
  const now = estimateFast(hours, kcalPerDay)
  const atGoal = estimateFast(goalHours, kcalPerDay)

  return (
    <div className="card energy-card">
      <div className="row between">
        <div className="eyebrow">{active ? ui.energy.title : ui.energy.titleIdle(goalHours)}</div>
        <button className="link-btn" onClick={onPersonalize}>
          {ui.energy.personalize}
        </button>
      </div>
      <div className="energy-grid mt-2">
        <div>
          <div className="num energy-value">{f.kcal(now.kcal)}</div>
          <div className="tiny muted">{ui.energy.used}</div>
        </div>
        <div>
          <div className="num energy-value">{f.smallWeight(now.fatKg, units)}</div>
          <div className="tiny muted">{ui.energy.fat}</div>
        </div>
        <div>
          <div className="num energy-value">{f.weightRange(now.scaleKg[0], now.scaleKg[1], units)}</div>
          <div className="tiny muted">{ui.energy.scale}</div>
        </div>
      </div>
      {active && elapsedHours * HOUR < goalHours * HOUR && (
        <p className="small mt-3">{ui.energy.atGoal(`${f.kcal(atGoal.kcal)} · ${f.smallWeight(atGoal.fatKg, units)}`)}</p>
      )}
      <p className="tiny muted mt-2">
        {personalized ? ui.energy.basedOnProfile(f.kcal(kcalPerDay)) : ui.energy.basedOnDefault(f.kcal(kcalPerDay))}{' '}
        {ui.energy.footnote}{' '}
        <button className="link-btn inline" onClick={onLearnMore}>
          {ui.energy.howCalculated}
        </button>
      </p>
    </div>
  )
}
