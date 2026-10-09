import { useI18n } from '../../i18n'

/** Who shouldn't fast, warning signs and eating-disorder resources. */
export function Safety() {
  const { ui, guide } = useI18n()
  const { safety } = ui
  return (
    <>
      <div className="callout bad">
        <span className="callout-icon">⚕</span>
        <span>
          <strong>{safety.notMedicalTitle}</strong>
          {safety.notMedicalText}
        </span>
      </div>

      <div className="section-label">{safety.notFor}</div>
      <div className="card">
        <ul className="bullets bad">
          {guide.notFor.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>

      <div className="section-label">{safety.stopNow}</div>
      <div className="card">
        <ul className="bullets bad">
          {guide.stopSigns.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="small muted mt-3">{safety.stopText}</p>
      </div>

      <div className="section-label">{safety.edTitle}</div>
      <div className="card">
        <p className="small">
          {safety.edText}
          {safety.edLinkUrl && (
            <>
              {' '}
              <a href={safety.edLinkUrl} target="_blank" rel="noreferrer noopener">
                {safety.edLinkLabel}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </>
  )
}
