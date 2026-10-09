import { useState } from 'react'
import { CUSTOM_PLAN_ID, TIMER_PLANS } from '../../content/plans'
import { useNow } from '../../hooks/useNow'
import { useI18n } from '../../i18n'
import { actions, type Fast } from '../../lib/store'
import { HOUR, MINUTE, fromLocalInput, toLocalInput } from '../../lib/time'
import { MoodPicker } from '../MoodPicker'
import { Sheet } from '../Sheet'

const DEFAULT_GOAL = 16

interface Props {
  /** null = closed, 'new' = add a fast after the fact. */
  fast: Fast | 'new' | null
  onClose: () => void
  onDelete: (fast: Fast) => void
}

/** Edit a saved fast, or add one after the fact. */
export function EditFastSheet({ fast, onClose, onDelete }: Props) {
  const { ui } = useI18n()
  return (
    <Sheet open={!!fast} onClose={onClose} title={fast === 'new' ? ui.edit.addTitle : ui.edit.editTitle}>
      {fast && <EditFastForm key={fast === 'new' ? 'new' : fast.id} fast={fast} onClose={onClose} onDelete={onDelete} />}
    </Sheet>
  )
}

/** Suggested times for a fast added after the fact: ended two hours ago. */
function defaults(now: number) {
  const end = now - 2 * HOUR
  return { start: end - DEFAULT_GOAL * HOUR, end }
}

function EditFastForm({ fast, onClose, onDelete }: { fast: Fast | 'new'; onClose: () => void; onDelete: (fast: Fast) => void }) {
  const { ui, plans, f } = useI18n()
  const now = useNow(60_000)
  const initial = fast === 'new' ? { ...defaults(now), goalHours: DEFAULT_GOAL } : { ...fast, end: fast.end ?? now }
  const [start, setStart] = useState(() => toLocalInput(initial.start))
  const [end, setEnd] = useState(() => toLocalInput(initial.end))
  const [goal, setGoal] = useState(initial.goalHours)
  const [mood, setMood] = useState(fast === 'new' ? undefined : fast.mood)
  const [note, setNote] = useState(fast === 'new' ? '' : (fast.note ?? ''))

  const s = fromLocalInput(start)
  const e = fromLocalInput(end)
  const error =
    s == null || e == null ? ui.edit.fillBoth : e <= s ? ui.edit.endAfterStart : e > now + MINUTE ? ui.edit.endFuture : null

  const goalOptions = [...new Set([...TIMER_PLANS.map((p) => p.fastHours!), goal])].sort((a, b) => a - b)
  const planForHours = (h: number) => TIMER_PLANS.find((p) => p.fastHours === h)

  const save = () => {
    if (error || s == null || e == null) return
    const data = {
      start: s,
      end: e,
      goalHours: goal,
      planId: planForHours(goal)?.id ?? CUSTOM_PLAN_ID,
      mood,
      note: note.trim() || undefined,
    }
    if (fast === 'new') actions.addFast(data)
    else actions.updateFast(fast.id, data)
    onClose()
  }

  return (
    <>
      <label className="field">
        <span>{ui.edit.start}</span>
        <input className="input" type="datetime-local" value={start} onChange={(ev) => setStart(ev.target.value)} />
      </label>
      <label className="field">
        <span>{ui.edit.end}</span>
        <input
          className="input"
          type="datetime-local"
          value={end}
          max={toLocalInput(now)}
          onChange={(ev) => setEnd(ev.target.value)}
        />
      </label>
      <label className="field">
        <span>{ui.edit.goal}</span>
        <select className="input" value={goal} onChange={(ev) => setGoal(Number(ev.target.value))}>
          {goalOptions.map((h) => {
            const plan = planForHours(h)
            return (
              <option key={h} value={h}>
                {h} h{plan ? ` – ${plans[plan.id].name}` : ''}
              </option>
            )
          })}
        </select>
      </label>
      {!error && s != null && e != null && (
        <p className="small muted mt-3">
          {ui.edit.length}: <b className="text-strong">{f.duration(e - s)}</b>
        </p>
      )}
      {error && <div className="callout bad mt-3">{error}</div>}

      <div className="section-label">{ui.end.howFelt}</div>
      <MoodPicker value={mood} onChange={setMood} />
      <label className="field mt-4">
        <span>{ui.end.note}</span>
        <textarea className="input" rows={2} value={note} onChange={(ev) => setNote(ev.target.value)} />
      </label>

      <button className="btn btn-primary btn-block mt-5" disabled={!!error} onClick={save}>
        {ui.common.save}
      </button>
      {fast !== 'new' && (
        <button
          className="btn btn-danger btn-block mt-2"
          onClick={() => {
            onDelete(fast)
            onClose()
          }}
        >
          {ui.edit.delete}
        </button>
      )}
    </>
  )
}
