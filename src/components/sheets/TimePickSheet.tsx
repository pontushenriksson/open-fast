import { useState } from 'react'
import { useNow } from '../../hooks/useNow'
import { useI18n } from '../../i18n'
import { MINUTE, fromLocalInput, toLocalInput } from '../../lib/time'
import { Sheet } from '../Sheet'

/** Quick "how long ago" choices, in minutes. */
const QUICK_MINUTES = [0, 30, 60, 120, 180, 240, 360]

interface Props {
  open: boolean
  onClose: () => void
  title: string
  hint: string
  /** Value shown when the sheet opens. */
  initial: number
  /** Earliest allowed time (exclusive). */
  min?: number
  /** Soft warning when the time is before this, e.g. overlapping the previous fast. */
  warnBefore?: { t: number; message: string }
  confirmLabel: string
  onConfirm: (t: number) => void
}

/** Lets the user pick a moment in the past – quick choices or an exact time. */
export function TimePickSheet({ open, onClose, title, ...form }: Props) {
  return (
    <Sheet open={open} onClose={onClose} title={title}>
      <TimePickForm {...form} onClose={onClose} />
    </Sheet>
  )
}

/** Mounted fresh each time the sheet opens, so `initial` is read once. */
function TimePickForm({ onClose, hint, initial, min, warnBefore, confirmLabel, onConfirm }: Omit<Props, 'open' | 'title'>) {
  const { ui, f } = useI18n()
  const [value, setValue] = useState(() => toLocalInput(initial))
  const now = useNow(15_000)
  const t = fromLocalInput(value)
  let error: string | null = null
  if (t == null) error = ui.pick.invalid
  else if (t > now + MINUTE) error = ui.pick.future
  else if (min != null && t <= min) error = ui.pick.afterStart
  const warning = !error && t != null && warnBefore && t < warnBefore.t ? warnBefore.message : null

  const quickLabel = (m: number) => (m === 0 ? ui.pick.now : m < 60 ? ui.pick.minutesAgo(m) : ui.pick.hoursAgo(m / 60))

  return (
    <>
      <p className="muted mb-3">{hint}</p>
      <div className="chips wrap mb-4">
        {QUICK_MINUTES.filter((m) => min == null || now - m * MINUTE > min).map((m) => {
          const target = toLocalInput(now - m * MINUTE)
          return (
            <button key={m} className="chip" aria-pressed={value === target} onClick={() => setValue(target)}>
              {quickLabel(m)}
            </button>
          )
        })}
      </div>
      <label className="field">
        <span>{ui.pick.exact}</span>
        <input
          className="input"
          type="datetime-local"
          value={value}
          max={toLocalInput(now)}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      {t != null && !error && (
        <p className="small muted mt-3">
          {f.when(t)} · {t < now - MINUTE ? ui.pick.ago(f.duration(now - t)) : ui.pick.justNow}
        </p>
      )}
      {error && <div className="callout bad mt-3">{error}</div>}
      {warning && <div className="callout mt-3">{warning}</div>}
      <button
        className="btn btn-primary btn-block mt-5"
        disabled={!!error}
        onClick={() => {
          if (t == null || error) return
          onConfirm(Math.min(t, Date.now()))
          onClose()
        }}
      >
        {confirmLabel}
      </button>
    </>
  )
}
