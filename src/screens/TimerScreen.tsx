import { useState } from 'react'
import { Dial } from '../components/Dial'
import { EnergyCard } from '../components/EnergyCard'
import { IconChevron } from '../components/Icons'
import { EndFastSheet } from '../components/sheets/EndFastSheet'
import { PhaseSheet } from '../components/sheets/PhaseSheet'
import { PlanSheet } from '../components/sheets/PlanSheet'
import { TimePickSheet } from '../components/sheets/TimePickSheet'
import { QUICK_FOOD_IDS, findFood, type Food } from '../content/foods'
import { PHASES, phaseAt, type PhaseId } from '../content/phases'
import { findPlan, goalHoursFor } from '../content/plans'
import { useNow } from '../hooks/useNow'
import { useI18n } from '../i18n'
import { downloadReminder } from '../lib/download'
import { actions, useStore } from '../lib/store'
import { HOUR, clock, dateKey } from '../lib/time'
import type { Navigate } from '../navigation'

/** Liters per glass in the water tracker. */
const GLASS_LITERS = 0.25

interface Props {
  onFood: (food: Food) => void
  navigate: Navigate
  openSettings: () => void
}

export function TimerScreen({ onFood, navigate, openSettings }: Props) {
  const { ui, plans, phases, foods, f } = useI18n()
  const { active, settings, history, water } = useStore()
  const now = useNow(1000)
  const [planOpen, setPlanOpen] = useState(false)
  const [pick, setPick] = useState<'start' | 'edit' | null>(null)
  const [endOpen, setEndOpen] = useState(false)
  const [phaseId, setPhaseId] = useState<PhaseId | null>(null)

  const goalHours = active?.goalHours ?? goalHoursFor(settings.planId, settings.customHours)
  const goalMs = goalHours * HOUR
  const elapsed = active ? now - active.start : 0
  const progress = active ? elapsed / goalMs : 0
  const remaining = goalMs - elapsed
  const reached = !!active && remaining <= 0
  const goalAt = (active?.start ?? now) + goalMs

  const planId = active?.planId ?? settings.planId
  const plan = findPlan(planId)
  const planName = plan ? plans[plan.id].name : ui.timer.customGoal(goalHours)
  const { current, next, index } = phaseAt(elapsed / HOUR)

  const last = history[0]
  const windowCloses = !active && last?.end && plan?.eatHours ? last.end + plan.eatHours * HOUR : null
  const windowOpen = windowCloses != null && windowCloses > now

  const today = dateKey(now)
  const glasses = water[today] ?? 0

  const start = (t: number) => {
    actions.startFast(t, goalHours, settings.planId)
    navigator.vibrate?.(20)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const elapsedClock = clock(elapsed)

  return (
    <div className="screen">
      <button className="plan-pill" onClick={() => setPlanOpen(true)} aria-label={ui.timer.changeGoal}>
        {planName}
        <span className="badge">{goalHours} h</span>
        <IconChevron className="chevron-down" />
      </button>

      <Dial progress={progress} goalHours={goalHours} active={!!active}>
        {active ? (
          <>
            <div className="dial-kicker">{reached ? ui.timer.goalReached : ui.timer.fastedFor}</div>
            <div className="dial-time num">
              {elapsedClock.slice(0, -3)}
              <span className="sec">{elapsedClock.slice(-3)}</span>
            </div>
            <div className="dial-sub">
              {reached ? ui.timer.overGoal : ui.timer.remaining}{' '}
              <b className="num">{reached ? `+${clock(-remaining)}` : clock(remaining)}</b>
            </div>
            <div className={`dial-percent ${reached ? 'dial-done' : ''}`}>{Math.floor(progress * 100)} %</div>
          </>
        ) : (
          <>
            <div className="dial-kicker">{ui.timer.ready}</div>
            <div className="dial-time num">
              {goalHours}
              <span className="sec"> h</span>
            </div>
            <div className="dial-sub">
              {ui.timer.ifStartNow}
              <br />
              <b>{f.when(goalAt)}</b>
            </div>
          </>
        )}
      </Dial>

      {active ? (
        <>
          {reached && <div className="goal-banner">{ui.timer.goalBanner(goalHours)}</div>}
          <div className="time-pair">
            <button className="time-box" onClick={() => setPick('edit')}>
              <div className="k">
                {ui.timer.started} <span className="edit">{ui.common.edit}</span>
              </div>
              <div className="v num">{f.time(active.start)}</div>
              <div className="tiny muted">{f.day(active.start)}</div>
            </button>
            <button className="time-box" onClick={() => setPlanOpen(true)}>
              <div className="k">
                {ui.timer.goal} <span className="edit">{ui.common.edit}</span>
              </div>
              <div className="v num">{f.time(goalAt)}</div>
              <div className="tiny muted">{f.day(goalAt)}</div>
            </button>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => setEndOpen(true)}>
            {reached ? ui.timer.endFast : ui.timer.endFastNow}
          </button>
          {!reached && (
            <div className="row center mt-1">
              <button
                className="link-btn"
                onClick={() => downloadReminder(goalAt, ui.timer.reminderTitle(goalHours), ui.timer.reminderBody)}
              >
                {ui.timer.remindCalendar}
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <button className="btn btn-primary btn-block mt-2" onClick={() => start(Date.now())}>
            {ui.timer.startNow}
          </button>
          <button className="btn btn-ghost btn-block mt-3" onClick={() => setPick('start')}>
            {ui.timer.startedEarlier}
          </button>
          {last?.end && (
            <div className="card mt-4">
              {windowOpen ? (
                <>
                  <div className="dial-kicker text-accent">{ui.timer.eatingWindowOpen}</div>
                  <div className="row between mt-1">
                    <span>
                      {ui.timer.closesIn} <b className="num">{f.duration(windowCloses! - now)}</b>
                    </span>
                    <span className="muted small">{ui.timer.at(f.time(windowCloses!))}</span>
                  </div>
                  <div className="ratio mt-3">
                    <div className="e" style={{ width: `${((now - last.end) / (plan!.eatHours! * HOUR)) * 100}%` }} />
                  </div>
                </>
              ) : (
                <div className="row between">
                  <span className="muted small">{ui.timer.lastFast}</span>
                  <span className="small">
                    <b className="num">{f.duration(last.end - last.start)}</b> · {ui.timer.ended(f.when(last.end))}
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {active ? (
        <div className="card stage-card mt-4">
          <div className="eyebrow">{ui.timer.inYourBody(current.from)}</div>
          <h3>{phases[current.id].title}</h3>
          <p className="muted small">{phases[current.id].short}</p>
          {next && (
            <p className="small mt-3">
              {ui.timer.next}: <b>{phases[next.id].title}</b> {ui.timer.inDuration(f.duration(next.from * HOUR - elapsed))}
            </p>
          )}
          <div className="stage-progress" aria-hidden>
            {PHASES.map((p, i) => (
              <span key={p.id} className={i <= index ? 'on' : ''} />
            ))}
          </div>
          <div className="row between mt-3">
            <button className="link-btn" onClick={() => setPhaseId(current.id)}>
              {ui.timer.readMore}
            </button>
            <button className="link-btn" onClick={() => navigate('learn', 'body')}>
              {ui.timer.allPhases}
            </button>
          </div>
        </div>
      ) : (
        <button className="card stage-card mt-4 full text-left" onClick={() => navigate('learn', 'body')}>
          <div className="eyebrow">{ui.timer.bodyTeaserEyebrow}</div>
          <h3>{ui.timer.bodyTeaserTitle}</h3>
          <p className="muted small">{ui.timer.bodyTeaserText}</p>
        </button>
      )}

      <div className="mt-3">
        <EnergyCard
          elapsedHours={active ? elapsed / HOUR : undefined}
          goalHours={goalHours}
          onPersonalize={openSettings}
          onLearnMore={() => navigate('learn', 'estimates')}
        />
      </div>

      <div className="section-label">{ui.timer.doesItBreak}</div>
      <div className="chips">
        {QUICK_FOOD_IDS.map((id) => {
          const food = findFood(id)
          return (
            <button key={id} className="chip" onClick={() => onFood(food)}>
              {food.emoji} {foods[id].name}
            </button>
          )
        })}
        <button className="chip" onClick={() => navigate('check')}>
          {ui.timer.seeAll}
        </button>
      </div>

      <div className="section-label">{ui.timer.waterToday}</div>
      <div className="card water">
        <button className="round-btn" aria-label={ui.timer.removeGlass} onClick={() => actions.addWater(today, -1)}>
          −
        </button>
        <div className="grow">
          <div className="row between mb-2">
            <span>
              <b className="num water-count">{glasses}</b>{' '}
              <span className="muted small">{ui.timer.glassesOf(settings.waterGoal)}</span>
            </span>
            <span className="tiny muted">{ui.timer.liters(f.number(glasses * GLASS_LITERS, 2))}</span>
          </div>
          <div className="water-glasses" aria-hidden>
            {Array.from({ length: Math.max(settings.waterGoal, glasses) }, (_, i) => (
              <span key={i} className={i < glasses ? 'on' : ''} />
            ))}
          </div>
        </div>
        <button
          className="round-btn primary"
          aria-label={ui.timer.addGlass}
          onClick={() => {
            actions.addWater(today, 1)
            navigator.vibrate?.(10)
          }}
        >
          +
        </button>
      </div>

      <p className="footer-note">
        {ui.timer.disclaimer}{' '}
        <button className="link-btn inline" onClick={() => navigate('learn', 'safety')}>
          {ui.timer.safetyLink}
        </button>
        .
      </p>

      <PlanSheet open={planOpen} onClose={() => setPlanOpen(false)} />
      <TimePickSheet
        open={pick !== null}
        onClose={() => setPick(null)}
        title={pick === 'edit' ? ui.pick.editStart : ui.pick.whenStopped}
        hint={pick === 'edit' ? ui.pick.editStartHint : ui.pick.whenStoppedHint}
        initial={pick === 'edit' && active ? active.start : now - HOUR}
        warnBefore={last?.end ? { t: last.end, message: ui.pick.overlaps(f.when(last.end)) } : undefined}
        confirmLabel={pick === 'edit' ? ui.pick.saveStart : ui.pick.startFromTime}
        onConfirm={(t) => (pick === 'edit' ? actions.updateActive({ start: t }) : start(t))}
      />
      <EndFastSheet open={endOpen} onClose={() => setEndOpen(false)} active={active} />
      <PhaseSheet
        phaseId={phaseId}
        onClose={() => setPhaseId(null)}
        onNavigate={setPhaseId}
        currentId={active ? current.id : undefined}
      />
    </div>
  )
}
