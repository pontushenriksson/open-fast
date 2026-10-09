import { useMemo, useState } from 'react'
import { BarChart } from '../components/charts/BarChart'
import { ProgressRing } from '../components/charts/ProgressRing'
import { WeightChart } from '../components/charts/WeightChart'
import { IconPlus } from '../components/Icons'
import { EditFastSheet } from '../components/sheets/EditFastSheet'
import { MOODS } from '../content/moods'
import { useEnergy } from '../hooks/useEnergy'
import { useNow } from '../hooks/useNow'
import type { ShowToast } from '../hooks/useToast'
import { useI18n } from '../i18n'
import { KG_PER_LB } from '../i18n/format'
import { estimateFast } from '../lib/energy'
import { hoursPerDay, reachedGoal, summarize } from '../lib/stats'
import { actions, useStore, type Fast } from '../lib/store'
import { HOUR, dateKey, fromDateKey } from '../lib/time'

const HISTORY_PREVIEW = 8
const RANGES = [7, 30] as const
const MIN_KG = 20
const MAX_KG = 400

function Tile({ value, unit, label, wide }: { value: string | number; unit?: string; label: string; wide?: boolean }) {
  return (
    <div className={`tile ${wide ? 'wide' : ''}`}>
      <div className="v num">
        {value}
        {unit && <small>{unit}</small>}
      </div>
      <div className="k">{label}</div>
    </div>
  )
}

export function ProgressScreen({ toast }: { toast: ShowToast }) {
  const { ui, f } = useI18n()
  const { history, active, weights, settings } = useStore()
  const { kcalPerDay } = useEnergy()
  const now = useNow(60_000)
  const [range, setRange] = useState<(typeof RANGES)[number]>(7)
  const [editing, setEditing] = useState<Fast | 'new' | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [weightInput, setWeightInput] = useState('')
  const units = settings.units

  const summary = useMemo(() => summarize(history, now), [history, now])
  const chart = useMemo(() => hoursPerDay(active ? [active, ...history] : history, range, now), [active, history, range, now])
  const goal = active?.goalHours ?? history[0]?.goalHours ?? 16
  const totalEnergy = estimateFast(summary.totalHours, kcalPerDay)
  const lastWeight = weights[weights.length - 1]
  const weightDiff = weights.length > 1 ? lastWeight.kg - weights[0].kg : 0
  const visible = showAll ? history : history.slice(0, HISTORY_PREVIEW)

  const saveWeight = () => {
    const value = Number(weightInput.replace(',', '.'))
    const kg = units === 'imperial' ? value * KG_PER_LB : value
    if (!Number.isFinite(kg) || kg < MIN_KG || kg > MAX_KG) return
    actions.addWeight(dateKey(), Math.round(kg * 10) / 10)
    setWeightInput('')
  }

  return (
    <div className="screen">
      <h1 className="screen-title">{ui.progress.title}</h1>
      <p className="screen-sub">{ui.progress.subtitle}</p>

      <div className="tiles">
        <div className="tile feature">
          <div>
            <div className="v num">
              {summary.currentStreak}
              <small>{ui.progress.days(summary.currentStreak)}</small>
            </div>
            <div className="k">
              {ui.progress.streak} · {ui.progress.best(summary.bestStreak)}
            </div>
          </div>
          <div className="flame" aria-hidden>
            {summary.currentStreak >= 7 ? '🔥' : summary.currentStreak >= 3 ? '✨' : '🌙'}
          </div>
        </div>
        <Tile value={summary.count} label={ui.progress.completed} />
        <Tile value={Math.round(summary.completionRate * 100)} unit="%" label={ui.progress.reachedGoal} />
        <Tile value={f.number(summary.avgHours)} unit="h" label={ui.progress.average} />
        <Tile value={f.number(summary.longestHours)} unit="h" label={ui.progress.longest} />
        <Tile value={f.number(summary.totalHours, 0)} unit="h" label={ui.progress.total} />
        <Tile value={f.number(summary.last7Hours, 0)} unit="h" label={ui.progress.last7} />
        <Tile value={f.kcal(totalEnergy.kcal)} label={ui.progress.energyTotal} wide />
      </div>

      <div className="row between section-head">
        <div className="section-label">{ui.progress.hoursPerDay}</div>
        <div className="segmented compact" role="tablist">
          {RANGES.map((r) => (
            <button key={r} role="tab" aria-selected={range === r} onClick={() => setRange(r)}>
              {ui.progress.rangeDays(r)}
            </button>
          ))}
        </div>
      </div>
      <div className="card">
        <BarChart data={chart} goal={goal} />
      </div>

      <div className="section-label">{ui.progress.weight}</div>
      <div className="card">
        {lastWeight ? (
          <div>
            <span className="num weight-value">{f.weight(lastWeight.kg, units)}</span>
            {weights.length > 1 && (
              <div className={`small ${weightDiff <= 0 ? 'text-ok' : 'muted'}`}>
                {ui.progress.since(
                  `${weightDiff <= 0 ? '−' : '+'}${f.weight(Math.abs(weightDiff), units)}`,
                  f.shortDate(fromDateKey(weights[0].date)),
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="muted small">{ui.progress.weightHint}</p>
        )}
        <WeightChart data={weights.slice(-30)} />
        <div className="row mt-3">
          <input
            className="input grow"
            inputMode="decimal"
            placeholder={ui.progress.weightPlaceholder(units === 'imperial' ? 'lb' : 'kg')}
            aria-label={ui.progress.weightPlaceholder(units === 'imperial' ? 'lb' : 'kg')}
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveWeight()}
          />
          <button className="btn btn-ghost" onClick={saveWeight}>
            {ui.common.save}
          </button>
        </div>
        <p className="tiny muted mt-2">{ui.progress.weightNote}</p>
      </div>

      <div className="row between section-head">
        <div className="section-label">{ui.progress.history}</div>
        <button className="link-btn row gap-1" onClick={() => setEditing('new')}>
          <IconPlus width={16} height={16} /> {ui.common.add}
        </button>
      </div>
      <div className="card card-list">
        {history.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🌙</div>
            <p>{ui.progress.empty}</p>
          </div>
        ) : (
          visible.map((fast) => {
            const end = fast.end!
            const sameDay = f.day(end) === f.day(fast.start)
            return (
              <button key={fast.id} className="history-row" onClick={() => setEditing(fast)}>
                <ProgressRing progress={(end - fast.start) / (fast.goalHours * HOUR)} done={reachedGoal(fast, now)} />
                <span className="grow">
                  <span className="block strong">
                    {f.duration(end - fast.start)}
                    {fast.mood ? ` ${MOODS[fast.mood - 1]}` : ''}
                  </span>
                  <span className="small muted">
                    {f.day(fast.start)} {f.time(fast.start)} → {sameDay ? '' : `${f.day(end)} `}
                    {f.time(end)}
                  </span>
                </span>
                <span className={`badge ${reachedGoal(fast, now) ? 'ok' : ''}`}>{fast.goalHours} h</span>
              </button>
            )
          })
        )}
      </div>
      {history.length > HISTORY_PREVIEW && (
        <button className="btn btn-ghost btn-block mt-3" onClick={() => setShowAll(!showAll)}>
          {showAll ? ui.common.showFewer : ui.common.showAll(history.length)}
        </button>
      )}

      <EditFastSheet
        fast={editing}
        onClose={() => setEditing(null)}
        onDelete={(fast) => {
          actions.deleteFast(fast.id)
          toast(ui.edit.deleted, () => actions.restoreFast(fast))
        }}
      />
    </div>
  )
}
