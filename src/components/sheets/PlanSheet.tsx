import { CUSTOM_PLAN_ID, TIMER_PLANS } from '../../content/plans'
import { useI18n } from '../../i18n'
import { actions, useStore } from '../../lib/store'
import { LevelBadge } from '../LevelBadge'
import { Sheet } from '../Sheet'

const MAX_CUSTOM_HOURS = 72
const LONG_FAST_HOURS = 24

/** Choose the timer goal. Updates the running fast as well. */
export function PlanSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { ui, plans } = useI18n()
  const { settings, active } = useStore()

  const choose = (planId: string, hours: number) => {
    actions.setSettings({ planId })
    if (active) actions.updateActive({ planId, goalHours: hours })
  }

  const setCustomHours = (hours: number) => {
    actions.setSettings({ customHours: hours, planId: CUSTOM_PLAN_ID })
    if (active) actions.updateActive({ planId: CUSTOM_PLAN_ID, goalHours: hours })
  }

  return (
    <Sheet open={open} onClose={onClose} title={ui.plan.title}>
      {active && <p className="small muted mb-3">{ui.plan.activeUpdates}</p>}
      <div role="radiogroup">
        {TIMER_PLANS.map((p) => (
          <button
            key={p.id}
            className="option"
            role="radio"
            aria-checked={settings.planId === p.id}
            onClick={() => {
              choose(p.id, p.fastHours!)
              onClose()
            }}
          >
            <span className="option-num">{p.fastHours} h</span>
            <span className="grow">
              <span className="block strong">{plans[p.id].name}</span>
              <span className="small muted">{plans[p.id].tagline}</span>
            </span>
            <LevelBadge level={p.level} />
          </button>
        ))}

        <div className="option block" role="radio" aria-checked={settings.planId === CUSTOM_PLAN_ID}>
          <button className="row full text-left" onClick={() => choose(CUSTOM_PLAN_ID, settings.customHours)}>
            <span className="option-num">{settings.customHours} h</span>
            <span className="grow strong">{ui.plan.custom}</span>
          </button>
          <input
            type="range"
            min={1}
            max={MAX_CUSTOM_HOURS}
            step={1}
            value={settings.customHours}
            aria-label={ui.plan.hoursLabel}
            onChange={(e) => setCustomHours(Number(e.target.value))}
          />
          {settings.customHours > LONG_FAST_HOURS && <p className="tiny text-bad mt-1">{ui.plan.longWarning}</p>}
        </div>
      </div>
      <p className="tiny muted mt-4">{ui.plan.weeklyNote}</p>
    </Sheet>
  )
}
