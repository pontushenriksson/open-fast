import { EVIDENCE_TONE, PHASES, type PhaseId } from '../../content/phases'
import { useI18n } from '../../i18n'
import { Sheet } from '../Sheet'

interface Props {
  phaseId: PhaseId | null
  onClose: () => void
  /** Called with the previous/next phase so the user can page through them. */
  onNavigate: (id: PhaseId) => void
  /** Highlights the phase the user is in right now. */
  currentId?: PhaseId
}

/** Everything about one phase of a fast: what happens, fuel, feelings, tips and sources. */
export function PhaseSheet({ phaseId, onClose, onNavigate, currentId }: Props) {
  const { ui, phases } = useI18n()
  const index = PHASES.findIndex((p) => p.id === phaseId)
  const phase = PHASES[index]
  const next = PHASES[index + 1]
  const prev = PHASES[index - 1]
  const text = phase ? phases[phase.id] : null

  return (
    <Sheet open={!!phase} onClose={onClose} title={text?.title} resetKey={phaseId ?? undefined}>
      {phase && text && (
        <>
          <div className="row between mb-3">
            <span className="tl-hour">
              {ui.phase.hours(phase.from, next?.from)}
              {phase.id === currentId ? ` · ${ui.body.youAreHere}` : ''}
            </span>
            <span className={`badge ${EVIDENCE_TONE[phase.evidence]}`}>{ui.body[phase.evidence]}</span>
          </div>
          <p className="lead">{text.short}</p>

          <div className="section-label">{ui.phase.whatHappens}</div>
          <p>{text.body}</p>

          <div className="phase-facts mt-4">
            <div className="card">
              <div className="eyebrow">{ui.phase.fuel}</div>
              <p className="small mt-1">{text.fuel}</p>
            </div>
            <div className="card">
              <div className="eyebrow">{ui.phase.feel}</div>
              <p className="small mt-1">{text.feel}</p>
            </div>
          </div>

          <div className="section-label">{ui.phase.tips}</div>
          <ul className="bullets">
            {text.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          <div className="section-label">{ui.phase.sources}</div>
          <ul className="list sources">
            {phase.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer noopener">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>

          <div className="row between mt-5">
            <button className="btn btn-ghost btn-sm" disabled={!prev} onClick={() => prev && onNavigate(prev.id)}>
              {ui.phase.prev}
            </button>
            <button className="btn btn-ghost btn-sm" disabled={!next} onClick={() => next && onNavigate(next.id)}>
              {ui.phase.next}
            </button>
          </div>
        </>
      )}
    </Sheet>
  )
}
