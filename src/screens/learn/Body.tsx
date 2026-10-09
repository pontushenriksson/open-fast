import { useState } from 'react'
import { IconChevron } from '../../components/Icons'
import { PhaseSheet } from '../../components/sheets/PhaseSheet'
import { EVIDENCE_TONE, PHASES, phaseAt, type PhaseId } from '../../content/phases'
import { useNow } from '../../hooks/useNow'
import { useI18n } from '../../i18n'
import { useStore } from '../../lib/store'
import { HOUR } from '../../lib/time'

/** Timeline of every phase; tap one to read more. */
export function Body() {
  const { ui, phases } = useI18n()
  const { active } = useStore()
  const now = useNow(30_000)
  const [open, setOpen] = useState<PhaseId | null>(null)
  const current = active ? phaseAt((now - active.start) / HOUR) : null

  return (
    <>
      <p className="muted small mb-4">{ui.body.intro}</p>
      <ol className="timeline">
        {PHASES.map((phase, i) => {
          const state = !current ? '' : i < current.index ? 'past' : i === current.index ? 'now' : ''
          const next = PHASES[i + 1]
          return (
            <li key={phase.id} className={`tl-item ${state}`}>
              <button className="tl-button" onClick={() => setOpen(phase.id)}>
                <div className="row between">
                  <span className="tl-hour">
                    {phase.from}
                    {next ? `–${next.from}` : '+'} h{state === 'now' ? ` · ${ui.body.youAreHere}` : ''}
                  </span>
                  <span className={`badge ${EVIDENCE_TONE[phase.evidence]}`}>{ui.body[phase.evidence]}</span>
                </div>
                <h3>{phases[phase.id].title}</h3>
                <p className="small muted">{phases[phase.id].body}</p>
                <span className="tl-more">
                  {ui.timer.readMore} <IconChevron width={14} height={14} />
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="callout">
        <span className="callout-icon">🔬</span>
        <span>
          <strong>{ui.body.autophagyTitle}</strong>
          {ui.body.autophagyText}
        </span>
      </div>
      <PhaseSheet phaseId={open} onClose={() => setOpen(null)} onNavigate={setOpen} currentId={current?.current.id} />
    </>
  )
}
