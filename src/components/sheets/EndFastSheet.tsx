import { useState } from 'react'
import { useEnergy } from '../../hooks/useEnergy'
import { useNow } from '../../hooks/useNow'
import { useI18n } from '../../i18n'
import { estimateFast } from '../../lib/energy'
import { actions, useStore, type Fast } from '../../lib/store'
import { HOUR, MINUTE, fromLocalInput, toLocalInput } from '../../lib/time'
import { MoodPicker } from '../MoodPicker'
import { Sheet } from '../Sheet'

/** End the running fast: optional earlier end time, mood and note. */
export function EndFastSheet({ open, onClose, active }: { open: boolean; onClose: () => void; active: Fast | null }) {
  const { ui } = useI18n()
  return (
    <Sheet open={open && !!active} onClose={onClose} title={ui.end.title}>
      {active && <EndFastForm active={active} onClose={onClose} />}
    </Sheet>
  )
}

/** Mounted fresh each time the sheet opens, so the form starts empty. */
function EndFastForm({ active, onClose }: { active: Fast; onClose: () => void }) {
  const { ui, f } = useI18n()
  const { settings } = useStore()
  const { kcalPerDay } = useEnergy()
  const now = useNow(1000)
  const [endedEarlier, setEndedEarlier] = useState(false)
  const [endValue, setEndValue] = useState(() => toLocalInput(now))
  const [mood, setMood] = useState<number>()
  const [note, setNote] = useState('')
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  const end = endedEarlier ? fromLocalInput(endValue) : now
  const invalid = end == null || end <= active.start || end > now + MINUTE
  const length = (end ?? now) - active.start
  const reached = length >= active.goalHours * HOUR
  const estimate = estimateFast(length / HOUR, kcalPerDay)

  const save = () => {
    if (end == null || invalid) return
    actions.endFast(Math.min(end, now), mood, note)
    navigator.vibrate?.(30)
    onClose()
  }

  return (
    <>
      <div className="card text-center">
        <div className="dial-kicker">{reached ? ui.end.goalReached : ui.end.youFasted}</div>
        <div className="num summary-number">{invalid ? '–' : f.duration(length)}</div>
        <div className="small muted">
          {reached
            ? ui.end.wellDone(active.goalHours)
            : ui.end.partOfGoal(Math.round((length / (active.goalHours * HOUR)) * 100), active.goalHours)}
        </div>
        {!invalid && (
          <div className="tiny muted mt-2">
            {ui.end.energy(f.kcal(estimate.kcal), f.smallWeight(estimate.fatKg, settings.units))}
          </div>
        )}
      </div>

      <div className="setting-row mt-2">
        <span>{ui.end.endedEarlier}</span>
        <button
          className="switch"
          role="switch"
          aria-checked={endedEarlier}
          aria-label={ui.end.endedEarlier}
          onClick={() => setEndedEarlier(!endedEarlier)}
        />
      </div>
      {endedEarlier && (
        <label className="field">
          <span>{ui.end.firstMeal}</span>
          <input
            className="input"
            type="datetime-local"
            value={endValue}
            min={toLocalInput(active.start)}
            max={toLocalInput(now)}
            onChange={(e) => setEndValue(e.target.value)}
          />
        </label>
      )}
      {endedEarlier && invalid && <div className="callout bad mt-2">{ui.end.invalidEnd(f.when(active.start))}</div>}

      <div className="section-label">{ui.end.howFelt}</div>
      <MoodPicker value={mood} onChange={setMood} />
      <label className="field mt-4">
        <span>{ui.end.note}</span>
        <textarea
          className="input"
          rows={2}
          value={note}
          placeholder={ui.end.notePlaceholder}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      <button className="btn btn-primary btn-block mt-5" disabled={invalid} onClick={save}>
        {ui.end.save}
      </button>
      {confirmDiscard ? (
        <button
          className="btn btn-danger btn-block mt-2"
          onClick={() => {
            actions.cancelFast()
            onClose()
          }}
        >
          {ui.end.confirmDiscard}
        </button>
      ) : (
        <button className="btn btn-block btn-quiet mt-2" onClick={() => setConfirmDiscard(true)}>
          {ui.end.discard}
        </button>
      )}
    </>
  )
}
